// components/AskAi/ChatMessages.js
import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import useTypingEffect from '../../hooks/useTypingEffect';
import { chatBotStyles } from '../../styles/ChatBotStyles';

const ChatMessages = ({ messages, isLoading }) => {
  return (
    <>
      {messages.map((message, index) => (
        <Message key={index} type={message.type} text={message.text} />
      ))}
      {isLoading && <Text style={chatBotStyles.loadingText}>Loading...</Text>}
    </>
  );
};

const Message = ({ type, text }) => {
  const displayedText = type === 'bot' ? useTypingEffect(text) : text;

  return (
    <View style={[chatBotStyles.messageContainer, type === 'user' ? chatBotStyles.userMessage : chatBotStyles.botMessage]}>
      {type === 'user' ? (
        <FontAwesome
          name="user"
          size={24}
          color={chatBotStyles.userIconColor}
          style={chatBotStyles.icon}
        />
      ) : (
        <MaterialIcons
          name="android"
          size={24}
          color={chatBotStyles.botIconColor}
          style={chatBotStyles.icon}
        />
      )}
      <Text style={chatBotStyles.messageText}>{displayedText}</Text>
    </View>
  );
};

export default ChatMessages;
