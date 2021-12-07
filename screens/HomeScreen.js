import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, Button, Appbar} from "react-native-paper";


function HomeScreen(props) {

    return (   <View style={{flex:1,justifyContent: 'space-evenly'}}>
                    <View style={styles.viewHeader}>
                        <Appbar style={{flex:1,backgroundColor:"#FFC960"}}>
                            <Appbar.Content title="Mon Profil" style={{textAlign:'center'}}/>
                        </Appbar>
                        <Appbar style={{flex:1,backgroundColor:"#F2F2F2", width:"100%",justifyContent:"space-evenly"}}>
                            <Appbar.Action icon="home" onPress={() => props.navigation.navigate('Home')} />
                            <Appbar.Action icon="plus-circle" onPress={() => props.navigation.navigate('NewTable')} />
                            <Appbar.Action icon="calendar-month" onPress={() => props.navigation.navigate('MyEvents')} />
                            <Appbar.Action icon="message-text" onPress={() => props.navigation.navigate('Chat')} />
                            <Appbar.Action icon="account" onPress={() => props.navigation.navigate('MyAccount')}
                            />
                        </Appbar>
                    </View>
                    <View style={{flex:7, backgroundColor:"#F2F2F2",justifyContent:"space-evenly"}}>

                        <Button
                            style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#0E9BA4",color:'#FFC960' }}
                            mode="contained" onPress={() =>{ props.navigation.navigate('JoinTable'); }}>
                            <Text Style={{color:'#FFC960'}}>Go to join</Text>
                        </Button>
                    </View>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },viewHeader: {
        flex: 2,
        left: 0,
        width:"100%",
        top: 0,
        justifyContent:"flex-start",


    },
});

export default HomeScreen;

