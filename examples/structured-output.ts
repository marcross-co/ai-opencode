import { opencodeText } from "@marcross/ai-opencode";
import { chat } from "@tanstack/ai";
import { z } from "zod";

async function main() {
  // Create adapter for a model that supports structured output
  const adapter = opencodeText("kimi-k2.5");

  // Define the output schema using Zod
  const weatherSchema = z.object({
    city: z.string().describe("The city name"),
    temperature: z.number().describe("Temperature in celsius"),
    conditions: z
      .enum(["sunny", "cloudy", "rainy", "snowy"])
      .describe("Weather conditions"),
    forecast: z
      .array(
        z.object({
          day: z.string(),
          high: z.number(),
          low: z.number(),
        }),
      )
      .describe("5-day forecast"),
  });

  // Use structured output with chat
  const result = await chat({
    adapter,
    messages: [
      {
        role: "user",
        content: "What is the weather in Paris? Provide a 5-day forecast.",
      },
    ],
    outputSchema: weatherSchema,
  });

  // Result is typed according to the schema
  console.log("Weather in:", result.city);
  console.log("Temperature:", result.temperature, "°C");
  console.log("Conditions:", result.conditions);
  console.log("Forecast:");
  result.forecast.forEach((day) => {
    console.log(`  ${day.day}: High ${day.high}°C, Low ${day.low}°C`);
  });
}

main().catch(console.error);
