import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const MessageItem = ({ message }) => {
  const currentUser = useSelector((state) => state.auth.user);
  
  return (
    <View
      style={[
        styles.message,
        message.user_id === currentUser.id ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#000',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MessageItem;