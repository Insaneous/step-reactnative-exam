import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const ChatItem = ({ item }) => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.user);
  const lastMessageText = item.last_message || 'No messages yet';
  const truncatedLastMessage = lastMessageText.length > 35 ? lastMessageText.substring(0, 35) + '...' : lastMessageText;
  const chatName = item.type === 'personal'
    ? item.users.find((user) => user.username !== currentUser?.username)?.username
    : item.name;
    
  const handleChatClick = (chatId) => {
    navigation.navigate('ChatScreen', { chatId, chatName });
  };
  
  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatClick(item.id)}
    >
      <FontAwesome name="telegram" size={50} style={styles.chatItemImage} />
      <View style={styles.chatItemText}>
        <Text style={styles.chatName}>
          {chatName}
        </Text>
        <Text style={styles.lastMessage}>{truncatedLastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  chatItemImage: {
    marginRight: 10,
  },
  chatItemText: {
    flex: 1,
  },
  chatName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
    color: '#666',
  },
});

export default ChatItem;