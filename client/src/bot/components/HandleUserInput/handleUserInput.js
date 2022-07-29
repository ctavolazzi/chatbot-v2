// import { createChatBotMessage } from 'react-chatbot-kit';

function handleUserInput(message, state) {
  console.log("handleUserInput: message", message);
  console.log("handleUserInput: state", state);
  state.userMessages.push(message);
}

export default handleUserInput;