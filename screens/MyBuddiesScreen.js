import React, {useEffect, useState} from 'react';
import {  View } from 'react-native';
import { Button, Appbar, Avatar, Title, IconButton} from "react-native-paper";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";


function MyBuddiesScreen(props) {
    const isFocused = useIsFocused();
    const [relations,setRelations] = useState([]);



        useEffect( () => {
                        ( async () => {

                let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/list-related-users/${props.userToSend}`)
                let response = await rawResponse.json();
                setRelations([...response.listOfRelations])})()

        } , [isFocused])

    const handleAcceptBuddy = async (buddyToken) => {

        let rawSend = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/accept-buddy`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${props.userToSend}&userToken=${buddyToken}`

        })
        let sendResponse = await rawSend.json();

    };
    const handleDeclineBuddy = async (buddyToken) => {

        let rawSend = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/decline-buddy`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${props.userToSend}&userToken=${buddyToken}`

        })
        let sendResponse = await rawSend.json();

    };

    const handleConversation = async (buddyToken) => {
        let rawSend = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/conversation`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${props.userToSend}&userToken=${buddyToken}`

        })
        let sendResponse = await rawSend.json();
        props.sendConversationToStore(sendResponse.conv)

        props.navigation.navigate('Chat');

    };




    const displayRelations = (user,i) => {


        return <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start",marginBottom:5}} key={i}>
                        <Avatar.Image size={64} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(user.avatar)?{uri: user.avatar}:require("../assets/picture-4.png")} />
                        <View style={{marginTop:"3%", marginRight:"2%"}}>
                            <Title style={{fontWeight:"bold"}}>{user.firstname}</Title>

                        </View>
                            {(user.buddies.filter((buddy) => buddy.status === true && buddy.token === props.userToSend).length !== 0 )
                            ?
                            <View style={{flexDirection: "row"}}>
                                <IconButton
                                    icon="forum"
                                    mode="contained"
                                    color={'#0E9BA4'}
                                    style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
                                    size={32}
                                    onPress={() => handleConversation(user.token)}
                                />
                                <IconButton
                                    icon="account-remove"
                                    mode="contained"
                                    color={'#FF3D00'}
                                    style={{borderColor: "#FF3D00", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
                                    size={32}
                                    onPress={() => handleDeclineBuddy(user.token)}
                                />

                            </View>
                            :
                            <View style={{flexDirection: "row"}}>
                                         <IconButton
                                    icon="account-plus"
                                    mode="contained"
                                    color={'#0E9BA4'}
                                    style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2 }}
                                    size={32}
                                    onPress={() => handleAcceptBuddy(user.token)}
                                />
                                <IconButton
                                    icon="account-cancel"
                                    mode="contained"
                                    color={'#FF3D00'}
                                    style={{borderColor: "#FF3D00", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
                                    size={32}
                                    onPress={() => handleDeclineBuddy(user.token)}
                                />
                            </View>}
        </View>

                        }

    return (
        <View style={{flex:1}}>



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
                    {relations.map((user,i)=> displayRelations(user,i))}
                    {/*<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginBottom:5}}>
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
                    </View>*/}

                </View>




        </View>





    );
}
function mapDispatchToProps(dispatch){
    return {
        sendConversationToStore: function (conversationId){
            dispatch({type: 'registerConversation',conversationId})
        }

    }
}


function mapStateToProps(state) {
    return {
        userToSend: state.userToken
    }}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyBuddiesScreen);
