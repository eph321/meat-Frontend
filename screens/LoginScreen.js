import React, {useEffect, useState} from 'react'

import {StyleSheet, View, Image, Text, AsyncStorage} from "react-native";
import {SocialIcon} from 'react-native-elements'
import {TextInput, Button} from "react-native-paper";
import {connect} from "react-redux";



function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [setEye,Eye] = useState(false)


    //Vérifie l'existence d'un userToken et redirige vers home si présence userToken
    useEffect(()=>{
        ( () => { AsyncStorage.getItem("userToken", function(error, data) {
            console.log(data);
            let userData = JSON.parse(data);
            if (userData !== null){
                console.log(userData + "hello je suis le user  token storé");
            }

            if (userData){
                props.navigation.navigate("Home")
                props.sendUserToken(userData)
                }
        })})()
    },[])

    const isLogin = async () => {
        var rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/users/sign-in`,{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body: `email=${email}&password=${password}`
        });
        var response = await rawResponse.json();
        if (response.login) { props.navigation.navigate('Home')

           let  {token} = response.searchUser
            console.log(token)
            await AsyncStorage.setItem("userToken", JSON.stringify(token))
            props.sendUserToken(token)
        } else {
            setError("Wrong Credentials")
        }
    }

    



    return (
        <View style={styles.container}>

            <Image
                style={styles.imageLogin}
                source={require('../assets/loginBackground.jpg')}
            />
            <Text style={{fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', marginTop: 20}}>Rejoignez la communauté</Text>
            <Text style={{fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', marginBottom: 20}}>des M.eaters.</Text>

            <TextInput style={{width: "80%", marginBottom: 10}}
                mode="outlined"
                label="Adresse email"
                placeholder="hello@matable.com"
                onChangeText={(val) => setEmail(val)}
            />
            
            <TextInput style={{width: "80%"}}
                mode="outlined"
                label="Mot de passe"
                placeholder="********"
                secureTextEntry
                onPress={() => setEye(!Eye)}
                right={(Eye)?<TextInput.Icon name="eye" color="#009788"/>:<TextInput.Icon name="eye-off" color="#009788"/>}
                onChangeText={(val) => setPassword(val)}
            />

            <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000', marginBottom: 30}}>*Identifiant et/ou mot de passe erroné.</Text>


            <Button style={styles.button}
                mode="contained" 
                labelStyle={{fontSize: 20, fontWeight: "bold", color: "#009788", paddingTop: 3}}
                onPress={() => isLogin()}>
                Connexion
            </Button>

            <SocialIcon 
                style={{width: "80%", marginBottom: 10}}
                labelStyle={{ color: "#888888"}}
                button light type='google'
                title="Se connecter avec Google"
                
            />

            <SocialIcon
                style={{width: "80%", marginBottom: 20}}
                button title='Se connecter avec Facebook'
                type='facebook'
            />

            <Text
                style={{fontSize: 18, color: "#1A72C2", textDecorationLine: "underline", marginBottom: 20}}
                onPress={() => {props.navigation.navigate('Register') }}>
                Créer un compte
            </Text>

{/*            <Paragraph
                style={{fontSize: 12, marginBottom: 25}}>
                En continuant, vous acceptez nos "
                    <Text 
                        onPress={() => {props.navigation.navigate('Register') }} 
                        style={{fontSize: 12, marginBottom: 25, color: "#1A72C2", textDecorationLine: "underline"}}>Conditions Générales.
                    </Text>"
            </Paragraph>*/}
        
        </View>



    )

}


function mapDispatchToProps(dispatch){
    return {
        sendUserToken: function (userToken){
            dispatch({type: 'saveUserToken',userToken})
        }

    }
}

export default connect(
    null,
    mapDispatchToProps
)(LoginScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#AADEE1",
    },
    imageLogin :{
        alignItems:"flex-start",
        justifyContent:"flex-start",
        flex: 0.9,
        width: '95%',
        resizeMode: 'cover',
        marginTop: 25,
        borderRadius: 10
    },
    input: {
        flex: 0.1
    },
    button: {
        marginBottom: 15,
        backgroundColor: "#FFC960",
        width: "80%",
        height: 50,
        borderRadius: 50,
        textAlignVertical: "center",
        fontSize: 20
    }
});
