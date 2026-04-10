/**
 * Adapter unit tests
 */
import { describe, it, expect } from "vitest";
import { OpencodeTextAdapter } from "../src/index.js";

describe("OpencodeTextAdapter", () => {
  it("should initialize with API key", () => {
    const adapter = new OpencodeTextAdapter(
      { apiKey: "test-key" },
      "kimi-k2.5",
    );
    expect(adapter).toBeDefined();
  });

  it("should have correct kind", () => {
    const adapter = new OpencodeTextAdapter({ apiKey: "test" }, "kimi-k2.5");
    expect(adapter.kind).toBe("text");
  });

  it("should use custom baseURL", () => {
    const adapter = new OpencodeTextAdapter(
      { apiKey: "test", baseURL: "https://custom.api.com" },
      "kimi-k2.5",
    );
    expect(adapter).toBeDefined();
  });
});
