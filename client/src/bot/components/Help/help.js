import { createChatBotMessage } from 'react-chatbot-kit';

function help(state, setState) {
  new Promise((resolve, reject) => {
    setTimeout(() => {resolve("User Messages:")}, 1000); // Whatever you pass in to "resolve" will be the message rendered by the bot. This is very customizable.
  }).then((result) => {
    console.log("help: promise: ", result);
    const botMessage = createChatBotMessage(result);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  });

  for (const message of state.messages) {
    if (message.type === 'user') {
      console.log("user message: ", message)
      new Promise((resolve, reject) => {
        setTimeout(() => {resolve(message.message)}, 1000); // Whatever you pass in to "resolve" will be the message rendered by the bot. This is very customizable.
      }).then((result) => {
        console.log("help: loop promise: ", result);
        const botMessage = createChatBotMessage(result);
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      });
    }
  }
}

export default help;