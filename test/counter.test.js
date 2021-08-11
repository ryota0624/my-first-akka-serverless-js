/* This code was initialised by Akka Serverless tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */

import { MockValueEntity } from "./testkit.js";
import { expect } from "chai";
import counter from "../src/counter.js";

const CounterState = counter.lookupType("com.example.domain.CounterState");

describe("CounterService", () => {
  const entityId = "entityId";

  describe("Increase", () => {

    it("should increase the value with no prior state", () => {
      const entity = new MockValueEntity(counter, entityId);
      const result = entity.handleCommand("Increase", { entityId: entityId, value: 42 });

      expect(result).to.deep.equal({});
      expect(entity.error).to.be.undefined;
      expect(entity.state).to.deep.equal(CounterState.create({ value: 42 }));
    });

    it("should increase the value with some prior state", () => {
      const entity = new MockValueEntity(counter, entityId);
      entity.state = CounterState.create({ value: 13 });
      const result = entity.handleCommand("Increase", { entityId: entityId, value: 42 });

      expect(result).to.deep.equal({});
      expect(entity.error).to.be.undefined;
      expect(entity.state).to.deep.equal(CounterState.create({ value: 13 + 42 }));
    });

    it("should fail on negative values", () => {
      const entity = new MockValueEntity(counter, entityId);
      const result = entity.handleCommand("Increase", { entityId: entityId, value: -2 });

      expect(result).to.deep.equal({});
      expect(entity.error).to.be.equal(`Increase requires a positive value. It was [-2].`);
    });
  });

  describe("Decrease", () => {
    it("should decrease the value with no prior state.", () => {
      const entity = new MockValueEntity(counter, entityId);
      const result = entity.handleCommand("Decrease", { entityId: entityId, value: 42 });

      expect(result).to.deep.equal({});
      expect(entity.error).to.be.undefined;
      expect(entity.state).to.deep.equal(CounterState.create({ value: -42 }));
    });
  });

  describe("Reset", () => {
    it("should reset the entity value to 0", () => {
      const entity = new MockValueEntity(counter, entityId);
      entity.state = CounterState.create({ value: 13 });
      const result = entity.handleCommand("Reset", { entityId: entityId });

      expect(result).to.deep.equal({});
      expect(entity.error).to.be.undefined;
      expect(entity.state).to.deep.equal(CounterState.create({ value: 0 }));
    });
  });

  describe("GetCurrentCounter", () => {
    it("should return the current state", () => {
      const entity = new MockValueEntity(counter, entityId);
      entity.state = CounterState.create({ value: 13 });
      const result = entity.handleCommand("GetCurrentCounter", { entityId: entityId });

      expect(result).to.deep.equal({ value: 13 });
      expect(entity.error).to.be.undefined;
      expect(entity.state).to.deep.equal(CounterState.create({ value: 13 }));
    });
  });
});