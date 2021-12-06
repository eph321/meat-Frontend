import React, {useState} from 'react'

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import  {StyleSheet, ImageBackground,View,Image} from "react-native";
import {Button, Input, SocialIcon} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from "react-native-paper";

function LoginScreen(props) {
    const [pseudo, setPseudo ] = useState("");
    const [password, setPassword ] = useState("");

    return (
        <View style={styles.container}>

            <Image
                style={styles.imageLogin}
                source={require('../assets/loginBackground.jpg')}

            />


            <Input
                containerStyle={{  width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Name'
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color="#009788"
                    />
                }
                onChangeText={(val) => setPseudo(val)}
            />

            <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Mot de passe'
                leftIcon={
                    <Icon
                        name='password'
                        size={24}
                        color="#009788"
                    />
                }
                onChangeText={(val) => setPassword(val)}
            />
            <Button

                title="Connection"
                type="solid"
                containerStyle={{  width: '70%' }}
                buttonStyle={{ backgroundColor: "#009788" }}
                onPress={() => {  props.navigation.navigate('Home') }}
            />
            <Button

                title="Register"
                type="solid"
                containerStyle={{  width: '70%' }}
                buttonStyle={{ backgroundColor: "#009788" }}
                onPress={() => {  props.navigation.navigate('Register') }}
            />
            <SocialIcon  button  light  type='google'
                         containerStyle={{  width: '70%' }}
                         title="Connection avec Google"/>
            <SocialIcon  button  light  type='facebook'
                         title="Connection avec Facebook"/>
        </View>



    )

}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },imageLogin :{
        alignItems:"flex-start",
        justifyContent:"flex-start",
        flex: 1,
        width: '100%',
        height: "33%",
        resizeMode: 'cover',
        marginTop: 25
    }
});
