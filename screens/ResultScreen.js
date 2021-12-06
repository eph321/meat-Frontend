import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import { IconButton,Colors} from 'react-native-paper';




function ResultScreen(props) {

    return (   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#9b59b6'}}>
      {/*      <IconButton
                icon=<AntDesign name="home" size={24} color={Colors.red500}/>
                color="black"
                size={24}
                onPress={() => props.navigation.navigate('MyAccount')}
            />
            <IconButton
                icon=<AntDesign name="calendar" size={24} color={Colors.red500} />
                color="black"
                size={24}
                onPress={() => props.navigation.navigate('MyEvents')}
            />
            <IconButton
                icon=<AntDesign name="pluscircle" size={24} color={Colors.red500} />
                color="black"
                size={24}
                onPress={() => props.navigation.navigate('NewTable')}
            />
            <IconButton
                icon=<AntDesign name="user" size={24} color={Colors.red500} />
                color="black"
                size={24}
                onPress={() => props.navigation.navigate('Profile')}
            />*/}
            <Button title="Join Table"
                    onPress={() => props.navigation.navigate('JoinTable')}
            />
            <Button title="Create Table"
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


export default ResultScreen;