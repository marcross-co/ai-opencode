import { opencodeText } from '@marcross/ai-opencode'
import { chat } from '@tanstack/ai'

async function main() {
  // Create adapter for kimi-k2.5
  const adapter = opencodeText('kimi-k2.5')

  // Simple chat
  const stream = chat({
    adapter,
    messages: [{ role: 'user', content: 'What is the capital of France?' }],
  })

  // Process streaming response
  for await (const chunk of stream) {
    switch (chunk.type) {
      case 'content':
        // Streaming text content
        if (chunk.delta) {
          process.stdout.write(chunk.delta)
        }
        break
      case 'tool_call':
        // Tool/function call received
        console.log(`\nTool called: ${chunk.toolCall.function.name}`)
        break
      case 'tool_result':
        // Tool result received
        console.log(`Tool result: ${chunk.content}`)
        break
      case 'done':
        // Stream completed
        console.log(`\nFinished: ${chunk.finishReason}`)
        break
      case 'error':
        // Error occurred
        console.error('Error:', chunk.error.message)
        break
      case 'thinking':
        // Model's reasoning/thinking content (if supported)
        if (chunk.delta) {
          process.stdout.write(chunk.delta)
        }
        break
    }
  }
}

main().catch(console.error)
