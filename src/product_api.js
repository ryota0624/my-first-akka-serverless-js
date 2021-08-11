import akkaserverless from "@lightbend/akkaserverless-javascript-sdk";

const View = akkaserverless.View;

const view = new View(
  ["product_api.proto"],
  "example.product.ProductsView",
  {
    viewId: "product-view",
    includeDirs: ["./proto"]
  }
);

const Product = view.lookupType("example.product.Product");
function ShoppingCartItemAdded(added, state, ctx) {
    console.log("product.ShoppingCartItemAdded", added, state, ctx)
    return Product.create({
        id: added.item.productId,
        name: added.item.name
    })
}

view.setUpdateHandlers({
    ShoppingCartItemAdded: ShoppingCartItemAdded
})

export default view;