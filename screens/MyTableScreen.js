import { AutoComplete, Row } from 'antd';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Avatar, Button, Card, Paragraph, Subheading, Appbar } from 'react-native-paper';

function MyTableScreen() {

    return (    
    
    
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>  
    <Appbar style={{flex:1, position: 'absolute', left: 0, height:"10%", width:"100%", top: 0, alignItems: 'center', justifyContent:"center", textAlign:'center', backgroundColor:"#FFC960",}}>
                   <Appbar.Content title="Rejoindre une Table" style={{textAlign:'center'}}/>
               </Appbar>
       <View style={{flex : 1, marginTop : 60,alignItems: 'center', justifyContent: 'center', height: 10}}>
       <Title>Est si on parlait de naruto?</Title>
       <Subheading>Vendredi 21 Janvier 2022 à 12h00</Subheading>
       </View>
   
        <View style={{ flex: 2, flexBasis : "auto", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
               <Card style={{ marginLeft : 60, marginBottom : 60, marginTop : 50, height : 250, width : 180 }}>
                       <Card.Content>
                           <Title>M.Eaters : 3/6</Title>
                           <Title>Budget : $$$$</Title>
                           <Paragraph>à 150 mètres</Paragraph>
                           <Paragraph>Japonais</Paragraph>
                           <Paragraph>25-30 ans</Paragraph>
                       </Card.Content>
               </Card>
               
               <Card style={{marginLeft : 10 , marginRight : 60, marginBottom : 60, marginTop : 50, height : 250, width : 180 }}>
               <Card.Cover style = {{height : 150, widht : 80}}source={{ uri: 'https://picsum.photos/700' }} />

                       <Card.Content>

                           <Title>Restaurant Sushi Royal</Title>
                           <Paragraph>Adresse Restaurant</Paragraph>
                       </Card.Content>

               </Card>
       </View>
       <View style={{flex : 2, alignItems: 'strech', justifyContent: 'center'}}>
       <Card style={{marginBottom : 5, marginTop : 50, width : 300, height : 100}}>
               <Card.Content>
                   <Paragraph>Description</Paragraph>
               </Card.Content>
       </Card>


        
        <Button style={{alignItems : "center", marginBottom : 60, marginTop : 50, width : 300, height : 50, backgroundColor : "black"}} type='text' mode="contained" onPress={() => console.log('Pressed')}>
              Rejoindre la table
       </Button>
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


export default MyTableScreen;