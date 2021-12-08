import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';

import { AntDesign } from '@expo/vector-icons';


function ProfileScreen(props) {

    return (  
            
            
            
            
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#9b59b6'}}>
            <Button title="Go to Home"
            icon={<AntDesign name="home" size={24} color="black" />}
                    onPress={() => props.navigation.navigate('MyAccount')}
            />
            <Button title="Go to My Addresses" icon={<AntDesign name="calendar" size={24} color="black" />}
                    onPress={() => props.navigation.navigate('MyAddresses')}
            />
            <Button title="Go to My Buddies" icon={<AntDesign name="pluscircle" size={24} color="black" />}
                    onPress={() => props.navigation.navigate('MyBuddies')}
            />
            <Button  title="Go to Profile" icon={<AntDesign name="user" size={24} color="black" />}
                    onPress={() => props.navigation.navigate('Profile')}
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


export default ProfileScreen;

