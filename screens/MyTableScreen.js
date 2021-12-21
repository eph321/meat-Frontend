import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {Title, Card, Paragraph, Subheading, IconButton, TextInput, List, Text, Avatar} from 'react-native-paper';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import socketIOClient from "socket.io-client";
import {useIsFocused} from "@react-navigation/native";
import haversine from "haversine";

const herokuIP = "https://polar-stream-28883.herokuapp.com"

function MyTableScreen(props) {

    const socket = socketIOClient("https://polar-stream-28883.herokuapp.com/");
    const [currentMessage,setCurrentMessage] =useState("")
    const [listMessages,setListMessages] = useState([])
    const [author, setAuthor] =useState("");
    const isFocused = useIsFocused();
    const [plannerAvatar, setPlannerAvatar] = useState('')
    const [guestList, setGuestList] = useState([''])



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



        socket.emit("sendMessage", JSON.stringify({content: currentMessage,
            author: author,
            room : props.tableId,date: today  }));
        //envoi d'une copie en databases
        await loadNewMessageToDatabase({content: currentMessage,
            author: author,
            room: props.tableId,date: today  });
        setCurrentMessage("");
    }


    useEffect( ()=> {


        const getChatMessages = async () =>{
            let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/list-table-messages/${props.tableId}/${props.userToken}`)
            let response = await rawResponse.json();
            setListMessages(response.chatMessages)
            console.log("getchatmessages",response)
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


    useEffect(async () => {

        var responseRaw = await fetch(`https://polar-stream-28883.herokuapp.com/join-table/${props.tableId}`)
        var response = await responseRaw.json();
      
            setTableData(response.result)
            setGuestList(response.result.guests)
            setPlannerAvatar(response.planner.avatar)
            
          }
  
        , []);


    const [tableData, setTableData] = useState([''])
   

    const leaveTable = async () => {
    
        var dataRaw = await fetch(`http://polar-stream-28883.herokuapp.com/delete-guest/${props.tableId}/${props.userToken}`,{
            method: 'DELETE' 
        }) ;
     //   console.log("guest delete");
        props.navigation.navigate('Home')

    };
    const displayMessage = (message,i) => {
        let dateParse = new Date(message.date)
        let formattedDate = dateParse.toLocaleString("fr-FR", { timeZone: "UTC", weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
        formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)  // Première lettre en Maj sur la card

            return <View key={i} style={{marginHorizontal:20,marginVertical:5}}><List.Item
                                                                                                        title={message.author}

                                                                                                        description={message.content}/>
                <Text>{formattedDate  }</Text>
            </View>

    }

    useEffect( async() => {
           var responseRaw = await fetch(`https://polar-stream-28883.herokuapp.com/join-table/${props.tableId}`)
           var response = await responseRaw.json();

            setTableData(response.result)
          }


        , []);
       
       

       var tableInfo = tableData;
       let dateParse = new Date(tableInfo.date)
       let formattedDate = dateParse.toLocaleString("fr-FR", { timeZone: "UTC", weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
       formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)  // Première lettre en Maj sur la card
       var planneravatar =  <Avatar.Image size={24} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(plannerAvatar)?{uri: plannerAvatar}:require("../assets/picture-1.png")} />

    let avatarList = guestList.map((e,i)=> {
        return(
          <Avatar.Image key={i} size={24} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(e.avatar)?{uri: e.avatar}:require("../assets/picture-4.png")} />
        )
    })

     var tabCapacity= []
    
    for(let i = 0; i < tableInfo.capacity - guestList.length -1; i++) {
    
     
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
        
         
  var guestCount = guestList.length + 1;


  return (

    <View style={styles.container}>

        <View style={styles.topNavBar}>
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
                onPress={() => props.navigation.navigate('MyEvents')}
            />
            <IconButton
                icon="message"
                color={'#0E9BA4'}
                size={25}
                onPress={() => props.navigation.navigate('MyBuddies')}
            />
            <IconButton
                icon="account"
                color={'#0E9BA4'}
                size={25}
                onPress={() => props.navigation.navigate('MyAccount')}
            />


        </View>
        <View style={styles.contentView}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 10 }}>
                <Title>{tableInfo.title} </Title>
                <Subheading>{formattedDate}</Subheading>
            </View>

            <View style={{ flex: 4, flexDirection: "row", alignItems: 'center', height: 100 ,}}>
                <Card style={{ height: 270, width: 180, marginRight: 10 }}>
                    <Card.Content>
                        <Title>M.Eaters : {guestCount}/{tableInfo.capacity}</Title>
                        <View style={{ flexDirection: "row" }}>{planneravatar}{avatarList}{tabCapacity}</View>
                        <Title>Budget : {bugdetInfo}</Title>

                        <Title ><FontAwesome5 name="walking" size={24} color="black" />  à {Math.round(haversine(props.userLocation, { latitude: tableInfo.latitude, longitude: tableInfo.longitude }, { unit: "meter" }))} mètres</Title>
                        <Title><MaterialIcons name="restaurant" size={24} color="black" />  {tableInfo.placeType}</Title>
                        <Title><FontAwesome name="birthday-cake" size={24} color="black" />  {tableInfo.age}</Title>
                    </Card.Content>
                </Card>

                <Card style={{ height: 270, width: 180 }}>
                    <Card.Cover style={{ height: 150, widht: 80 }} source={{ uri: cardImage }} />

                    <Card.Content>

                        <Title>{tableInfo.placeName}</Title>
                        <Paragraph>{tableInfo.placeAddress}</Paragraph>
                    </Card.Content>

                </Card>
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', marginBottom:20 ,backgroundColor:"rgba(255, 201, 96, 0.22)"}}>
                <View >

                    <ScrollView style={{ backgroundColor:"rgba(255, 201, 96, 0.22)"}}>
                            {listMessages.map((el,i)=> displayMessage(el,i))}
                    </ScrollView>


                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{flexDirection:"row",justifyContent:"center",marginHorizontal:10}}>
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
    <View style={{flex:1, alignItems: "flex-end"}}>  
        <IconButton
                     icon="door-open"
                     color={'#0E9BA4'}
                     size={25}
                     onPress={() => {leaveTable()}}
                 />
                 </View>
            </View>
        </View>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    topNavBar: {
        flex: 1.5,
        backgroundColor: "#FFC960",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    contentView: {
        flex: 11,
        backgroundColor: "#F2F2F2",
        justifyContent: "flex-start",
        alignItems:"center",
        marginBottom: 30,
    },
})

function mapStateToProps(state) {
    return { tableId:  state.tableId,
        userToken: state.userToken,
        userLocation : state.userLocation,
    }
  }
  
  export default connect(
      mapStateToProps, 
      null
      
  )(MyTableScreen);