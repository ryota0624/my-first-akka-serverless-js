
import akkaserverless from "@lightbend/akkaserverless-javascript-sdk";
import {replies} from "@lightbend/akkaserverless-javascript-sdk";

import counter from "./counter.js";

const entity = new akkaserverless.EventSourcedEntity(
    ["shoppingcart_api.proto", "shoppingcart_domain.proto"],
    "example.shoppingcart.ShoppingCartService",
    "cart",
    {
        snapshotEvery: 100,
        includeDirs: ["./proto"],
        serializeFallbackToJson: true,
        forwardHeaders:[],
    }
);

const pkg = "example.shoppingcart.domain.";
const ItemAdded = entity.lookupType(pkg + "ItemAdded");
const ItemRemoved = entity.lookupType(pkg + "ItemRemoved");
const Cart = entity.lookupType(pkg + "Cart");

entity.initial = entityId => Cart.create({items: []});

function getCart(request, cart) {
    return replies.message(cart);
}

function addItem(addItem, cart, ctx) {
    if (addItem.quantity < 1) {
        ctx.fail("Cannot add negative quantity to item " + addItem.productId);
    } else {
        const itemAdded = ItemAdded.create({
            item: {
                productId: addItem.productId,
                name: addItem.name,
                quantity: addItem.quantity
            }
        });
        ctx.emit(itemAdded);
        return replies.noReply()
        .addEffect(counter.service.methods.GetCurrentCounter, { counterId: addItem.productId }, true)
        .addEffect(counter.service.methods.Increase, {counterId: addItem.productId, value: addItem.quantity}, false)
    }
}

function itemAdded(added, cart) {
    const existing = cart.items.find(item => {
        return item.productId === added.item.productId;
    });

    if (existing) {
        existing.quantity = existing.quantity + added.item.quantity;
    } else {
        cart.items.push(added.item);
    }

    return cart;
}


function removeItem(removeItem, cart, ctx) {
    const existing = cart.items.find(item => {
        return item.productId === removeItem.productId;
    });
    if (!existing) {
        ctx.fail("Cannot remove item, item does not exist in cart: " + removeItem.productId);
    } else {
        const itemRemoved = ItemRemoved.create({
            productId: removeItem.productId,
        });
        ctx.emit(itemRemoved);
    return replies.noReply()
    }
}

function itemRemoved(removed, cart) {
    const items = cart.items.filter(item => {
        return item.productId !== removed.item.productId;
    });


    cart.items = items;

    return cart;
}


entity.behavior = cart => {
    return {
        commandHandlers: {
            AddItem: addItem,
            RemoveItem: removeItem,
            GetCart: getCart
        },
        eventHandlers: {
            ItemAdded: itemAdded,
            ItemRemoved: itemRemoved
        }
    };
};

export default entity;