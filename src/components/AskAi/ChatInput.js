// components/AskAi/ChatInput.js
import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { chatBotStyles } from "../../styles/ChatBotStyles";

const ChatInput = ({ userInfo, setUserInfo, getRecommendations }) => {
  return (
    <View style={chatBotStyles.inputContainer}>
      <TextInput
        placeholder="Enter your info"
        value={userInfo}
        onChangeText={setUserInfo}
        style={chatBotStyles.input}
      />
      <Pressable onPress={getRecommendations} style={chatBotStyles.button}>
        <Text style={chatBotStyles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
};

export default ChatInput;
