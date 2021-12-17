import React, { useState,useEffect } from 'react';
import {

    KeyboardAvoidingView,
    Platform,
    ScrollView,

    TouchableWithoutFeedback, Keyboard,
    View, StyleSheet
} from 'react-native';
import { IconButton,  List,  TextInput, Text} from "react-native-paper";
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

        socket.emit("sendMessage", JSON.stringify({content: currentMessage,
                                                             author: author,
                                                             conversation: props.conversationToSend,date: today }));
        //envoi d'une copie en database
        loadNewMessageToDatabase({content: currentMessage,
            author: author,
            conversation: props.conversationToSend,date: today  });
        setCurrentMessage("");
    }

    useEffect( ()=> {
        const getChatMessages = async () =>{
            let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/list-chat-messages/${props.conversationToSend}/${props.userToSend}`)
            let response = await rawResponse.json();

            setListMessages(response.chatMessages)
            console.log("messages recupérés")
            console.log(props.conversationToSend)
            console.log(props.userToSend)
            setAuthor(response.author)}

            getChatMessages();

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
        let dateParse = new Date(message.date)
        let formattedDate = dateParse.toLocaleString("fr-FR", { timeZone: "UTC", weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
        formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)  // Première lettre en Maj sur la card
        if ( message.author === author ){
            return <View key={i} style={{width:"70%",marginHorizontal:20,marginVertical:5}}><List.Item  style={{backgroundColor:"rgba(14, 155, 164, 0.22)",}}
                              title={message.author}

                              description={message.content}/>
                <Text>{formattedDate  }</Text>
            </View>
        }else if (message.author !== author){
            return <View  key={i} style={{width:"70%",marginHorizontal:20,marginVertical:5,alignSelf:"flex-end"}}>
            <List.Item  style={{backgroundColor:"rgba(255, 201, 96, 0.22)"}}
                              title={message.author}
                              description={message.content}/>
                <Text>{formattedDate              }</Text>
            </View>
        }
        
    }



    return (
        <View style={{flex:1,justifyContent: 'space-evenly'}}>
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


            </View>
            <View style={{flex:11}}>

            <ScrollView style={{ backgroundColor:"#F2F2F2"}}>

                <View style={{flex:1}}>
                        {listMessages.map((el,i)=> displayMessage(el,i))}
                </View>

            </ScrollView>


                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container}>

                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    {/*<View style={{marginBottom:120,flexDirection:"row",justifyContent:"center",marginHorizontal:10}}>*/}
                                        <View style={styles.inner}>
                            <TextInput

                                multiline={true}
                                style={{  textAlign:'center',width:'70%',alignSelf:"center" ,}}
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
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>

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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding:24,
        flex: 1,
        justifyContent: "space-around",
        alignItems:"center",
        flexDirection:"row",

    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
});