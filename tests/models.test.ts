/**
 * Model metadata validation tests
 */
import { describe, it, expect } from "vitest";
import { ALL_MODELS } from "../src/constants.js";

describe("Model Metadata", () => {
  it("all models should have required fields", () => {
    ALL_MODELS.forEach((model) => {
      expect(model.name).toBeDefined();
      expect(model.name).toBeTypeOf("string");
      expect(model.provider).toBeDefined();
      expect(model.provider).toBeTypeOf("string");
      expect(model.subscription).toBeDefined();
      expect(["zen", "go", "both"]).toContain(model.subscription);
    });
  });

  it("all models should have pricing information", () => {
    ALL_MODELS.forEach((model) => {
      expect(model.pricing).toBeDefined();
      expect(model.pricing.input).toBeGreaterThanOrEqual(0);
      expect(model.pricing.output).toBeGreaterThanOrEqual(0);
      expect(model.pricing.currency).toBe("USD");
    });
  });

  it("all models should have support flags", () => {
    ALL_MODELS.forEach((model) => {
      expect(model.supports).toBeDefined();
      expect(model.supports.chat).toBeTypeOf("boolean");
      expect(model.supports.streaming).toBeTypeOf("boolean");
      expect(model.supports.tools).toBeTypeOf("boolean");
      expect(model.supports.structuredOutput).toBeTypeOf("boolean");
      expect(model.supports.vision).toBeTypeOf("boolean");
    });
  });

  it("all models should have context window defined", () => {
    ALL_MODELS.forEach((model) => {
      expect(model.contextWindow).toBeDefined();
      expect(model.contextWindow).toBeGreaterThan(0);
    });
  });
});
