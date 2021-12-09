import React, { useState,useEffect } from 'react';

import {AsyncStorage, StyleSheet, View} from 'react-native';
import { TextInput,Appbar, Button,ProgressBar,Text} from "react-native-paper";
import { connect } from 'react-redux';


function RegisterScreenC(props) {


    const signUpBackend = async () => {
        var rawResponse = await fetch('http://192.168.1.246:3000/sign-up',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body: `lastname=${props.userToSend.lastName}&firstname=${props.userToSend.firstName}&password=${props.userToSend.inputPassword}&description=${userDesc}&email=${props.userToSend.inputEmail}&dateofbirth=${props.userToSend.dateOfBirth}&gender=${props.userToSend.gender}&addresses=${props.userToSend.userAddress}&avatar=${props.userToSend.inputAvatar}&phone=${props.userToSend.inputPhone}&preference1=${userPreference1}&preference2=${userPreference2}&preference3=${userPreference3}`
            
            
            
            
            
            
            
            

        });
        var response = await rawResponse.json();
        await AsyncStorage.setItem("userToken", JSON.stringify({token: response.newUserSave.token}))
        console.log(response)
        console.log(response.newUserSave.token)
        props.sendUserTokenRegister(response.newUserSave.token)

    }




    const [userPreference1,setUserPreference1] = useState("");
    const [userPreference2,setUserPreference2] = useState("");
    const [userPreference3,setUserPreference3] = useState("");
    const [userDesc,setUserDesc] = useState("");
    const [inputProgress,setInputProgress] = useState(0);

    return (<View style={{flex:10,justifyContent: 'center',}}>
                <Appbar style={styles.bottom}>
                    <Appbar.Content title="Informations détaillées" style={{textAlign:'center'}}/>
                </Appbar>

            <TextInput
                style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center" }}
                mode="outlined"
                label="Préférences Culinaires 1"
                onChangeText={(val)=> {setUserPreference1(val);setInputProgress(inputProgress + 0.01)}}
                placeholder ="Italien..."
                activeOutlineColor={"#FF3D00"}
                outlineColor={'#0E9BA4'}
            />
            <TextInput style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Préférences Culinaires 2"
                       onChangeText={(val)=> {setUserPreference2(val);setInputProgress(inputProgress + 0.01)}}
                       placeholder ="Coréen"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />
            <TextInput style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Préférences Culinaires 3"
                       onChangeText={(val)=> {setUserPreference3(val); setInputProgress(inputProgress + 0.01)}}
                       placeholder ="Fast-Food"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />
            <TextInput style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       multiline={true}
                       label="Présentez-vous"
                       right={<TextInput.Affix userDesc="/250" />}
                       onChangeText={(val)=> {setUserDesc(val); setInputProgress(inputProgress + 0.01)}}
                       placeholder ="..."
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />
            <Button
                style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#0E9BA4",color:'#FFC960' }}
                mode="contained" onPress={() =>{ props.navigation.navigate('Home');props.sendDetailedData({preference1:userPreference1,
                                                                                                                      preference2: userPreference2,
                                                                                                                      preference3: userPreference3,
                                                                                                                      description:userDesc}); signUpBackend()}}>
                <Text Style={{color:'#FFC960'}}>Press me</Text>
            </Button>

            <ProgressBar
                style={{ marginTop: 25, textAlign:'center',width:'70%',alignSelf:"center" }}
                progress={inputProgress} color={"#0E9BA4"} />

        </View>
    );
}


const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        height:"10%",
        width:"100%",
        top: 0,
        alignItems: 'center',
        justifyContent:"center",
        textAlign:'center',
        backgroundColor:"#FFC960",
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }});



function mapDispatchToProps(dispatch){
    return {
        sendDetailedData: function (detailedData){
            dispatch({type: 'registerC',detailedData})
        },sendUserTokenRegister: function (userToken){
            dispatch({type: 'registerToken',userToken})
        }

    }
}

function mapStateToProps(state) {
    return {
        userToSend: state.userRegister
    }}

    export default connect(
        mapStateToProps,
    mapDispatchToProps
)(RegisterScreenC);

