import React, { useState } from 'react';
import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import {TextInput, Button, Appbar, Avatar, Title, IconButton} from "react-native-paper";
import { FontAwesome5 } from '@expo/vector-icons';
import { Icon } from 'react-native-elements/dist/icons/Icon';



function MyBuddiesScreen(props) {



    return (   
        <View style={styles.container}>


                        {/* EN-TETE DE LA PAGE DE BUDDYSCREEN */}
                <View>
                        <Appbar style={{ backgroundColor: "#FFC960", height: "100%"}}>
                                <Appbar.Content title="Mes buddies" style={{paddingTop: "20%", size: 17}} titleStyle={{fontSize: 22, fontWeight: "700", color: "#009788"}} />
                        </Appbar>
                        <Appbar.Header style={{flex: 1, backgroundColor:"#F2F2F2", width:"100%", justifyContent:"space-around", paddingTop:"20%"}} labelStyle={{color: "#009788"}}>
                                <IconButton icon="home" color={'#0E9BA4'} size={25} onPress={() => props.navigation.navigate('Home')}/>
                                <IconButton icon="plus-circle" color={'#0E9BA4'} size={25} onPress={() => props.navigation.navigate('MyAdresses')}/>
                                <IconButton icon="calendar" color={'#0E9BA4'} size={25} onPress={() => props.navigation.navigate('MyEvents')}/>
                                <IconButton icon="account-circle" color={'#0E9BA4'} size={25} onPress={() => props.navigation.navigate('MyAccount')}/>
                        </Appbar.Header>
                </View>

                <View >
                        {/* BARRE DE RECHERCHE DE LA LISTE DE BUDDY
                        
                        <View style={{width: "100%", marginTop: 60, marginRight: 20, marginLeft: 22, marginBottom: 40}}>
                                <TextInput
                                        outlineColor="#009788" activeOutlineColor="#009788"
                                        mode="outlined"
                                        label="Mes buddies"
                                        placeholder="Rechercher un buddy dans ma liste..."
                                />
                        </View> */}


                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <Avatar.Image size={60} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={require('../assets/picture-4.png')} />
                                <View style={{marginTop:"3%", marginRight:"2%"}}>      
                                        <Title style={{fontWeight:"bold", fontSize:30, marginBottom:"-8%"}}>Arthur</Title>
                                        <Title style={{fontStyle:"italic", fontSize:11}}>Buddy depuis le 10/10/2021</Title>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                        <Button style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "3%"}}
                                                mode="contained"
                                                icon="email-outline"
                                                labelStyle={{marginTop: "50%", marginLeft: 1, color: "#009788", fontSize: 30}}
                                                onPress={() => props.navigation.navigate('MyMessages')}
                                        >
                                        </Button>
                                        <Button style={{borderColor: "#FFC960", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "5%"}}
                                                mode="contained"
                                                icon="trash-can-outline"
                                                labelStyle={{marginTop: "50%", marginLeft: 0, color: "#FFC960", fontSize: 35 }}
                                                onPress={() => props.navigation.navigate('MyMessages')}
                                        >
                                        </Button>
                                </View>
                        </View>
                       
                        
                </View>




        </View>


    


    );
}

const styles = StyleSheet.create({
    container: { 
            flex: 0.15,
            justifyContent: "center",
    },
});


export default MyBuddiesScreen;