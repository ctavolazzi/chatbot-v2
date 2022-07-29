import './App.css';
import 'react-chatbot-kit/build/main.css';
// import React, { useState, setState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './bot/config.js';
import MessageParser from './bot/MessageParser.jsx';
import ActionProvider from './bot/ActionProvider.jsx';

function App() {
  // let state = 'state' // doesn't work
  // const [showBot, toggleBot] = useState(false);
  // console.log(Chatbot);
  // setState({'test': 'test'});
  // const saveMessages = (messages, HTMLString) => {
  //   localStorage.setItem('chat_messages', JSON.stringify(messages));
  // };

  // const loadMessages = () => {
  //   const messages = JSON.parse(localStorage.getItem('chat_messages'));
  //   return messages;
  // };

  return (
    <div className="App">
      <header className="App-header">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
      </header>
    </div>
  );
}

export default App;
