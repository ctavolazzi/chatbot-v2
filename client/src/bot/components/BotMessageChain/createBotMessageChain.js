// I want this function to create a chain of botMessages that are rendered one after the other in the chat.
// Right now it creates one botMessage for each message in the the passed in messages array.
// The desired behavior is to render one message at a time in a chain.
import { createChatBotMessage } from 'react-chatbot-kit';

function createBotMessageChain (state, messages, setState) {
  messages.forEach((message) => {
    let botMessage = createChatBotMessage(message);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }))
  })
}

export default createBotMessageChain;