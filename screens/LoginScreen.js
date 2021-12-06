import React, {useState} from 'react'

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import  {StyleSheet, ImageBackground} from "react-native";
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

function LoginScreen(props) {
    const [pseudo, setPseudo ] = useState("");
    const [password, setPassword ] = useState("");

    return (
        <ImageBackground source={require('../assets/loginBackground.jpg')} style={styles.container}>
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
                buttonStyle={{ backgroundColor: "#009788" }}
                onPress={() => {  props.navigation.navigate('Home') }}
            />
            <Button

                title="Register"
                type="solid"
                buttonStyle={{ backgroundColor: "#009788" }}
                onPress={() => {  props.navigation.navigate('Register') }}
            />
        </ImageBackground>

    )

}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
