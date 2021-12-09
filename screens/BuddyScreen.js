import React, {useEffect, useState} from 'react';

import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {
    Appbar,
    Button,
    Text,
    Avatar,
      Card,
    Title,
    Paragraph, IconButton
} from "react-native-paper";
import { connect } from 'react-redux';





function BuddyScreen(props) {
    const [userList, setUserList] = useState([]);
    const [buddyId,setBuddyId] = useState("");
    const [buddyIndex,setBuddyIndex] = useState("");

    useEffect(async () => {
            let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/search-users`);
            let response = await rawResponse.json();
            console.log("add user")
            console.log(response.result[0].firstname)
            setUserList(response.result)
        }
        , [])



    const handleAddFriend = async () => {
        await fetch(`https://polar-stream-28883.herokuapp.com/add-buddy`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${props.userToSend}&id=${userList[buddyIndex]._id}`

        })
        console.log(props.userToSend)

    }


    const displayUser = (user, i) => {

        return    <TouchableOpacity onPress={() => { console.log("clic sur user")}}>
        <View key={i} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}} >
                        <View >
                            <Avatar.Icon size={32} icon="account" color={'#0E9BA4'} style={{backgroundColor: "#FFFFFF"}}/>
                        </View>
                        <View style={{backgroundColor:"rgba(255, 201, 96, 0.22)",width:"70%",alignSelf:"flex-end",marginHorizontal:20,marginVertical:5}} >
                            <Card.Content>

                                <Title>{user.firstname}</Title>
                                <Paragraph style={{alignSelf:"center"}}>{user.description}</Paragraph>
                                <Paragraph>{user.preference1}</Paragraph>
                                <Paragraph>{user.preference2}</Paragraph>
                                <Paragraph>{user.preference3}</Paragraph>
                            </Card.Content>
                        </View>
                    </View>
        </TouchableOpacity>
            }

    return (<View style={{flex:1,justifyContent: 'space-evenly'}}>
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
            <ScrollView style={{flex:1, marginTop: 50}}>
            {userList.map((user,i)=>displayUser((user,i)))}
                </ScrollView>
            <Button
                style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#0E9BA4",color:'#FFC960' }}
                mode="contained"  >
                <Text Style={{color:'#FFC960'}}>Ajouter Buddy</Text>
            </Button>
        </View>


</View>)
}

function mapStateToProps(state) {
    return {
        userToSend: state.userToken
    }}

export default connect(
    mapStateToProps,
    null
)(BuddyScreen);



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

