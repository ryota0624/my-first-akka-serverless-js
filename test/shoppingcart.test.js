/* This code was initialised by Akka Serverless tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */

import { MockValueEntity } from "./testkit.js";
import { expect } from "chai";
import shoppingcart from "../src/shoppingcart.js";

describe("ShoppingCartService", () => {
  const entityId = "entityId";
  
  describe("AddItem", () => {
    it("should...", () => {
      const entity = new MockValueEntity(shoppingcart, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = entity.handleCommand("AddItem", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
    });
  });
  
  describe("RemoveItem", () => {
    it("should...", () => {
      const entity = new MockValueEntity(shoppingcart, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = entity.handleCommand("RemoveItem", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
    });
  });
  
  describe("GetCart", () => {
    it("should...", () => {
      const entity = new MockValueEntity(shoppingcart, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = entity.handleCommand("GetCart", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
    });
  });
  
  describe("RemoveCart", () => {
    it("should...", () => {
      const entity = new MockValueEntity(shoppingcart, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = entity.handleCommand("RemoveCart", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
    });
  });
});