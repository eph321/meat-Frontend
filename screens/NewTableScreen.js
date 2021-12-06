import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import ResultScreen from "./ResultScreen";
import MyTableScreen from "./MyTableScreen";
import ProfileScreen from "./ProfileScreen";
import MyAccountScreen from "./MyAccountScreen";
import MyAddressesScreen from "./MyAddressesScreen";
import MyBuddiesScreen from "./MyBuddiesScreen";
import MyMessagesScreen from "./MyMessagesScreen";
import ChatScreen from "./ChatScreen";
import MyEventsScreen from "./MyEventsScreen";
import CreateTableScreen from "./CreateTableScreen";
import JoinTableScreen from "./JoinTableScreen";
import {AntDesign} from "@expo/vector-icons";



function NewTableScreen(props) {

    return (   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#9b59b6'}}>
                <Button
                    icon={<AntDesign name="home" size={24} color="black" />}
                    onPress={() => props.navigation.navigate('MyAccount')}
                />
                <Button icon={<AntDesign name="calendar" size={24} color="black" />}
                        onPress={() => props.navigation.navigate('MyAddresses')}
                />
                <Button icon={<AntDesign name="pluscircle" size={24} color="black" />}
                        onPress={() => props.navigation.navigate('MyBuddies')}
                />
                <Button icon={<AntDesign name="user" size={24} color="black" />}
                        onPress={() => props.navigation.navigate('Profile')}
                />
            <Button title="Go to Home "
                    onPress={() => props.navigation.navigate('Home')}
            />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default NewTableScreen;

