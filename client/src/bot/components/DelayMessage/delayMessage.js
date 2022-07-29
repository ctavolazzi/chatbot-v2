// import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
// import { setState } from 'react';

function delayMessage(message, delay, setState) {
  new Promise((resolve, reject) => {
    setTimeout(() => {resolve(message)}, delay);
  }).then((result) => {
    console.log("delayed message: ", result);
    const botMessage = createChatBotMessage(result);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  });
}

export default delayMessage;