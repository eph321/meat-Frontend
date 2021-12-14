import React, { useState} from 'react';

import {AsyncStorage, StyleSheet, View} from 'react-native';
import { TextInput,Appbar, Button,ProgressBar,Text} from "react-native-paper";
import { connect } from 'react-redux';
import {MultiSelect} from "react-native-element-dropdown/index";
import {MaterialIcons} from "@expo/vector-icons";
import {useIsFocused} from "@react-navigation/native";



function RegisterScreenC(props) {
    const isFocused = useIsFocused();
    const restaurantTypeList = [
        { label: 'Italien', value: 'Italien' },
        { label: 'Japonais', value: 'Japonais' },
        { label: 'Fast-food', value: 'Fast-food' },
        { label: 'Chinois', value: 'Chinois' },
        { label: 'Mexicain', value: 'Mexicain' },
        { label: 'Indien', value: 'Indien' },
        { label: 'Coréen', value: 'Coréen' },
        { label: 'Africain', value: 'Africain' },
    ]

    const signUpBackend = async () => {


        let rawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/users/sign-up`,{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body: `lastname=${props.userToSend.lastName}&firstname=${props.userToSend.firstName}&password=${props.userToSend.inputPassword}&description=${userDesc}&email=${props.userToSend.inputEmail}&dateofbirth=${props.userToSend.dateOfBirth}&gender=${props.userToSend.gender}&addresses=${props.userToSend.userAddress}&avatar=${props.userToSend.inputAvatar}&phone=${props.userToSend.inputPhone}&preference1=${userPreference1}&preference2=${userPreference2}&preference3=${userPreference3}`

        });
        let response = await rawResponse.json();
        console.log("résumé des infos envoyés au backend")
        console.log(response)
        console.log(response.newUserSave.token)
        let  {token} = response.newUserSave
        await AsyncStorage.setItem("userToken", JSON.stringify(token))
        props.sendUserTokenRegister(token)

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
            <View style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center" }}>
                <MultiSelect
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={restaurantTypeList}
                    labelField="label"
                    valueField="value"
                    placeholder="Quel type de cuisine ?"
                    searchPlaceholder="Search..."
                    /* value={restaurantType} */
                    onChange={item => {
                        setRestaurantType([item]);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <MaterialIcons style={styles.icon} name="restaurant" size={24} color="#0E9BA4" />

                    )}
                    selectedStyle={styles.selectedStyle}
                />
            </View>
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
    },viewHeader: {
        flex: 2,
        left: 0,
        width: "100%",
        top: 0,
        justifyContent: "flex-start",
    },
    dropdown: {
        width: "70%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "transparent",
    },
    placeholderStyle: {
        fontSize: 16,
        textAlign: "center",
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    }
});



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

