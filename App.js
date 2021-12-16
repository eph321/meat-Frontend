import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
console.disableYellowBox = true;
import React from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme} from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisterScreenB from "./screens/RegisterScreenB";
import RegisterScreenC from "./screens/RegisterScreenC";
import JoinTableScreen from "./screens/JoinTableScreen";
import MyTableScreen from "./screens/MyTableScreen";
import NewTableScreen from "./screens/NewTableScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import MyBuddiesScreen from "./screens/MyBuddiesScreen";

import ChatScreen from "./screens/ChatScreen";
import BuddyScreen from "./screens/BuddyScreen";
import MyEventsScreen from "./screens/MyEventsScreen";


import userRegister from './reducers/userRegister'
import tableId from "./reducers/event"
import userToken from './reducers/userToken'
import userConversation from "./reducers/userConversation";
import userLocation from "./reducers/userLocation"

// création du menu
const ThemeMeat = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    greenMeat: '#0E9BA4',
    yellowMeat: '#FFC960',
  },
};

const Stack = createStackNavigator();
const store = createStore(combineReducers({ userRegister, tableId, userToken, userConversation, userLocation }));



export default function App() {
  return (
      <StoreProvider store={store}>
        <PaperProvider theme={ThemeMeat}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="RegisterB" component={RegisterScreenB} />
                <Stack.Screen name="RegisterC" component={RegisterScreenC} />
                <Stack.Screen name="JoinTable" component={JoinTableScreen} />
                <Stack.Screen name="MyTable" component={MyTableScreen} />
                <Stack.Screen name="NewTable" component={NewTableScreen} />
                <Stack.Screen name="BuddyProfile" component={BuddyScreen} />
                <Stack.Screen name="MyAccount" component={MyAccountScreen} />
                <Stack.Screen name="MyBuddies" component={MyBuddiesScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="MyEvents" component={MyEventsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
      </StoreProvider>
  );
}



