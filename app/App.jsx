import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { useSelector } from "react-redux";
import AuthScreen from "./screens/AuthScreen";
import Tabs from "./tabs";
import ChatScreen from "./screens/ChatScreen";

export default function App() {
  NavigationBar.setBackgroundColorAsync("#ffffff01");
  NavigationBar.setButtonStyleAsync("dark");
  const Stack = createStackNavigator();
  const { token } = useSelector((state) => state.auth);
  
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {token ? (
              <>
                <Stack.Screen name="MainTabs" component={Tabs} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
              </>
            ) : (
              <Stack.Screen name="Auth" component={AuthScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
