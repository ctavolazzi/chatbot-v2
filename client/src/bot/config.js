import DogPicture from './components/DogPicture/DogPicture.jsx';
// import TestMessage from './components/TestMessage/TestMessage.jsx';
import {
  createChatBotMessage,
  createCustomMessage,
} from 'react-chatbot-kit';

const botName = "Harold DeSantis";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi I'm ${botName}. Welcome to SlumberSpeak!`
    ),
    createChatBotMessage(
      "Type something in the box below to start chatting with me.",
      {
        withAvatar: false,
        delay: 500,
      }
    ),
    createCustomMessage('Test', 'custom'),
  ],
  state: {
    myCustomProperty: 'myCustomValue'
  },
  botName: botName,
  botAvatar: "https://i.imgur.com/QQO0ZYb.png",
  // botAvatar: "https://picsum.photos/200",
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    // {
    //   widgetName: 'testMessage',
    //   widgetFunc: (props) => <TestMessage {...props} />,
    //   props: {'Test Prop': 'Test Value'},
    //   mapStateToProps: ['myCustomProperty'],
    // },
  ],
};

export default config;