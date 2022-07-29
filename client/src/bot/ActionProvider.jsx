import React from 'react';
// import { useState, useEffect } from 'react';
import delayMessage from './components/DelayMessage/delayMessage.js';
import botActions from './components/BotActions/botActions.js';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  // const state = children.props.children.props.state; // This is the internal state of the Chatbot app. And a mouthfull. It comes in as an argument to the ActionProvider component.

  const handleTest = (state, message) => {
    // Use this function as a template for a bot action
    // We can pass things into the action handlers, and the action handlers can use those things to trigger different logic.
    // For example, if we pass in the user's message, we can use that to trigger different actions.
    console.log("handleTest: message", message); // The message is used to trigger different test actions.
    console.log("handleTest: state", state); // We don't need to pass the state in, it's already available in the ActionProvider component scope.
    // console.log("handleTest: setState:" , setState);

    // Here's an example of how to trigger a bot action mased on user message. Typing "test help" will trigger the handleTest function to log the current state of the helpTriggered state variable
    // Try typing "test help" in the chatbot's input field, then "help", then "test help" again and look at the console output
    if (message.includes('help')) {
      let botMessage = createChatBotMessage("Testing help");
      console.log("handleTest: help: helpTriggered:", state.helpTriggered);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        testCount: prev.testCount + 1
      }));
    }

    if (state.testTriggered) { // calls to this action will read the state and respond accordingly
      let botMessage = createChatBotMessage(`Test message ${state.testCount + 1}`); // displays the number of times the user has triggered this action
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        testCount: prev.testCount + 1 // increment the testCount on each subsequent invocation
      }));

    } else { // The first invocation of this action sets up the state values here
      let botMessage = createChatBotMessage(`Test message 1`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        testTriggered: true,
        testCount: 1
      }));
    }
  }

  const handleQuestion = (state, message) => {
    // This one's gonna be a doozy.
    // You should be able to ask the bot questions and if it should look through its memory and see if it knows the answer.
    // This is gonna involve a lot of algorithms and structuring to work.

    // First we gotta process the message to get the question.
    // The below code was written by the GitHub copilot, and it reaveals a clue about how to get the question.
    // let question = input[1]
    // let answer = input[2]
    // let botMessage = createChatBotMessage(`I know ${question} is ${answer}.`);
    // setState((prev) => ({
      //   ...prev,
      //   messages: [...prev.messages, botMessage]
      // }))
    // We need to process the user's input to see what they're asking about.
    let input = message.split(' ')
    console.log(input)

    // Here's some test triggers to make sure the function works
    if (message.includes('anything')) {
      let botMessage = createChatBotMessage(`I know everything.`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
    } else if (message.includes('my name') && state.username) {
      let botMessage = createChatBotMessage(`Your name is ${state.username}.`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
    } else if (message.includes('my name') && !state.username) {
      let botMessage = createChatBotMessage(`I don't know your name.`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
    } else if (message.includes('secret')) {
      let botMessage = createChatBotMessage(`I know many secrets...`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
    }
  }

  const handleHelp = (state) => {
    if (state.helpTriggered) { // If the help action has been called before...
      if (state.helpCount >= 2 && state.helpCount <=3) { // If the user has triggered the help action more than 3 times...
        let botMessage = createChatBotMessage("I already told you what I can do. Go look it up.");
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
          helpCount: prev.helpCount + 1 // Notice we still increment the counter. Try typing "test" in the chatbot again to see the counter going up.
        }));
      // } else if (state.helpCount === 4) {
      //   let botMessage = createChatBotMessage("I'm not playing around. Seriously, go look it up.");
      //   // setState((prev) => ({
        //   //   ...prev,
        //   //   messages: [...prev.messages, botMessage],
      //   //   helpCount: prev.helpCount + 1
      //   // }));
      // }
      } else if (state.helpCount >= 4 && state.helpCount < 5) { // If the user continues to trigger the help action a bunch...
        let botMessage = createChatBotMessage("I'm not playing around. Seriously, go look it up.");
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
          helpCount: prev.helpCount + 1
        }));
      } else if (state.helpCount >= 5) {
        console.log("end of help")

      } else {
        let botMessage = createChatBotMessage("Oh, I'm sorry, did you forget what I can do? Here it is again :)");
        let actions = ''
        botActions.forEach((action) => {actions += `-${action},\n`});
        delayMessage(actions, 1000, setState);
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
          helpTriggered: true,
          helpCount: prev.helpCount + 1
        }));
      }

    } else {
      let botMessage = createChatBotMessage("Here are the things I can do:");
      let actions = '';
      botActions.forEach((action) => {actions += `-${action},\n`});
      delayMessage(actions, 1000, setState);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        helpTriggered: true,
        helpCount: 1
      }));
    }
  }

  const handleUnknownAction = (state) => {
    const botMessage = createChatBotMessage(`Apologies, I don't have a response for that. Please try typing "help" to see what I can do.`);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  }

  const handleHello = (state) => {
    // let botMessage = createChatBotMessage('Hello. Nice to meet you.', {widget: 'test-widget', payload: {'helloTest': 'test'}}); // you can send a payload with the message but I don't really understand what that does.
    console.log("handleHello: state", state);
    if (state.helloTriggered) {
      let botMessage = createChatBotMessage(`I already said hello.`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        helloCount: prev.helloCount + 1
      }));
    } else {
      let botMessage = createChatBotMessage(`Hello. Nice to meet you. What's your name?`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        helloTriggered: true,
        helloCount: 1
      }))
    }

    // trigger saying hello to the user by allowing them to input their name
    // in Python it's
    /*
    print("Hello. Nice to meet you. What's your name?")
    username = input("Enter name: ")
    print("Hello " + username + "!")
    */
    // how do we do it in this application?
  }

  const handleRude = (state) => {
    let botMessage = createChatBotMessage(`I'm sorry, let's start over. How can I help you?`);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const storeUsername = (state, message) => {
    message = message.charAt(0).toUpperCase() + message.slice(1);
    let botMessage = createChatBotMessage(`Hello ${message}. How can I help you?`);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      username: message,
    }))
  }

  const handleGetUsername = (state) => {
    // I'm testing to see if it's better to modify the state by passing it in to the action or to access it from the the ActionProvider scope
    if (state.username) {
      let botMessage = createChatBotMessage(`You name is ${state.username}.`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
    } else {
      let botMessage = createChatBotMessage(`I'm sorry, I don't know your name.`);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
    }
  }

  const handleSetUsername = (state, message) => {
    let input = message.split('is ')
    let username = input[1].charAt(0).toUpperCase() + input[1].slice(1);

    console.log("handleSetUsername: message: ", message)
    let botMessage = createChatBotMessage(`Your name is ${username}.`);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      username: username,
    }))
  }

  const handleGetBotName = (state) => {
    let botMessage = createChatBotMessage(`My name is ${state.botName}.`);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }))
  }

  const handleGoodbye = (state) => {
    const botMessage = createChatBotMessage('Goodbye!');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleHowAreYou = (state) => {
    const botMessage = createChatBotMessage('Pretty good, thanks.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    delayMessage('How are you?', 1000, setState);
  };

  const handleCaroline = (state) => {
  const botMessage = createChatBotMessage('Caroline is a great name.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDog = (state) => {
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

  const handleHi = (state) => {
    const botMessage = createChatBotMessage('Hi!');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      }));
  }


  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleUnknownAction,
            handleHelp,
            handleTest,
            handleHello,
            handleGoodbye,
            handleHowAreYou,
            handleCaroline,
            handleDog,
            storeUsername,
            handleGetUsername,
            handleGetBotName,
            handleSetUsername,
            handleRude,
            handleQuestion,
            handleHi,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;