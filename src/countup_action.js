
import akkaserverless from "@lightbend/akkaserverless-javascript-sdk";
const Action = akkaserverless.Action;

import counter from "./counter.js";
import {replies} from "@lightbend/akkaserverless-javascript-sdk";

const action = new Action(
  [
    "countup_action.proto"
  ],
  "example.countup.actions.ShoppingCartTriggerCountupService",
  {
    includeDirs: ["./proto"],forwardHeaders:[]
    }
);

const Empty = action.lookupType("google.protobuf.Empty").create();

action.commandHandlers = {
  ProcessItemAdded: processItemAdded,
  CatchOthers: () => {
    return replies.message(Empty)
  },
};

/**
 * 
 * @param {*} request 
 * @param {akkaserverless.Action.UnaryCommandContext} context 
 */
function processItemAdded(request, context) {
  console.log("processItemAdded", request, context)
  try {
  // context.write(Empty)
  // context.on("data", (request2) => {
  //   console.log("data", request2)
  // })
  // context.on("end", () => {
  //   console.log("end")
  //   context.write(request)
  // })
  return replies.message(request).addEffect(counter.service.methods.Increase, {counterId: request.item.productId, value: request.item.quantity}, false);
  } catch (e) {
    console.log(e)
    return replies.noReply()
  }
}


export default action;