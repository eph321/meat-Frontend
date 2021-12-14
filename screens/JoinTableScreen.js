import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {Title, Avatar, Button, Card, Paragraph, Subheading, Appbar, Text, IconButton} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";
import userToken from '../reducers/userToken';

const FranckIP = "http://192.168.1.41:3000"
const herokuIP = "https://polar-stream-28883.herokuapp.com"

function JoinTableScreen(props) {

    const [tableData, setTableData] = useState([''])
    const [userData, setUserData] = useState([''])
   
    // `http://192.168.1.9:3000/join-table/${props.tableId}`
    useEffect( async() => {
        var responseRaw = await fetch(`${herokuIP}/join-table/${props.tableId}/${props.userToken}`)
        var response = await responseRaw.json();

        console.log(response, 'ok'),
            setTableData(response.result)
            setUserData(response.user)
         
            
         
          }

         
        , []);

        var handleJoinTable = async () => {


            var dataRaw = await fetch(`${herokuIP}/enter-table`, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            body: `id=${props.tableId}&token=${props.userToken}`
                          })
            props.navigation.navigate('MyTable'); 

            //   var body =  await data.json()
            
                 
            }

     
       var tableInfo = tableData;
       var userInfo = userData;

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
          cardImage= 'https://www.terres-japonaises.com/app/media/26/files/2016/06/sushi-japon.jpg'  
      }
      else if(tableInfo.placeType === "Fast-food") {
          cardImage= 'https://medias.toutelanutrition.com/ressource/104/Fast%20Food.jpg'   
        }
      else if(tableInfo.placeType === "Italien") {
          cardImage= 'https://cache.marieclaire.fr/data/photo/w1000_ci/5b/italianfood.jpg' 
        }
      else if(tableInfo.placeType === "Chinois") {
            cardImage= 'https://www.takeaway.com/be-fr/foodwiki/uploads/sites/3/2018/02/chine.jpg'   
          }
       else if(tableInfo.placeType === "Mexicain") {
            cardImage= 'https://images.radio-canada.ca/q_auto,w_960/v1/ici-premiere/16x9/mlarge-cuisine-mexicaine-nourriture-mexique-alimentation-tacos-salsa-mais.jpg' 
            
          }
       else if(tableInfo.placeType === "Coréen") {
            cardImage= 'https://aconsommerdepreference.lexpress.fr/wp-content/uploads/2018/02/iStock-849756458.jpg'   
          }
       else if(tableInfo.placeType === "Indien") {
            cardImage= 'https://media.istockphoto.com/photos/assorted-indian-recipes-food-various-picture-id922783734' 
          }
       else if(tableInfo.placeType === "Africain") {
            cardImage= 'https://afrogadget.com/wp-content/uploads/2021/06/01-couscous-royal-traditionnel.jpeg' 
          }
       
    //    var guestCount = tableInfo.guests.lenght + 1;

    return (  
        
     <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor:"white"}}>
         <View style={{ flex: 2,
             left: 0,
             width:"100%",
             top: 0,
             justifyContent:"flex-start",}}>
             <Appbar style={{ backgroundColor: "#FFC960", flex:1}}>
                 <Appbar.Content title="Rejoindre une table" style={{marginTop: 20,alignItems:"center", size: 17}} titleStyle={{fontSize: 22, fontWeight: "700", color: "#009788"}} />

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
                     onPress={() =>  props.navigation.navigate('MyBuddies')}
                 />
                 <IconButton
                     icon="account"
                     color={'#0E9BA4'}
                     size={25}
                     onPress={() =>  props.navigation.navigate('MyAccount')}
                 />

             </View>
         </View>
        <View style={{flex : 1, marginBottom:10,alignItems: 'center', justifyContent: 'center', height: 10}}>
        <Title>{tableInfo.title}</Title>
        <Subheading>{tableInfo.date}</Subheading>
        </View>
    
         <View style={{ flex: 2, flexBasis : "auto", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
                <Card style={{ marginLeft : 60, marginBottom : 60, marginTop : 50, height : 250, width : 180 }}>
                        <Card.Content>
                            <Title>M.Eaters : 1/{tableInfo.capacity}</Title>
                            <View style={{flexDirection: "row"}}>{tabCapacity}</View>
                            <Title>Budget : {bugdetInfo}</Title>
                            
                            <Title ><FontAwesome5 name="walking" size={24} color="black" />  à 150 mètres</Title>
                            <Title><MaterialIcons name="restaurant" size={24} color="black" />  {tableInfo.placeType}</Title>
                            <Title><FontAwesome name="birthday-cake" size={24} color="black" />  {tableInfo.age}</Title>
                        </Card.Content>
                </Card>
                
                <Card style={{marginLeft : 10 , marginRight : 60, marginBottom : 60, marginTop : 50, height : 250, width : 180 }}>
                <Card.Cover style = {{height : 150, widht : 80}} source={{ uri: cardImage }} /> 
                
                        <Card.Content>

                            <Title>{tableInfo.placeName}</Title>
                            <Paragraph>{tableInfo.placeAddress}</Paragraph>
                        </Card.Content>

                </Card>
        </View>
        <View style={{flex : 2, alignItems: 'center', justifyContent: 'center'}}>
        <Card style={{marginBottom : 5, marginTop : 40, width : 350, height : 100}}>
                <Card.Content>
                    <Paragraph>{tableInfo.description}</Paragraph>
                </Card.Content>
        </Card>


         
         <Button style={{ marginBottom : 60, marginTop : 50, width : 300, height : 50, backgroundColor : "#0E9BA4"}} type='text' mode="contained" onPress={() => handleJoinTable()}>
              <Text style={{color:"#FFC960", fontWeight:"bold"}}> Rejoindre la table</Text>
        </Button>
        </View>
       
        </View>
    );
}


const styles = StyleSheet.create({
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
    return { tableId:  state.tableId, userToken: state.userToken}
  }
  
  export default connect(
      mapStateToProps, 
      null
      
  )(JoinTableScreen);
