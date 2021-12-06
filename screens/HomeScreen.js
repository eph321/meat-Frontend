import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ResultScreen from "./ResultScreen";
import JoinTableScreen from "./JoinTableScreen";
import MyTableScreen from "./MyTableScreen";
import NewTableScreen from "./NewTableScreen";
import ProfileScreen from "./ProfileScreen";
import MyAccountScreen from "./MyAccountScreen";
import MyAddressesScreen from "./MyAddressesScreen";
import MyBuddiesScreen from "./MyBuddiesScreen";
import MyMessagesScreen from "./MyMessagesScreen";
import ChatScreen from "./ChatScreen";
import MyEventsScreen from "./MyEventsScreen";
import CreateTableScreen from "./CreateTableScreen";



function HomeScreen(props) {

    return (   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#9b59b6'}}>
            <Button title="Go to results"
                    onPress={() => props.navigation.navigate('Result')}
            />
            <Button title="Go to table"
                    onPress={() => props.navigation.navigate('CreateTable')}
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


export default HomeScreen;

