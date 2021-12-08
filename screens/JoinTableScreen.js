import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Avatar, Button, Card, Paragraph, Subheading, Appbar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';

const franckIP = "192.168.1.41"
const StephIP = "192.168.1.9"



function JoinTableScreen() {

    const [tableData, setTableData] = useState([''])
    useEffect( async() => {
      
           var responseRaw = await fetch(`http://${StephIP}:3000/search-table`)
           var response = await responseRaw.json();
            
            setTableData(response.result)
          }
         
        , []);
       console.log(tableData[0], " LALALLALALAL")
       var tableInfo = tableData[0];

      var tabCapacity = []
      for(let i = 0; i < tableInfo.capacity; i++) {
        tabCapacity.push(<MaterialCommunityIcons key={i}  name="seat" size={24} color="black"/>)


      }


       
    //    var guestCount = tableInfo.guests.lenght + 1;

    return (  
        
     <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor:"white"}}>  
     <Appbar style={{flex:1, position: 'absolute', left: 0, height:"10%", width:"100%", top: 0, alignItems: 'center', justifyContent:"center", textAlign:'center', backgroundColor:"#FFC960",}}>
                    <Appbar.Content title="Rejoindre une Table" style={{textAlign:'center'}}/>
                </Appbar>
        <View style={{flex : 1, marginTop : 60,alignItems: 'center', justifyContent: 'center', height: 10}}>
        <Title>{tableInfo.title}</Title>
        <Subheading>{tableInfo.date}</Subheading>
        </View>
    
         <View style={{ flex: 2, flexBasis : "auto", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
                <Card style={{ marginLeft : 60, marginBottom : 60, marginTop : 50, height : 250, width : 180 }}>
                        <Card.Content>
                            <Title>M.Eaters : 1/{tableInfo.capacity}</Title>
                            <View style={{flexDirection: "row"}}>{tabCapacity}</View>
                            <Title>Budget : {tableInfo.budget}</Title>
                            <Title ><FontAwesome5 name="walking" size={24} color="black" />  à 150 mètres</Title>
                            <Title><MaterialIcons name="restaurant" size={24} color="black" />  Japonais</Title>
                            <Title><FontAwesome name="birthday-cake" size={24} color="black" />  {tableInfo.age}</Title>
                        </Card.Content>
                </Card>
                
                <Card style={{marginLeft : 10 , marginRight : 60, marginBottom : 60, marginTop : 50, height : 250, width : 180 }}>
                <Card.Cover style = {{height : 150, widht : 80}}source={{ uri: 'https://picsum.photos/700' }} />

                        <Card.Content>

                            <Title>{tableInfo.placeName}</Title>
                            <Paragraph>{tableInfo.placeAddress}</Paragraph>
                        </Card.Content>

                </Card>
        </View>
        <View style={{flex : 2, alignItems: 'center', justifyContent: 'center'}}>
        <Card style={{marginBottom : 5, marginTop : 10, width : 350, height : 100}}>
                <Card.Content>
                    <Paragraph>{tableInfo.description}</Paragraph>
                </Card.Content>
        </Card>


         
         <Button style={{ marginBottom : 60, marginTop : 50, width : 300, height : 50, backgroundColor : "#0E9BA4"}} type='text' mode="contained" onPress={() => console.log('Pressed')}>
              <Text style={{color:"#FFC960", fontWeight:"bold"}}> Rejoindre la table</Text>
        </Button>
        </View>
       
        </View>
    );
}




export default JoinTableScreen;


