import React, { useState } from 'react';

import {Platform, StyleSheet, View} from 'react-native';
import { TextInput,Appbar, Button,ProgressBar,Text,RadioButton} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";



function RegisterScreenB(props) {
    const [firstName,setFirstName] =useState('');
    const [lastName, setLastName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] =useState("male")
    const [dateOfBirth, setDateOfBirth] = useState(new Date(1598051730000));
    const [inputProgress,setInputProgress] = useState(0);

    const [inputErrorFirstname, setInputErrorFirstname] = useState("");
    const [inputErrorLastname, setInputErrorLastname] = useState("");
    const [inputErrorUserAddress, setInputErrorUserAddress] = useState("");
    const [inputErrorPhone, setInputErrorPhone] = useState("");
    const [inputErrorDateOfBirth, setInputErrorDateOfBirth] = useState("");

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShow(Platform.OS === 'ios');
        setDateOfBirth(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    // Messages d'erreur pour les champs obligatoires
    
    const connexionValidation = () => {
        if (firstName && lastName && userAddress && phone && phone.match(/^((\+)33|0)[1-9](\d{2}){4}$/) && dateOfBirth) {
            props.navigation.navigate('RegisterC')
        } else {
        
        if (firstName === "") {
            setInputErrorFirstname("*Prénom requis!")
        } else {
            setInputErrorFirstname("")
        }

        if (lastName === "") {
            setInputErrorLastname("*Nom de famille requis!")
        } else {
            setInputErrorLastname("")
        }

        if (userAddress === "") {
            setInputErrorUserAddress("*Adresse requise!")
        } else {
            setInputErrorUserAddress("")
        }

        if (phone === "") {
            setInputErrorPhone("*Numéro de mobile requis!")
            } else if (!phone.match(/^((\+)33|0)[1-9](\d{2}){4}$/)) {
            setErrorPassword("*Le numéro de mobile doit comporter 10 chiffres!")
            } else {
            setInputErrorPhone("")
        }

        if (dateOfBirth !== new Date(1598051730000)) {
            setInputErrorDateOfBirth("*Champ requis!")
        } else {
            setInputErrorDateOfBirth("")
        }
    }   
    }





    return (<View style={{flex:1,justifyContent: 'space-evenly',}}>

                <Appbar style={styles.bottom}>
                    <Appbar.Content title="Informations Personnelles" style={{textAlign:'center'}}/>
                </Appbar>

            <TextInput
                style={{marginTop: 80, textAlign:'center',width:'70%',alignSelf:"center" }}
                mode="outlined"
                label="Prénom"
                onChangeText={(firstNameValue)=> {setFirstName(firstNameValue);setInputProgress(inputProgress + 0.01)}}
                placeholder ="Félix"
                activeOutlineColor={"#FF3D00"}
                outlineColor={'#0E9BA4'}
            />

            <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorFirstname}</Text>
            </View>         

            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Nom de famille"
                       onChangeText={(lastNameValue)=> {setLastName(lastNameValue);setInputProgress(inputProgress + 0.01)}}
                       placeholder ="The Cat"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />

            <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorLastname}</Text>
            </View>

            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Adresse Postale"
                       onChangeText={(userAddressValue)=> {setUserAddress(userAddressValue); setInputProgress(inputProgress + 0.01)}}
                       placeholder ="56 boulevard Pereire, 75017 Paris"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'AIzaSyDv42YKXmBgw6YrGJVtgjtwNNeUht-82I8',
                    language: 'fr',
                }}
            />

            <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorUserAddress}</Text>
            </View>

            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Numéro de mobile"
                       onChangeText={(phoneValue)=> {setPhone(phoneValue); setInputProgress(inputProgress + 0.01)}}
                       placeholder ="+33 6 23 45 67 89"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />

            <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorPhone}</Text>
            </View>

            <View>
                <View>
                    <Button
                        mode="outlined"
                        color={"#0E9BA4"}
                        style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#FFFFFF",color:"#0E9BA4" }}
                        onPress={showDatepicker} icon="calendar" ><Text  Style={{color:"#0E9BA4"}}>Date de naissance</Text>
                    </Button>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateOfBirth}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>

            <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorDateOfBirth}</Text>
            </View>

                <RadioButton.Group
                    value={gender}
                    onValueChange={newValue => setGender(newValue)}
                    >
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:"70%",alignItems:"center",marginLeft:60}}>
                    <View >
                        <RadioButton value="male" />
                        <Text>Homme</Text>

                    </View>
                    <View >

                        <RadioButton value="female" />
                        <Text>Femme</Text>
                    </View>
                    <View>
                        <RadioButton value="non-binary" />
                        <Text>Non Binaire</Text>
                    </View>
                    </View>
                </RadioButton.Group>

            <Button
                style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#0E9BA4",color:'#FFC960' }}
                mode="contained" onPress={() =>{ connexionValidation();props.sendPersonalData({firstName : firstName, lastName:lastName, userAddress:userAddress, inputPhone:phone, gender:gender, dateOfBirth:dateOfBirth}) }}>
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
        sendPersonalData: function (personalData){
            dispatch({type: 'registerB',personalData})
        }

    }
}

export default connect(
    null,
    mapDispatchToProps
)(RegisterScreenB);

