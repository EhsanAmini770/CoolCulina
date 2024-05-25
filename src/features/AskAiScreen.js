// components/AskAi.js
import React, { useState, useEffect, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { getOpenAIResponse } from '../services/openAiService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../components/Header';
import ChatMessages from '../components/AskAi/ChatMessages';
import ChatInput from '../components/AskAi/ChatInput';
import { chatBotStyles } from '../styles/ChatBotStyles';

export default function AskAi() {
  const [userInfo, setUserInfo] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const getRecommendations = async () => {
    try {
      if (!userInfo.trim()) return;
      setIsLoading(true);

      const userMessage = { type: 'user', text: userInfo };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setUserInfo('');

      const initialPrompt = `Task: Create a recipe generator that suggests recipes based on the ingredients provided by the user. The AI should only accept the ingredients and generate a corresponding recipe. The focus should be on using common household ingredients and providing clear, easy-to-follow recipes.`;
      const response = await getOpenAIResponse(initialPrompt + userInfo);
      const botMessage = { type: 'bot', text: response };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      const errorMessage = { type: 'bot', text: 'Failed to get recommendations.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={chatBotStyles.container}>
      <Header title="Ask AI" />
      <KeyboardAvoidingView
        style={chatBotStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          style={chatBotStyles.chatContainer}
          contentContainerStyle={chatBotStyles.chatContent}
        >
          <ChatMessages messages={messages} isLoading={isLoading} />
        </KeyboardAwareScrollView>
        <ChatInput
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          getRecommendations={getRecommendations}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
