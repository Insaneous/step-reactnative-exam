import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/slice/chatSlice";
import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const MessageInput = ({ chatId }) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messageInput = useRef();

  const handleSendMessage = async () => {
    const messageText = newMessage.trim();
    if (!messageText) return;

    const formData = new FormData();
    formData.append('text', messageText);

    setIsSending(true);
    try {
      await dispatch(sendMessage({ chatId, formData }));
      setNewMessage('');
      messageInput.current.clear();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
  <View style={styles.inputContainer}>
    <TextInput
      ref={messageInput}
      style={styles.input}
      placeholder="Type a message"
      value={newMessage}
      onChangeText={setNewMessage}
    />
    <TouchableOpacity
      onPress={handleSendMessage}
      style={[styles.sendButton, isSending && styles.sendingButton]}
      disabled={isSending}
    >
      <Text style={styles.sendButtonText}>{isSending ? 'Sending...' : '➤'}</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  sendButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: '100%',
  },
  sendingButton: {
    backgroundColor: '#aaa',
  },
  sendButtonText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MessageInput;