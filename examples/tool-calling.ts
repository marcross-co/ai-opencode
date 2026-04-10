import { opencodeText } from "@marcross/ai-opencode";
import { chat } from "@tanstack/ai";
import { z } from "zod";

// Define a calculator tool using Zod schema
const calculatorTool = {
  name: "calculator",
  description: "Perform basic arithmetic operations",
  inputSchema: z.object({
    operation: z.enum(["add", "subtract", "multiply", "divide"]),
    a: z.number(),
    b: z.number(),
  }),
  execute: async (input: { operation: string; a: number; b: number }) => {
    switch (input.operation) {
      case "add":
        return { result: input.a + input.b };
      case "subtract":
        return { result: input.a - input.b };
      case "multiply":
        return { result: input.a * input.b };
      case "divide":
        return {
          result: input.b !== 0 ? input.a / input.b : "Error: Division by zero",
        };
    }
  },
};

async function main() {
  const adapter = opencodeText("kimi-k2.5");

  const stream = chat({
    adapter,
    messages: [{ role: "user", content: "What is 42 multiplied by 13?" }],
    tools: [calculatorTool],
  });

  for await (const chunk of stream) {
    switch (chunk.type) {
      case "content":
        // Streaming text content
        if (chunk.delta) {
          process.stdout.write(chunk.delta);
        }
        break;
      case "tool_call":
        // Tool/function call received
        console.log(`\n[Tool Call] ${chunk.toolCall.function.name}`);
        break;
      case "tool_result":
        // Tool result received
        console.log(`[Tool Result] ${chunk.content}`);
        break;
      case "done":
        // Stream completed
        console.log(`\n[Done] ${chunk.finishReason}`);
        break;
      case "error":
        // Error occurred
        console.error("[Error]", chunk.error.message);
        break;
      case "thinking":
        // Model's reasoning/thinking content (if supported)
        if (chunk.delta) {
          process.stdout.write(chunk.delta);
        }
        break;
    }
  }
}

main().catch(console.error);
