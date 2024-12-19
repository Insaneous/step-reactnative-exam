import { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatById } from '../../redux/slice/chatSlice';
import { useRoute } from '@react-navigation/native';
import { useWebsocket } from '../../hooks/useWebsocket';
import MessageItem from '../../ui/MessageItem';
import MessageInput from '../../components/MessageInput';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { chatId, chatName } = route.params;
  const chat = useSelector((state) => state.chat.selectedChat);
  const messages = useSelector((state) => state.chat.selectedChat?.data || []);

  useEffect(() => {
    dispatch(fetchChatById(chatId));
  }, [dispatch, chatId]);

  useWebsocket(chatId);

  if (!chat) return <View style={styles.container}><Text>Loading...</Text></View>;
  if (chat.error) return <View style={styles.container}><Text>Error loading chat. Please try again later.</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.chatName}>
          {chatName}
        </Text>
      </View>
      
      <FlatList
        data={messages.filter((item) => item.id != null)}
        renderItem={({ item }) => (<MessageItem message={item} />)}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `key-${index}`)}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      <MessageInput chatId={chatId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  chatName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default ChatScreen;
