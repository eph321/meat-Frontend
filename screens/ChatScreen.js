import React, { useState,useEffect } from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar,IconButton, RadioButton,List, Text, TextInput} from "react-native-paper";
import socketIOClient from "socket.io-client";

var socket = socketIOClient("http://192.168.1.246:3000");

function ChatScreen(props) {
    const [currentMessage,setCurrentMessage] = useState("")
    const [listMessages,setListMessages] = useState([])


    const handlePress = () => {
        socket.emit("sendMessage", JSON.stringify({content: emotify(currentMessage), author: props.pseudoToDisplay}));
        setCurrentMessage("");
    }


    useEffect(() => {

        socket.on('sendMessageToAll', (newMessage)=> {
            if(newMessage !== null){

                setListMessages([...listMessages, JSON.parse(newMessage)])};
            console.log(newMessage);

        });

    }, [listMessages]);

    // const displayMessage = (message,i) => {
    //     return <List.Item key={i}>
    //         <ListItem.Content>
    //             <ListItem.Title>{message.content}</ListItem.Title>
    //             <ListItem.Subtitle>{message.author}</ListItem.Subtitle>
    //         </ListItem.Content>
    //     </List.Item>;
    // }



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
            </View>
        </View>
            <View style={{flex:7, backgroundColor:"#F2F2F2"}}>
                <View style={{flex:1}}>

                    <ScrollView style={{flex:1, marginTop: 50}}>
                        <List.Item
                            title="First Item"
                            description="Item description"
                            left={props => <List.Icon {...props} icon="folder" />}
                        />
                        {/*{listMessages.map((message,i) => displwayMessage(message,i))}*/}
                    </ScrollView>

                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <TextInput
                            style={{  textAlign:'center',width:'70%',alignSelf:"center" }}
                            mode="outlined"
                            label="Adresse mail"
                            onChangeText={(message)=>setCurrentMessage(message)}
                            placeholder ="M.eater_75%"
                            activeOutlineColor={"#FF3D00"}
                            outlineColor={'#0E9BA4'}
                        <TextInput
                            containerStyle = {{marginBottom: 5}}
                            ref={messageInput}
                            placeholder='Your message'
                            value={currentMessage}

                        />
                        <Button
                            icon={
                                <Icon
                                    name="envelope-o"
                                    size={20}
                                    color="#ffffff"
                                />
                            }
                            title="Send"
                            buttonStyle={{backgroundColor: "#eb4d4b"}}
                            type="solid"
                            onPress={()=> handlePress()}
                        />
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

    },
});



export default ChatScreen;