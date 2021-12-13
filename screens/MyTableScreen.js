import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native'; 
import { Title, Avatar, Button, Card, Paragraph, Subheading, Appbar } from 'react-native-paper';
import { ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


function MyTableScreen(props) {

    const [tableData, setTableData] = useState([''])
   

    useEffect( async() => {
           var responseRaw = await fetch(`https://polar-stream-28883.herokuapp.com/join-table/${props.tableId}`)
           var response = await responseRaw.json();
        console.log(response)

        
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

    return (    
    
    
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>  
     <View style={stylesBar.viewHeader}>
                <Appbar style={{ flex: 1, backgroundColor: "#FFC960", height: 20 }}>
                    <Appbar.Content title="Ma table" style={{ textAlign: 'center' }} />
                </Appbar>
                <Appbar style={{ flex: 1, backgroundColor: "#F2F2F2", width: "100%", justifyContent: "space-evenly", height: 40 }}>
                    <Appbar.Action icon="home" onPress={() => props.navigation.navigate('Home')} />
                    <Appbar.Action icon="plus-circle" onPress={() => props.navigation.navigate('NewTable')} />
                    <Appbar.Action icon="calendar-month" onPress={() => props.navigation.navigate('MyEvents')} />
                    <Appbar.Action icon="message-text" onPress={() => props.navigation.navigate('Chat')} />
                    <Appbar.Action icon="account" onPress={() => props.navigation.navigate('MyAccount')}
                    />
                </Appbar>
            </View>
       <View style={{flex : 1,alignItems: 'center', justifyContent: 'center', height: 10, marginBottom : 100}}>
       <Button style={{ marginBottom : 60, marginTop : 50, width : 300, height : 50, backgroundColor : "#0E9BA4"}} type='text' mode="contained" onPress={() => { props.navigation.navigate('Home'); }}>
              <Text style={{color:"#FFC960", fontWeight:"bold"}}> Quitter la table</Text>
        </Button>
     
       </View>
   
        <View style={{ flex: 1, marginBottom: 200, flexBasis : "auto", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
               <Card style={{ marginLeft : 60, marginBottom : 60, marginTop : 50, height : 250, width : 180 }}>
                       <Card.Content>
                           <Title>M.Eaters : 3/{tableInfo.capacity}</Title>
                           <View style={{flexDirection: "row"}}>{tabCapacity}</View>

                           <Title>Budget : {bugdetInfo} </Title>
                           <Title ><FontAwesome5 name="walking" size={24} color="black" />  à 150 mètres</Title>
                            <Title><MaterialIcons name="restaurant" size={24} color="black" />  {tableInfo.placeType}</Title>
                            <Title><FontAwesome name="birthday-cake" size={24} color="black" />  {tableInfo.age}</Title>
                            <Title>{tableInfo.title}</Title>
                            <Subheading>{tableInfo.date}</Subheading>
                       </Card.Content>
               </Card>
               
               <Card style={{marginLeft : 10 , marginRight : 60, marginBottom : 60, marginTop : 50, height : 250, width : 180 }}>
               <Card.Cover style = {{height : 150, widht : 80}}source={{ uri: cardImage }} />

                       <Card.Content>

                            <Title>{tableInfo.placeName}</Title>
                            <Paragraph>{tableInfo.placeAddress}</Paragraph>
                       </Card.Content>

               </Card>
               
       </View>
       
       <View style={{flex : 3, alignItems: 'strech', justifyContent: 'center'}}>
       <Card style={{width : 350, height : 400}}>
               <Card.Content>
               <ScrollView style={{ marginTop: 50}}>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Parfait et toi ?</ListItem.Title>
            <ListItem.Subtitle>Alex</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Coucou ça roule ?</ListItem.Title>
            <ListItem.Subtitle>John</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Input
              containerStyle = {{marginBottom: 5}}
              placeholder='Your message'
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
          />
      </KeyboardAvoidingView>
               </Card.Content>

               
       </Card>

       
        
       
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
    return { tableId:  state.tableId}
  }
  
  export default connect(
      mapStateToProps, 
      null
      
  )(MyTableScreen);