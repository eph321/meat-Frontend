import React, { useState,useEffect } from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, IconButton, RadioButton, List, Button, TextInput, Text,Chip,Card,Title,Paragraph,Badge} from "react-native-paper";
import socketIOClient from "socket.io-client";
import {connect} from "react-redux";


var socket = socketIOClient("http://192.168.1.246:3000");

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

                setListMessages([...listMessages, JSON.parse(newMessage)])};
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
   const tabTest = [{author:"arthur",content:"Oui, j’ai beaucoup aimé l’ambiance, c’était cool de faire partie de ce goupe de M.eaters."},
       {author:"axel",content:"D’ailleurs, je tenais à te remercier pour ta bonne humeur, j’ai beaucoup rigolé "},
       {author:"arthur",content:"J’espère qu’on aura l’occasion de le refaire!"},
       {author:"axel",content:"Je crée une table pour la semaine prochaine. "},]



    return (
        <View style={{flex:1,justifyContent: 'space-evenly'}}>
        <View style={styles.viewHeader}>
                    <Appbar style={{flex:1,backgroundColor:"#FFC960"}}>
                        <Appbar.Content title="Messages" style={{textAlign:'center'}}/>
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

    }, surface: {
        width: "80%",
        alignItems: 'flex-start',
        justifyContent: 'center',
        elevation: 10,
    }
});



function mapStateToProps(state) {
    return {
        userToSend: state.userRegister
    }}

export default connect(
    mapStateToProps,
    null
)(ChatScreen);

