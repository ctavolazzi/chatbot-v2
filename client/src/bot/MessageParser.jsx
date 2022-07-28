import React from 'react';
import botOptions from './components/BotOptions/botOptions.js';
import actionConverter from './components/ActionConverter/actionConverter.js';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    // console.log("message: ", message, "typeof message: ", typeof message);
    message = message.toLowerCase();
    // This is where the app logic will run.
    // If the user types certain keywords or achieves certain conditions, this is where the app will call the appropriate action.
    console.log("user message: ", message);

    // botOptions.forEach((option) => {
    //   if (message.includes(option)) {
    //     console.log("option: ", option);
    //     // actions[option]();
    //   }
    // })
    for (const option of botOptions) {
      if (message.includes(option)) {
        console.log("option: ", option);
        // console.log(actions)
        actions[actionConverter(option)]();
        break;
      }
    }

    // if (message.includes('hello') || message.includes('hi') || message.includes('howdy')) {
    //   actions.handleHello();
    // }

    // if (message.includes('goodbye')) {
    //   actions.handleGoodbye();
    // }

    // if (message.includes('how are you') || message.includes(`how's it going`)) {
    //   actions.handleHowAreYou();
    // }

    // if (message.includes('help') || message.includes('options') || message.includes('commands') || message.includes('what can you do')) {
    //   actions.handleHelp();
    // }

    // if (message.includes('dog')) {
    //   actions.handleDog();
    // }

    // // if (message.includes('test')) {
    // //   actions.handleTest();
    // // }

    // if (message.includes('caroline')) {
    //   actions.handleCaroline();
    // }



    // console.log("MessageParser: user message: ", message); //debugging
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;