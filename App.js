
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResultScreen from "./screens/ResultScreen";
import JoinTableScreen from "./screens/JoinTableScreen";
import MyTableScreen from "./screens/MyTableScreen";
import NewTableScreen from "./screens/NewTableScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import MyBuddiesScreen from "./screens/MyBuddiesScreen";
import MyMessagesScreen from "./screens/MyMessagesScreen";
import ChatScreen from "./screens/ChatScreen";
import MyEventsScreen from "./screens/MyEventsScreen";
import MyAddressesScreen from "./screens/MyAddressesScreen";

import { Provider as PaperProvider } from 'react-native-paper';


// création du menu

const Stack = createStackNavigator();

export default function App() {
  return (
<PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="JoinTable" component={JoinTableScreen} />
            <Stack.Screen name="MyTable" component={MyTableScreen} />
            <Stack.Screen name="NewTable" component={NewTableScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="MyAccount" component={MyAccountScreen} />
            <Stack.Screen name="MyAddresses" component={MyAddressesScreen} />
            <Stack.Screen name="MyBuddies" component={MyBuddiesScreen} />
            <Stack.Screen name="MyMessages" component={MyMessagesScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="MyEvents" component={MyEventsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

