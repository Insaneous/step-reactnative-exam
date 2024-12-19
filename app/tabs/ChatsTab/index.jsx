import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../../redux/slice/chatSlice';
import ChatItem from '../../components/ChatItem';

export const ChatsTab = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchChats());
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No chats available</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
});

export default ChatsTab;
