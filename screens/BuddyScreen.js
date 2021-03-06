import React, {useEffect, useState} from 'react';

import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {
    Appbar,
    Button,
    Text,
    Avatar,
    Card,
    Title,
    Paragraph, IconButton,
} from "react-native-paper";
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

function BuddyScreen(props) {
    const [userList, setUserList] = useState([]);
    const isFocused = useIsFocused();







    const handleAddFriend = async (userToken) => {
        let rawSend = await fetch(`https://polar-stream-28883.herokuapp.com/interactions/add-buddy`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${props.userToSend}&userToken=${userToken}`
        })
        let sendResponse = await rawSend.json();
    }
    // Fonction de display pour l'affichage des buddies à rajouter


    const displayUser = (user,i) => {

        return <View  >
        <View key={i} style={{flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
                <Card style={{borderColor: "#FFC960", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: "3%",width:"100%"}}>
                    <Card.Content style={{flexDirection: "row",alignItems:"center",justifyContent:"space-between"}}>
                        <Avatar.Image size={60} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(user.avatar)?{uri: user.avatar}:require("../assets/picture-4.png")} />
                        <View>
                        <Title style={{fontWeight:"bold", fontSize:30, marginBottom:5}}>{user.firstname}</Title>
                        <Paragraph>{user.description}</Paragraph>
                        <Paragraph>{user.preference1}</Paragraph>
                        <Paragraph>{user.preference2}</Paragraph>
                        <Paragraph>{user.preference3}</Paragraph>
                        </View>
                        <IconButton
                            icon="account-plus"
                            mode="contained"
                            color={'#0E9BA4'}
                            style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2 }}
                            size={32}
                            onPress={() => handleAddFriend(user.token)}
                        />
                    </Card.Content>
                </Card>
        </View>
        </View>}



        useEffect(async () => {
                const rawResponse = await fetch("https://polar-stream-28883.herokuapp.com/users/search-user");
                const response = await rawResponse.json();
                if(props.userToSend !== null){
                }
                setUserList(response.result)
            }

            , [])

    return (<View style={{flex:1,justifyContent: 'space-evenly'}}>
        <View style={styles.viewHeader}>
            <Appbar style={{flex:1,backgroundColor:"#FFC960"}}>
                <Appbar.Content title="M.eaters" style={{marginTop: 20,alignItems:"center", size: 17}} titleStyle={{fontSize: 22, fontWeight: "700", color: "#009788"}}/>
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
            <ScrollView style={{flex:1, marginTop: 50}}>
                {userList.map((user,i)=>displayUser(user,i))}
            </ScrollView>
            <Button
                style={{ padding:10,marginBottom: 20, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#0E9BA4",color:'#FFC960' }}
                mode="contained"  >
                <Text Style={{color:'#FFC960'}}>Ajouter Buddy</Text>
            </Button>
        </View>


</View>)
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

    }, surface: {
        width: "80%",
        alignItems: 'flex-start',
        justifyContent: 'center',
        elevation: 10,
    }
});



function mapStateToProps(state) {
    return {
        userToSend: state.userToken
    }}

export default connect(
    mapStateToProps,
    null
)(BuddyScreen);
