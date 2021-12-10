import React, { useState,useEffect } from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, IconButton,  List,  TextInput, } from "react-native-paper";
import socketIOClient from "socket.io-client";
import {connect} from "react-redux";


var socket = socketIOClient("https://polar-stream-28883.herokuapp.com/");

function ChatScreen(props) {
    const [currentMessage,setCurrentMessage] = useState("")
    const [listMessages,setListMessages] = useState([])

    // props.userRegister.firstName
    const handlePress = () => {
        socket.emit("sendMessage", JSON.stringify({content: currentMessage, author: props.userToSend.firstName }));
        setCurrentMessage("");
    }


    useEffect(() => {

        socket.on('sendMessageToAll', (newMessage)=> {
            if(newMessage !== null){

                setListMessages([...listMessages, JSON.parse(newMessage)])}
            console.log(newMessage);

        });

    }, [listMessages]);

    const displayMessage = (message,i) => {
        if ( i % 2 === 0){
            return <List.Item key={i} style={{backgroundColor:"rgba(14, 155, 164, 0.22)",width:"70%",marginHorizontal:20,marginVertical:5}}
                              title={message.author}

                              description={message.content}/>
        }else {
            return <List.Item key={i} style={{backgroundColor:"rgba(255, 201, 96, 0.22)",width:"70%",alignSelf:"flex-end",marginHorizontal:20,marginVertical:5}}
                              title={message.author}
                              description={message.content}/>
        }
        
    }



    return (
        <View style={{flex:1,justifyContent: 'space-evenly'}}>
            <View style={{ flex: 2,
                left: 0,
                width:"100%",
                top: 0,
                justifyContent:"flex-start",}}>
                <Appbar style={{ backgroundColor: "#FFC960", flex:1}}>
                    <Appbar.Content title="Messages" style={{marginTop: 20,alignItems:"center", size: 17}} titleStyle={{fontSize: 22, fontWeight: "700", color: "#009788"}} />

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
                        onPress={() => props.navigation.navigate('NewTable')}
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
                    <IconButton
                        icon="target-account"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() =>  props.navigation.navigate('BuddyProfile')}
                    />
                </View>
            </View>

            <View style={{flex:7, backgroundColor:"#F2F2F2"}}>
                <View style={{flex:1}}>

                    <ScrollView style={{flex:1, marginTop: 50}}>


                        {listMessages.map((el,i)=> displayMessage(el,i))}




                        {/*{listMessages.map((message,i) => displwayMessage(message,i))}*/}
                    </ScrollView>

                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>


                        <View style={{flexDirection:"row",justifyContent:"center"}}>
                            <TextInput

                                multiline={true}
                                style={{  textAlign:'center',width:'70%',alignSelf:"center" }}
                                mode="outlined"
                                label="Message"
                                onChangeText={(message)=>setCurrentMessage(message)}
                                activeOutlineColor={"#FF3D00"}
                                outlineColor={'#0E9BA4'}
                                containerStyle = {{marginBottom: 5}}
                                placeholder='Ecrire ici...'
                                value={currentMessage}
                            />
                            <IconButton
                                icon="send"
                                color={'#0E9BA4'}
                                size={25}
                                onPress={() => handlePress()}
                            />
                        </View>
                    </KeyboardAvoidingView>

                </View>


            </View>
        </View>

    );
}


function mapStateToProps(state) {
    return {
        userToSend: state.userRegister
    }}

export default connect(
    mapStateToProps,
    null
)(ChatScreen);

