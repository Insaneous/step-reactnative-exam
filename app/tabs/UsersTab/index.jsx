import { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slice/userSlice';
import UserItem from '../../components/UserItem';

const UsersTab = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading); 
  const error = useSelector((state) => state.users.error); 
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = currentUser ? users.filter((user) => user.id !== currentUser.id) : users;

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading users. Please try again later.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => <UserItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
});

export default UsersTab;
