// styles/chatBotStyles.js
import { StyleSheet } from 'react-native';

const colors = {
  background: '#F5F5F5',
  border: '#DDD',
  inputBorder: '#CCC',
  inputBackground: '#FFF',
  buttonBackground: '#022e24',
  buttonText: '#FFF',
  userMessageBackground: '#E1FFC7',
  botMessageBackground: '#FFF',
  userIconColor: '#007AFF',
  botIconColor: '#FF4500',
  text: '#333',
  loadingText: '#888',
};

const chatBotStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatContent: {
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.inputBackground,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 20,
    marginRight: 10,
  },
  button: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: colors.buttonBackground,
  },
  buttonText: {
    color: colors.buttonText,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.userMessageBackground,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginLeft: 40,
    flexDirection: 'row',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.botMessageBackground,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    marginRight: 40,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    color: colors.loadingText,
    marginVertical: 10,
  },
});

export { colors, chatBotStyles };
