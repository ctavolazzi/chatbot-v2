import React from 'react';
import botActions from './components/BotActions/botActions.js';
import actionConverter from './components/ActionConverter/actionConverter.js';
import handleUserInput from './components/HandleUserInput/handleUserInput.js';

const MessageParser = ({ children, actions }) => {

  const parse = (message) => {
    // How it works:

    // Every time the user sends a message, the message is parsed and the appropriate action is triggered.

    // The Chatbot has a memory, stored in the "children" argument to the MessageParser component.

    // If you console.log(children) you'll see this argument to the MessageParser component holds the internal state of the Chatbot app.
    // console.log('MessageParser arguments: ', children, actions)
    // console.log('MessageParser children.props.state: ', children.props.state)
    // you do not want to know how long it took me to figure that out...

    // So, we're going to use the "children" argument to the MessageParser component to store the internal state of the Chatbot app, and use it to help trigger the Chatbot's logic
    // If the user types certain keywords or achieves certain conditions, the app calls the appropriate action. The action then triggers the appropriate logic, and the result of that is stored in the internal Chatbot state.

    // The Chatbot's logic is triggered by the user's messags, and the internal state cycles through  the MessageParser component, whose scope is accessible by this "parse" function.

    /////////////////
    // Chatbot Logic:
    /////////////////
    message = message.toLowerCase();
    const state = children.props.state;
    handleUserInput(message, state); // We pass the message and the internal state to the handleUserImput function. This function will store the user's input in the internal state.
    // console.log("MessageParser: user message: ", message); //debugging
    // Let's make that children.props.state.helpTriggered variable easier to work with
    // console.log("MessageParser: state: ", state); //debugging

    /////////////////////////////
    // Conditional logic example:
    /////////////////////////////
    // Tests to see if the user has sent "help" before. You can use the internal state to trigger or performing different actions.
    // console.log('MessageParser: help triggered = ' + children.props.state.helpTriggered);

    // Now we should be able to modify it as it's passed through this function. But do the modifications persist? Let's test that. Uncomment the following line to see the state change in the console.
    // state.addedValue = 'Value Added';
    // console.log('MessageParser: state: ', state);
    // console.log('MessageParser: props: ', children.props.state);

    // Sweet! Now we can use the state to trigger different actions from the Chatbot based on what the user has sent in the past. As long as the app remains open, the state will persist, and our Chatbot will have a memory.

    // Here's an example to get you going:
    // if (message.includes("help")) {
    //   if (state.helpTriggered === true) {
    //     actions.handleHelpSassy();
    //   } else {
    //     actions.handleHelp();
    //   }
    // }
    // On subsequent testing, I determined it's best to handle the conditional logic in the ActionProvider component, and use this function to simply parse the user's message and trigger the appropriate action path. That way we don't need to write a bunch of random functions and stitch them all over the place. This way we can keep the Chatbot's logic in one place.

    // Here's the current app logic.
    // I'm testing out ways of progrmatically checking if a message contains keywords, because typing out each individual pattern is kind of a pain.

    // Check for keywords in a long if/else statement. This is a lot of code, but it allows multiple keywords to trigger the same action
    if (message.includes(`test`)) {
      actions.handleTest(state, message);

    } else if (message === 'hi') {
      actions.handleHi(state);

    } else if (state.helloTriggered && !state.username) {
      actions.storeUsername(state, message);

    // } else if (message.includes(`my name`) && state.usernameStored) {
    //   actions.handleGetUsername(state);
    // } else if (message.includes(`hello`) && !state.usernameStored) {
    //   actions.handleGetUsername(state);
    // You can write conditionals like that, but you can also just pass the state in as an argument to the action and let the action handle it.
    // I always pass the state in to the getter methods. I'm not sure which is the most current version of the state so this is my solution till I debug the other one.
    } else if (message.includes(`my name is`) && !state.usernameStored) {
      actions.handleSetUsername(state, message);

    } else if (message.includes(`my name`)) {
      actions.handleGetUsername(state);

    } else if (message.includes(`your name`)) {
      actions.handleGetBotName(state);
    // There's gotta be a cleaner way to do it but this works. Now you can ask the bot if it knows your name, and it'll tell you. Your username can be stored a variety of ways and you can interact with the bot in a variety of ways to get and store the username.

    } else if (message.includes(`rude`)) {
      actions.handleRude(state);

    } else if (message.includes(`?`)) {
      actions.handleQuestion(state, message);

    } else if (message.includes('howdy') || message.includes('hey')) {
      actions.handleHello(state);

    // } else if (message.includes('example')) {
    //   actions.Example();

    } else if (message.includes(`how's it going`) || message.includes(`how are you`)) {
      actions.handleHowAreYou(state);

    } else if (message.includes('options') || message.includes('commands') || message.includes('what can you do')) {
      actions.handleHelp(state);

    // If it doesn't hit one of these triggers, it loops through a bank of actions
    // This is much less code, but it doesn't allow for multiple keywords to trigger the same action. Each keyword needs to have its own action, because this little algorithm uses the "includes" method to check the message against an array of keywords, then uses my stolen "actionConverter" function to convert the keyword to an action function call. It's pretty neat, but it's ridgid.
    } else {
      for (const action of botActions) {
        if (message.includes(action)) {
          console.log("messageParser: parse: action selected: ", action);
          // console.log(actions)
          actions[actionConverter(action)](state);
          // actionFound = true; // I was trying to create an handleUnknownAction trigger but I think it's best to just leave it out for now.
          break;
        }
      }
    };
  }


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