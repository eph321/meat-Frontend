import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';
import {AntDesign} from "@expo/vector-icons";



function MyMessagesScreen(props) {

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
            <Button title="Go to login"
                    onPress={() => props.navigation.navigate('Chat')}
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


export default MyMessagesScreen;