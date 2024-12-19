import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { createOrGetChat } from "../api/apiClient";
import { FontAwesome } from "@expo/vector-icons";

const UserItem = ({ item }) => {
  const navigation = useNavigation();

  const handleUserPress = async (user) => {
    const response = await createOrGetChat(user.username);
    const chatId = response.data.id;
    navigation.navigate('ChatScreen', { chatId, chatName: user.username });
  };

  return (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleUserPress(item)}
    >
      <FontAwesome name="telegram" size={40} style={styles.userItemImage} />
      <Text style={styles.userName}>{item.username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userItem: {
    marginBottom: 5,
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userItemImage: {
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserItem;