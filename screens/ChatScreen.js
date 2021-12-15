import React, { useState,useEffect } from 'react';
import {AsyncStorage, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, IconButton,  List,  TextInput, Text} from "react-native-paper";
import socketIOClient from "socket.io-client";
import { useIsFocused } from '@react-navigation/native';
import {connect} from "react-redux";
import 'intl';
import 'intl/locale-data/jsonp/fr-FR';



const socket = socketIOClient("https://polar-stream-28883.herokuapp.com/");

function ChatScreen(props) {

    const [currentMessage,setCurrentMessage] = useState("")
    const [listMessages,setListMessages] = useState([])
    const [author, setAuthor] =useState("");
    const isFocused = useIsFocused();

    // props.userRegister.firstName
    const handlePress = async () => {
        const today = new Date(Date.now());
        const loadNewMessageToDatabase = async (message) =>{
            let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/update-messages`,{
                method:'POST',
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                body: `content=${message.content}&author=${message.author}&conversation=${props.conversationToSend}&date=${message.date}`

            });
            let response = await rawResponse.json();
            console.log("envoyé en bdd")
            console.log(response)

        }

        let formattedDate = new Intl.DateTimeFormat('fr-FR', { weekday: "long", day: '2-digit', month: '2-digit', year: '2-digit' }).format(today)


        socket.emit("sendMessage", JSON.stringify({content: currentMessage,
                                                             author: author,
                                                             conversation: props.conversationToSend,date: formattedDate  }));
        //envoi d'une copie en database
        loadNewMessageToDatabase({content: currentMessage,
            author: author,
            conversation: props.conversationToSend,date: formattedDate  });
        setCurrentMessage("");
    }

    useEffect( ()=> {
        const abortController = new AbortController();
        const getChatMessages = async () =>{
            let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/list-chat-messages/${props.conversationToSend}/${props.userToSend}`)
            let response = await rawResponse.json();

            setListMessages(response.chatMessages)
            setAuthor(response.author)}
        getChatMessages();
        return () => {
            abortController.abort();}


    },[isFocused])


    useEffect(() => {

        socket.on('sendMessageToAll', (newMessage)=> {
            if(newMessage !== null){
                let messageToFilter = JSON.parse(newMessage)
                console.log(messageToFilter)
                if (messageToFilter.conversation === props.conversationToSend){
                    setListMessages([...listMessages,messageToFilter ])}

                }
        });
        return () => socket.off("sendMessageToAll",(newMessage)=> {
            if(newMessage !== null){
                let messageToFilter = JSON.parse(newMessage)
                console.log("composant détruit")
                if (messageToFilter.conversation === props.conversationToSend){
                    setListMessages([...listMessages,messageToFilter ])}

            }
        })


    }, [listMessages]);

    const displayMessage = (message,i) => {
        if ( message.author === author ){
            return <View key={i} style={{width:"70%",marginHorizontal:20,marginVertical:5}}><List.Item  style={{backgroundColor:"rgba(14, 155, 164, 0.22)",}}
                              title={message.author}

                              description={message.content}/>
                <Text>{message.date}</Text>
            </View>
        }else if (message.author !== author){
            return <View  key={i} style={{width:"70%",marginHorizontal:20,marginVertical:5,alignSelf:"flex-end"}}>
            <List.Item  style={{backgroundColor:"rgba(255, 201, 96, 0.22)"}}
                              title={message.author}
                              description={message.content}/>
                <Text>{message.date}</Text>
            </View>
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
        userToSend: state.userToken,
        conversationToSend : state.userConversation
    }}

export default connect(
    mapStateToProps,
    null
)(ChatScreen);

