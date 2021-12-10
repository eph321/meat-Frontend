import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Avatar, Button, Card, Paragraph, Subheading, Appbar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";


function JoinTableScreen(props) {

    const [tableData, setTableData] = useState([''])
   

    useEffect( async() => {
<<<<<<< HEAD
           var responseRaw = await fetch(`https://polar-stream-28883.herokuapp.com/join-table/${props.tableId}`)
           var response = await responseRaw.json();
        console.log(response)

=======
      
           var responseRaw = await fetch(`https://polar-stream-28883.herokuapp.com/join-table/${props.tableId}`)
           var response = await responseRaw.json();
>>>>>>> 0ecd607ffc4b28e1a00b3641969fd62b026218c0
        
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
       
    //    var guestCount = tableInfo.guests.lenght + 1;

    return (  
        
     <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor:"white"}}>  
     <View style={styles.viewHeader}>
                <Appbar style={{ flex: 1, backgroundColor: "#FFC960", height: 20 }}>
                    <Appbar.Content title="Rejoindre une Table" style={{ textAlign: 'center' }} />
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


         
         <Button style={{ marginBottom : 60, marginTop : 50, width : 300, height : 50, backgroundColor : "#0E9BA4"}} type='text' mode="contained" onPress={() => { props.navigation.navigate('MyTable'); }}>
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
    return { tableId:  state.tableId}
  }
  
  export default connect(
      mapStateToProps, 
      null
      
  )(JoinTableScreen);
