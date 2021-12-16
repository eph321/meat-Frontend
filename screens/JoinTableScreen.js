import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Avatar, Button, Card, Paragraph, Subheading, Appbar, Text, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from "react-redux";
import { useIsFocused } from '@react-navigation/native';

const FranckLacapsuleIP = "http://172.17.1.118:3000"
const FranckIP = "http://192.168.1.41:3000"
const herokuIP = "https://polar-stream-28883.herokuapp.com"

function JoinTableScreen(props) {

    const [tableData, setTableData] = useState([''])
    const [guestList, setGuestList] = useState([''])
    const [plannerAvatar, setPlannerAvatar] = useState('')


    const isFocused = useIsFocused();



    useEffect(async () => {

        var responseRaw = await fetch(`${herokuIP}/join-table/${props.tableId}`)
        var response = await responseRaw.json();
        console.log(response.result," RESPONSE RESULT")

        // console.log(response, 'ok'),
        setTableData(response.result)
        //  console.log(tableData, "=======> TABLE DATA")
        setGuestList(response.result.guests)
        //  console.log(guestList, "------> GUEST LIST")
        setPlannerAvatar(response.planner.avatar)
       
    }
        // setUserData(response.user)


        /* let rawUserResponse = await fetch(`${herokuIP}/users/search-userId/${props.userToken}`);
        let userResponse = await rawUserResponse.json();
        setUserId(userResponse.result._id);

        for (let i = 0; i < response.result.length; i++) {
            if (response.result.planner === props.userToken || response.result.guests[i] === userId) {
                props.navigation.navigate("MyTable")
            }
        }; */

        , [isFocused]);
   
    var handleJoinTable = async () => {

        var dataRaw = await fetch(`${herokuIP}/enter-table`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${props.tableId}&token=${props.userToken}`
        });
        props.navigation.navigate('MyTable');
        console.log(props.userToken)

        //   var body =  await data.json()

    }


    var tableInfo = tableData;
    var planneravatar = <Avatar.Image size={24} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(plannerAvatar) ? { uri: plannerAvatar } : require("../assets/picture-1.png")} />

    let avatarList = guestList.map((e, i) => {
        return (
            <Avatar.Image key={i} size={24} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(e.avatar) ? { uri: e.avatar } : require("../assets/picture-4.png")} />
        )
    })
  
    var tabCapacity = []

    for (let i = 0; i < tableInfo.capacity - guestList.length - 1; i++) {


        tabCapacity.push(<MaterialCommunityIcons key={i} name="seat" size={24} color="black" />)

    }

    var bugdetInfo = []
    for (let j = 0; j < tableInfo.budget; j++) {

        bugdetInfo.push(<MaterialIcons key={j} name="euro" size={24} color="green" />)

    }

    var cardImage;

    if (tableInfo.placeType === "Japonais") {
        cardImage = 'https://www.terres-japonaises.com/app/media/26/files/2016/06/sushi-japon.jpg'
    }
    else if (tableInfo.placeType === "Fast-food") {
        cardImage = 'https://medias.toutelanutrition.com/ressource/104/Fast%20Food.jpg'
    }
    else if (tableInfo.placeType === "Italien") {
        cardImage = 'https://cache.marieclaire.fr/data/photo/w1000_ci/5b/italianfood.jpg'
    }
    else if (tableInfo.placeType === "Chinois") {
        cardImage = 'https://www.takeaway.com/be-fr/foodwiki/uploads/sites/3/2018/02/chine.jpg'
    }
    else if (tableInfo.placeType === "Mexicain") {
        cardImage = 'https://images.radio-canada.ca/q_auto,w_960/v1/ici-premiere/16x9/mlarge-cuisine-mexicaine-nourriture-mexique-alimentation-tacos-salsa-mais.jpg'

    }
    else if (tableInfo.placeType === "Coréen") {
        cardImage = 'https://aconsommerdepreference.lexpress.fr/wp-content/uploads/2018/02/iStock-849756458.jpg'
    }
    else if (tableInfo.placeType === "Indien") {
        cardImage = 'https://media.istockphoto.com/photos/assorted-indian-recipes-food-various-picture-id922783734'
    }
    else if (tableInfo.placeType === "Africain") {
        cardImage = 'https://afrogadget.com/wp-content/uploads/2021/06/01-couscous-royal-traditionnel.jpeg'
    }




    //   var tableAvatar = []
    //     for(var i=0;i< tableInfo.capacity;i++){

    //         if(i<tableInfo.capacity) {
    //           tableAvatar.push(<Avatar.Image size={24} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(user.avatar)?{uri: user.avatar}:require("../assets/picture-4.png")} />)
    //           }
    //         else {

    //         }
    //   tableAvatar.push(<Avatar.Image size={24} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(user.avatar)?{uri: user.avatar}:require("../assets/picture-4.png")} />)



    //  }
    //                 let count = i+1
    //             tableAvatar.push(<Avatar.Image size={24} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(user.avatar)?{uri: user.avatar}:require("../assets/picture-4.png")} />)



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
                    <Title>{tableInfo.title}</Title>
                    <Subheading>{tableInfo.date}</Subheading>
                </View>

                <View style={{ flex: 4, flexDirection: "row", alignItems: 'center', height: 100 }}>
                    <Card style={{ height: 250, width: 180 }}>
                        <Card.Content>
                            <Title>M.Eaters : {guestCount}/{tableInfo.capacity}</Title>
                            <View style={{ flexDirection: "row" }}>{planneravatar}{avatarList}{tabCapacity}</View>
                            <Title>Budget : {bugdetInfo}</Title>

                            <Title ><FontAwesome5 name="walking" size={24} color="black" />  à 150 mètres</Title>
                            <Title><MaterialIcons name="restaurant" size={24} color="black" />  {tableInfo.placeType}</Title>
                            <Title><FontAwesome name="birthday-cake" size={24} color="black" />  {tableInfo.age}</Title>
                        </Card.Content>
                    </Card>

                    <Card style={{ height: 250, width: 180 }}>
                        <Card.Cover style={{ height: 150, widht: 80 }} source={{ uri: cardImage }} />

                        <Card.Content>

                            <Title>{tableInfo.placeName}</Title>
                            <Paragraph>{tableInfo.placeAddress}</Paragraph>
                        </Card.Content>

                    </Card>
                </View>
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{width: 350, height: 200 }}>
                        <Card.Content>
                            <Paragraph>{tableInfo.description}</Paragraph>
                        </Card.Content>
                    </Card>

                    <View style={{flex:0.5}}>

                    <Button style={{width: 300, height: 50, backgroundColor: "#0E9BA4" }} type='text' mode="contained" onPress={() => handleJoinTable()}>
                        <Text style={{color: "#FFC960", fontWeight: "bold" }}> Rejoindre la table</Text>
                    </Button>
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
        marginBottom: 30,
    },
})


function mapStateToProps(state) {
    return { tableId: state.tableId, userToken: state.userToken }
}

export default connect(
    mapStateToProps,
    null

)(JoinTableScreen);
