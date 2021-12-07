import React, { useState } from 'react';

import { StyleSheet, View} from 'react-native';
import { TextInput,Appbar, Button,ProgressBar,Text} from "react-native-paper";

function RegisterScreenC(props) {
    const [inputEmail,setInputEmail] = useState("");
    const [inputPassword,setInputPassword] = useState("");
    const [userDesc,setUserDesc] = useState("");
    const [inputProgress,setInputProgress] = useState(0);

    return (<View style={{flex:1,justifyContent: 'center',}}>

                <Appbar style={styles.bottom}>
                    <Appbar.Content title="Informations détaillées" style={{textAlign:'center'}}/>
                </Appbar>

            <TextInput
                style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center" }}
                mode="outlined"
                label="Préférences Culinaires 1"
                onChangeText={(val)=> {setInputEmail(val);setInputProgress(inputProgress + 0.01)}}
                placeholder ="Italien..."
                activeOutlineColor={"#FF3D00"}
                outlineColor={'#0E9BA4'}
            />
            <TextInput style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Préférences Culinaires 2"
                       onChangeText={(val)=> {setInputPassword(val);setInputProgress(inputProgress + 0.01)}}
                       placeholder ="Coréen"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />
            <TextInput style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Préférences Culinaires 3"
                       onChangeText={(val)=> {setInputEmail(val); setInputProgress(inputProgress + 0.01)}}
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
                 mode="contained" onPress={() => props.navigation.navigate('Home')}>
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
        top: 20,
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


export default RegisterScreenC;
/*

<TextInput
    label="Email"
    value={inputEmail}
    onChangeText={text => setInputEmail(text)}
    textAlign={'center'}
    style={{top: 120, padding:10, borderColor:'#369', textAlign:'center'}}
/>*/
