import React from 'react';
import delayMessage from './components/DelayMessage/delayMessage.js';
import botOptions from './components/BotOptions/botOptions.js';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHelp = () => {
    let botMessage = createChatBotMessage("Here's a list of all my options:");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    let options = '';
    botOptions.forEach((option) => {options += `-${option},\n`});

    delayMessage(options, 1000, setState);

    // new Promise((resolve, reject) => {
      //   setTimeout(() => {resolve(options)}, 1000);
      // }).then((result) => {
    //   console.log("result: ", result);
    //   const botMessage = createChatBotMessage(result);
    //   setState((prev) => ({
      //     ...prev,
      //     messages: [...prev.messages, botMessage],
      //   }));
      // });
    }

  const handleTest = () => {
    const botMessage = createChatBotMessage("Here's a test message for you!");
    console.log(this)
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleHello = () => {
    let botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleGoodbye = () => {
    const botMessage = createChatBotMessage('Goodbye!');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleHowAreYou = () => {
    const botMessage = createChatBotMessage('Pretty good, thanks.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleCaroline = () => {
  const botMessage = createChatBotMessage('Caroline is a great name.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDog = () => {
    const botMessage = createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: 'dogPicture',
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };


  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHelp,
            handleTest,
            handleHello,
            handleGoodbye,
            handleHowAreYou,
            handleCaroline,
            handleDog,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;