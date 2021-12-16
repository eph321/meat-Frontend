import React, {useEffect, useState} from 'react';
import {  View } from 'react-native';
import { Button, Appbar, Avatar, Title, IconButton,Colors   } from "react-native-paper";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import userToken from "../reducers/userToken";


function MyBuddiesScreen(props) {
    const isFocused = useIsFocused();
    const [relations,setRelations] = useState([]);
    const [currentUserStatus,setCurrentUserStatus] =useState([]);



        useEffect( () => {
            const abortController = new AbortController();
                        ( async () => {

                let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/list-related-users/${props.userToSend}`)
                let response = await rawResponse.json();
                setCurrentUserStatus(response.currentUser.buddies)

                setRelations([...response.listOfRelations])})()
            return () => {
                abortController.abort();}


        } , [relations])

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
        let toDisplay;
        let friends = <IconButton
            icon="forum"
            mode="contained"
            color={'#0E9BA4'}
            style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
            size={32}
            onPress={() => handleConversation(user.token)}
        />
        let waiter = <IconButton
            icon="account"
            mode="contained"
            color={Colors.grey400}
            style={{borderColor: Colors.grey400, backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
            size={32}
            onPress={() => console.log(userToken)}
        />
        let add =  <IconButton
            icon="account-plus"
            mode="contained"
            color={'#0E9BA4'}
            style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2 }}
            size={32}
            onPress={() => handleAcceptBuddy(user.token)}
        />
       if (
            (currentUserStatus.some((el) => el.token === user.token && el.status === true) )
            &&
            (user.buddies.some((el) => el.token === props.userToSend && el.status === true))
            ){
                toDisplay = friends;

        } else if (
            (currentUserStatus.some((el) => el.token === user.token && el.status === true) )
            &&
            (user.buddies.some((el) => el.token === props.userToSend && el.status === false))
        ){
            toDisplay = add;
        } else {
            toDisplay = waiter;
        }
        return <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start",marginBottom:5}} key={i}>
                        <Avatar.Image size={64} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(user.avatar)?{uri: user.avatar}:require("../assets/picture-4.png")} />
                        <View style={{marginTop:"3%", marginRight:"2%"}}>
                            <Title style={{fontWeight:"bold"}}>{user.firstname}</Title>

                        </View>

                            <View style={{flexDirection: "row"}}>
                                {toDisplay}

                                <IconButton
                                    icon="account-cancel"
                                    mode="contained"
                                    color={'#FF3D00'}
                                    style={{borderColor: "#FF3D00", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
                                    size={32}
                                    onPress={() => handleDeclineBuddy(user.token)}
                                />
                            </View>
        </View>

                        }

    return (
        <View style={{flex:1}}>



                {/*<View style={{ flex: 2,*/}
                {/*    left: 0,*/}
                {/*    width:"100%",*/}
                {/*    top: 0,*/}
                {/*    justifyContent:"flex-start",}}>*/}
                        {/*<Appbar style={{ backgroundColor: "#FFC960", flex:1}}>*/}
                        {/*        <Appbar.Content title="Mes buddies" style={{marginTop: 20,alignItems:"center", size: 17}} titleStyle={{fontSize: 22, fontWeight: "700", color: "#009788"}} />*/}
                        {/*</Appbar>*/}

                        <View style={{flex:1.5,backgroundColor:"#FFC960", width:"100%",flexDirection:"row",justifyContent:"space-around",alignItems:"flex-end"}}>
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
                {/*</View>*/}

                <View  style={{flex:11, backgroundColor:"#F2F2F2", justifyContent: "flex-start"}}>
                    <View style={{marginTop:10}}>
                    {relations.map((user,i)=> displayRelations(user,i))}
                        </View>
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
