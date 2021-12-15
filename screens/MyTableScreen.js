import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Title,  Card, Paragraph, Subheading, Appbar, IconButton, TextInput} from 'react-native-paper';
import { ListItem} from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import socketIOClient from "socket.io-client";
import {useIsFocused} from "@react-navigation/native";



function MyTableScreen(props) {

    const socket = socketIOClient("https://polar-stream-28883.herokuapp.com/");
    const [currentMessage,setCurrentMessage] =useState("")
    const [listMessages,setListMessages] = useState([])
    const [author, setAuthor] =useState("");
    const isFocused = useIsFocused();


    const handlePress = async () => {
        const today = new Date(Date.now());
        const loadNewMessageToDatabase = async (message) =>{
            let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/update-table-messages`,{
                method:'POST',
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                body: `content=${message.content}&author=${message.author}&eventId=${props.tableId}&date=${message.date}`

            });
            let response = await rawResponse.json();
            console.log("envoyé en bdd")
            console.log(response)
        }

        let formattedDate = new Intl.DateTimeFormat('fr-FR', { weekday: "long", day: '2-digit', month: '2-digit', year: '2-digit' }).format(today)


        socket.emit("sendMessage", JSON.stringify({content: currentMessage,
            author: author,
            room : props.tableId,date: formattedDate  }));
        //envoi d'une copie en database
        await loadNewMessageToDatabase({content: currentMessage,
            author: author,
            room: props.tableId,date: formattedDate  });
        setCurrentMessage("");
    }


    useEffect( ()=> {
        const getChatMessages = async () =>{
            let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/list-table-messages/${props.tableId}/${props.userToken}`)
            let response = await rawResponse.json();
            console.log("j'essaie de récupérer les messages")
            setListMessages(response.chat_messages)
            setAuthor(response.author)}
        getChatMessages();
        },[isFocused]);

    useEffect(() => {

        socket.on('sendMessageToAll', (newMessage)=> {
            if(newMessage !== null){
                let messageToFilter = JSON.parse(newMessage)
                console.log(messageToFilter)
                if (messageToFilter.room === props.tableId){
                    setListMessages([...listMessages,messageToFilter ])}
            }
        });
    }, [listMessages]);

    
    const [tableData, setTableData] = useState([''])
   

    const leaveTable = async () => {
    
        var dataRaw = await fetch(`https://polar-stream-28883.herokuapp.com/delete-guest/${props.tableId}/${props.userToken}`,{
            method: 'DELETE'
            
        }) 
        console.log(dataRaw, "okokokokok")

    };

    useEffect( async() => {
           var responseRaw = await fetch(`https://polar-stream-28883.herokuapp.com/join-table/${props.tableId}`)
           var response = await responseRaw.json();

            setTableData(response.result)
          }


        , []);
       
       

       var tableInfo = tableData;

      var tabCapacity = []
      for(let i = 0; i < tableInfo.capacity; i++) {
      
        
        tabCapacity.push(<MaterialCommunityIcons key={i}  name="seat" size={24} color="black"/>)


      }

      var bugdetInfo = []
      for(let j = 0; j < tableInfo.budget; j ++) {
          
        bugdetInfo.push(<MaterialIcons key={j} name="euro" size={24} color="green" />) 

      }

      var cardImage; 
        
      if(tableInfo.placeType === "Japonais") {
          cardImage= 'https://res.cloudinary.com/da3gufsec/image/upload/v1639514591/foods/sushi-japon_bknpwf.jpg'
      }
      else if(tableInfo.placeType === "Fast-food") {
          cardImage= 'https://res.cloudinary.com/da3gufsec/image/upload/v1639514591/foods/Fast_Food_w1zlhh.jpg'
        }
      else if(tableInfo.placeType === "Italien") {
          cardImage= 'https://res.cloudinary.com/da3gufsec/image/upload/v1639514591/foods/italianfood_buioqa.jpg'
        }
      else if(tableInfo.placeType === "Chinois") {
            cardImage= 'https://res.cloudinary.com/da3gufsec/image/upload/v1639514591/foods/chine_qdj6wj.jpg'
          }
       else if(tableInfo.placeType === "Mexicain") {
            cardImage= 'https://res.cloudinary.com/da3gufsec/image/upload/v1639514591/foods/mlarge-cuisine-mexicaine-nourriture-mexique-alimentation-tacos-salsa-mais_qwfuf8.jpg'
            
          }
       else if(tableInfo.placeType === "Coréen") {
            cardImage= 'https://res.cloudinary.com/da3gufsec/image/upload/v1639514591/foods/iStock-849756458_f4rfrk.jpg'
          }
       else if(tableInfo.placeType === "Indien") {
            cardImage= 'https://res.cloudinary.com/da3gufsec/image/upload/v1639514591/foods/istockphoto-922783734-1024x1024_vbrxdk.jpg'
          }
       else if(tableInfo.placeType === "Africain") {
            cardImage= 'https://res.cloudinary.com/da3gufsec/image/upload/v1639514590/foods/01-couscous-royal-traditionnel_pixn9t.jpg'
          }

    return (    
    
    
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>  
     <View style={{ flex: 2,
             left: 0,
             width:"100%",
             top: 0,
             justifyContent:"flex-start",}}>
             <Appbar style={{ backgroundColor: "#FFC960", flex:1}}>
                 <Appbar.Content title="Ma Table" style={{marginTop: 20,alignItems:"center", size: 17}} titleStyle={{fontSize: 22, fontWeight: "700", color: "#009788"}} />

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
                     icon="message-text"
                     color={'#0E9BA4'}
                     size={25}
                     onPress={() =>  props.navigation.navigate('Chat')}
                 />
                 <IconButton
                     icon="account"
                     color={'#0E9BA4'}
                     size={25}
                     onPress={() =>  props.navigation.navigate('MyAccount')}
                 />
                 <IconButton
                     icon="cancel"
                     color={'#0E9BA4'}
                     size={25}
                     onPress={() => {leaveTable(); props.navigation.navigate('Home')}}
                 />

             </View>
         </View>
        <View style={{flex:8,alignItems:"center"}}>
            <View style={{flex : 1, marginBottom:10,alignItems: 'center', justifyContent: 'center', height: 10}}>
            <Title>{tableInfo.title}</Title>
            <Subheading>{tableInfo.date}</Subheading>
            </View>
    
         <View style={{ flex: 5 , flexBasis : "auto", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
                <Card style={{ width : "45%" }}>
                        <Card.Content>
                            <Title>M.Eaters : 1/{tableInfo.capacity}</Title>
                            <View style={{flexDirection: "row"}}>{tabCapacity}</View>
                            <Title>Budget : {bugdetInfo}</Title>
                            
                            <Title ><FontAwesome5 name="walking" size={24} color="black" />  à 150 mètres</Title>
                            <Title><MaterialIcons name="restaurant" size={24} color="black" />  {tableInfo.placeType}</Title>
                            <Title><FontAwesome name="birthday-cake" size={24} color="black" />  {tableInfo.age}</Title>
                        </Card.Content>
                </Card>
                
                <Card style={{marginLeft : 10 ,  width : "45%"  }}>
                <Card.Cover style = {{height : 150}} source={{ uri: cardImage }} />
                
                        <Card.Content>

                            <Title>{tableInfo.placeName}</Title>
                            <Paragraph>{tableInfo.placeAddress}</Paragraph>
                        </Card.Content>

                </Card>
        </View>
       
       <View style={{flex : 4, justifyContent: 'center'}}>
           <Card style={{width:"100%"}}>
                   <Card.Content>
                   <ScrollView style={{flex:1, marginTop: 50}}>
                       {listMessages.map((message,i)=>{
                           return <ListItem key={i}>
                               <ListItem.Content >
                                       <ListItem.Title>message.content</ListItem.Title>
                                       <ListItem.Subtitle>message.author</ListItem.Subtitle>
                                   </ListItem.Content>
                       </ListItem>
                       })}

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
                   </Card.Content>


           </Card>



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
    },
});
const stylesBar = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    }, viewHeader: {
        flex: 2,
        left: 0,
        width: "100%",
        top: 0,
        justifyContent: "flex-start",
    },
    input: {
        flex: 0.1
    },
});


function mapStateToProps(state) {
    return { tableId:  state.tableId,
        userToken: state.userToken,
    }
  }
  
  export default connect(
      mapStateToProps, 
      null
      
  )(MyTableScreen);