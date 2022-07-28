import './App.css';
import 'react-chatbot-kit/build/main.css';
import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './bot/config.js';
import MessageParser from './bot/MessageParser.jsx';
import ActionProvider from './bot/ActionProvider.jsx';

function App() {
  const [showBot, toggleBot] = useState(false);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
    <div className="App">
      <header className="App-header">
        {showBot && (
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageHistory={loadMessages()}
            messageParser={MessageParser}
            saveMessages={saveMessages}
          />
        )}
        <button onClick={() => toggleBot((prev) => !prev)}>Begin</button>
      </header>
    </div>
  );
}

export default App;
