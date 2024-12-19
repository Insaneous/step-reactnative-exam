import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import ProfileTab from "./tabs/ProfileTab";
import ChatsTab from "./tabs/ChatsTab";
import UsersTab from "./tabs/UsersTab";

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tab.Screen
        name="Chats"
        component={ChatsTab}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="comments" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersTab}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="address-book" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
