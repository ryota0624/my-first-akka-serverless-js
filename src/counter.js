/* This code was initialised by Akka Serverless tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */

import akkaserverless from "@lightbend/akkaserverless-javascript-sdk";
const ValueEntity = akkaserverless.ValueEntity;
import {replies} from "@lightbend/akkaserverless-javascript-sdk";

/**
 * Type definitions.
 * These types have been generated based on your proto source.
 * A TypeScript aware editor such as VS Code will be able to leverage them to provide hinting and validation.
 * 
 * State; the serialisable and persistable state of the entity
 * @typedef { import("../lib/generated/counter").State } State
 * 
 * CounterService; a strongly typed extension of ValueEntity derived from your proto source
 * @typedef { import("../lib/generated/counter").CounterService } CounterService
 */


/** @type {CounterService} */
const entity = new ValueEntity(
  [
    "counter_domain.proto",
    "counter_api.proto"
  ],
  "com.example.CounterService",
  "counter",
  {
    includeDirs: ["./proto"],
    serializeAllowPrimitives: true,
    serializeFallbackToJson: true,
    forwardHeaders: []
  }
);

/**
 * @type State
 */
const CounterState = entity.lookupType("com.example.domain.CounterState");
const Empty = entity.lookupType("google.protobuf.Empty").create();

entity.setInitial(entityId => (CounterState.create({ value: 0 })));

entity.setCommandHandlers({
  Increase(command, state, ctx) {
    console.log("Increase", command, state, ctx)
    if (command.value < 0) {
      ctx.fail(`Increase requires a positive value. It was [${command.value}].`);
    }
    state.value += command.value;
    ctx.updateState(state);
    return replies.message(Empty)
  },
  Decrease(command, state, ctx) {
    if (command.value < 0) {
      ctx.fail(`Decrease requires a positive value. It was [${command.value}].`);
    }
    state.value -= command.value;
    ctx.updateState(state);
    return {};
  },
  Reset(command, state, ctx) {
    state.value = 0;
    ctx.updateState(state);
    return {};
  },
  GetCurrentCounter(command, state, ctx) {
    console.log("GetCurrentCounter", command, state)
    return { value: state.value };
  }
});


export default entity;