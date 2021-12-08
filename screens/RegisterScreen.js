import React, {useEffect, useState} from 'react';

import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import {TextInput, Appbar, Button, ProgressBar, Text, Avatar, RadioButton} from "react-native-paper";
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';




function RegisterScreen(props) {
    const [inputEmail,setInputEmail] = useState("");
    const [inputPassword,setInputPassword] = useState("");
    const [inputProgress,setInputProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [visible, setVisible] = useState(true);

    // préparation de l'envoi dans le store
    const [tempAvatarUri,setTempAvatarUri] =useState("")

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.3,
        });
        if (!result.cancelled) {

            setImage(result.uri);
            let dataAvatar = new FormData();
            dataAvatar.append('avatar',{
                uri: result.uri,
                type: 'image/jpeg',
                name: 'avatar.jpg'});

            var rawResponse = await fetch("http://192.168.1.246:3000/uploadAvatar",{
                method: 'POST',
                body: dataAvatar});
            var response = await rawResponse.json();
            console.log(response)
            setTempAvatarUri(response);
            }
        }


    return (
                <View style={{flex:1,justifyContent: 'space-evenly'}}>

                        <Appbar style={styles.bottom}>
                            <Appbar.Content title="Créer mon compte" style={{textAlign:'center'}}/>
                        </Appbar>

                    <TouchableOpacity onPress={() =>{ pickImage(); setVisible(!visible)}} >
                        <View >{(visible)?
                            <Avatar.Icon size={128} icon="camera" color={'#0E9BA4'} style={{marginTop: 80,marginLeft: 60,backgroundColor: "#FFFFFF"}}/>
                            :<Avatar.Image size={128} source={{ uri: image }} style={{marginTop: 80,marginLeft: 60 }}/>
                        }
                        </View>
                    </TouchableOpacity>


                    <TextInput style={{  textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               label="Mot de passe"
                               onChangeText={(val)=> {setInputPassword(val);setInputProgress(inputProgress + 0.01)}}
                               placeholder ="hello@matable.com"
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                    <TextInput style={{  textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               label="Confirmation du mot de passe *"
                               onChangeText={(val)=> {setInputEmail(val); setInputProgress(inputProgress + 0.01)}}
                               placeholder ="***********"
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                    <Button
                        style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#0E9BA4",color:'#FFC960' }}
                         mode="contained" onPress={() =>{ props.navigation.navigate('RegisterB');props.sendData({email:inputEmail,inputPassword:inputPassword,avatar:tempAvatarUri}) }}>
                        <Text Style={{color:'#FFC960'}}>Press me</Text>
                    </Button>

                    <ProgressBar
                        style={{ marginTop: 25, textAlign:'center',width:'70%',alignSelf:"center" }}
                        progress={inputProgress} color={"#0E9BA4"} />

                </View>
     )
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
        sendData: function (userData){
            dispatch({type: 'register',userData})
        }

    }
}

export default connect(
    null,
    mapDispatchToProps
)(RegisterScreen);
/*

<TextInput
    label="Email"
    value={inputEmail}
    onChangeText={text => setInputEmail(text)}
    textAlign={'center'}
    style={{top: 120, padding:10, borderColor:'#369', textAlign:'center'}}
/>*/
