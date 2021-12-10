import React, {useEffect, } from 'react';
import { StyleSheet,  TouchableOpacity, View } from 'react-native';
import {TextInput, Button, Appbar, Avatar, Title, IconButton, Colors, Card, Paragraph} from "react-native-paper";
import { FontAwesome5 } from '@expo/vector-icons';
import { Icon } from 'react-native-elements/dist/icons/Icon';



function MyBuddiesScreen(props) {

    useEffect(async () => {
            const rawResponse = await fetch("https://polar-stream-28883.herokuapp.com/list-related-users");
            const response = await rawResponse.json();
            if(props.userToSend !== null){
                console.log(props.userToSend+ "j'ai bien récupéré le token dans le store")}

            console.log(response.result[0].email)

            setUserList(response.result)

        }
        , [])


    const displayUser = (user,i) => {

        return <TouchableOpacity key={i} onPress={() => handleAddFriend(user.token)}>
            <View  style={{flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
                <Card style={{borderColor: "#FFC960", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "3%",width:"100%"}}>
                    <Card.Content style={{flexDirection: "row",alignItems:"center"}}>
                        <Avatar.Image size={60} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={require('../assets/picture-4.png')} />
                        <View>
                            <Title style={{fontWeight:"bold", fontSize:30, marginBottom:5}}>{user.firstname}</Title>
                            <Paragraph>{user.description}</Paragraph>
                            <Paragraph>{user.preference1}</Paragraph>
                            <Paragraph>{user.preference2}</Paragraph>
                            <Paragraph>{user.preference3}</Paragraph>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </TouchableOpacity>}


    return (   
        <View style={{flex:1}}>


                        {/* EN-TETE DE LA PAGE DE BUDDYSCREEN */}
                <View style={{ flex: 2,
                    left: 0,
                    width:"100%",
                    top: 0,
                    justifyContent:"flex-start",}}>
                        <Appbar style={{ backgroundColor: "#FFC960", flex:1}}>
                                <Appbar.Content title="Mes buddies" style={{marginTop: 20,alignItems:"center", size: 17}} titleStyle={{fontSize: 22, fontWeight: "700", color: "#009788"}} />
                        </Appbar>
                        <View style={{flex:1,backgroundColor:"#F2F2F2", width:"100%",flexDirection:"row",justifyContent:"space-around"}}>
                            <IconButton
                                icon="home"
                                color={'#0E9BA4'}
                                size={25}
                                onPress={() => props.navigation.navigate('Home')}
                            />
                            <IconButton
                                icon="plus-circle"
                                color={'#0E9BA4'}
                                size={25}
                                onPress={() => props.navigation.navigate('MyAdresses')}
                            />
                            <IconButton
                                icon="calendar-month"
                                color={'#0E9BA4'}
                                size={25}
                                onPress={() =>props.navigation.navigate('MyEvents')}
                            />
                            <IconButton
                                icon="account"
                                color={'#0E9BA4'}
                                size={25}
                                onPress={() =>  props.navigation.navigate('MyAccount')}
                            />
                        </View>
                </View>

                <View  style={{flex:7, backgroundColor:"#F2F2F2"}}>

                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginBottom:5}}>
                                <Avatar.Image size={60} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={require('../assets/picture-4.png')} />
                                <View style={{marginTop:"3%", marginRight:"2%"}}>      
                                        <Title style={{fontWeight:"bold", fontSize:30, marginBottom:"-8%"}}>Arthur</Title>
                                        <Title style={{fontStyle:"italic", fontSize:11}}>Buddy depuis le 10/10/2021</Title>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                        <Button style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "3%"}}
                                                mode="contained"
                                                icon="account-plus"
                                                labelStyle={{marginTop: "50%", marginLeft: 1, color: "#009788", fontSize: 30}}
                                                onPress={() => props.navigation.navigate('MyMessages')}
                                        >
                                        </Button>
                                        <Button style={{borderColor: "#FF3D00", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "5%"}}
                                                mode="contained"
                                                icon="account-cancel"
                                                labelStyle={{marginTop: "50%", marginLeft: 0, color: "#FF3D00", fontSize: 35 }}
                                                onPress={() => props.navigation.navigate('MyMessages')}
                                        >
                                        </Button>
                                </View>
                        </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginBottom:5}}>
                        <Avatar.Image size={60} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={require('../assets/picture-4.png')} />
                        <View style={{marginTop:"3%", marginRight:"2%"}}>
                            <Title style={{fontWeight:"bold", fontSize:30, marginBottom:"-8%"}}>Arthur</Title>
                            <Title style={{fontStyle:"italic", fontSize:11}}>Buddy depuis le 10/10/2021</Title>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Button style={{borderColor: Colors.grey400, backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "3%"}}
                                    mode="contained"
                                    icon="account-clock"
                                    labelStyle={{marginTop: "50%", marginLeft: 1, color: Colors.grey400, fontSize: 30}}
                                    onPress={() => props.navigation.navigate('MyMessages')}
                            >
                            </Button>
                            <Button style={{borderColor: "#FF3D00", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "5%"}}
                                    mode="contained"
                                    icon="account-cancel"
                                    labelStyle={{marginTop: "50%", marginLeft: 0, color: "#FF3D00", fontSize: 35 }}
                                    onPress={() => props.navigation.navigate('MyMessages')}
                            >
                            </Button>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginBottom:5}}>
                        <Avatar.Image size={60} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={require('../assets/picture-4.png')} />
                        <View style={{marginTop:"3%", marginRight:"2%"}}>
                            <Title style={{fontWeight:"bold", fontSize:30, marginBottom:"-8%"}}>Arthur</Title>
                            <Title style={{fontStyle:"italic", fontSize:11}}>Buddy depuis le 10/10/2021</Title>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Button style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "3%"}}
                                    mode="contained"
                                    icon="forum"
                                    labelStyle={{marginTop: "50%", marginLeft: 1, color: "#009788", fontSize: 30}}
                                    onPress={() => props.navigation.navigate('MyMessages')}
                            >
                            </Button>
                            <Button style={{borderColor: "#FF3D00", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "5%"}}
                                    mode="contained"
                                    icon="account-remove"
                                    labelStyle={{marginTop: "50%", marginLeft: 0, color: "#FF3D00", fontSize: 35 }}
                                    onPress={() => props.navigation.navigate('MyMessages')}
                            >
                            </Button>
                        </View>
                    </View>
                        
                </View>




        </View>


    


    );
}


export default MyBuddiesScreen;