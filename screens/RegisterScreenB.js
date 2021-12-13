import React, { useState } from 'react';

import {Platform, StyleSheet, View} from 'react-native';
import { TextInput,Appbar, Button,ProgressBar,Text,RadioButton} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';



function RegisterScreenB(props) {
    const [firstName,setFirstName] =useState('');
    const [lastName, setLastName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] =useState("male")
    const [dateOfBirth, setDateOfBirth] = useState(new Date(1598051730000));
    const [inputProgress,setInputProgress] = useState(0);

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



            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Nom de famille"
                       onChangeText={(lastNameValue)=> {setLastName(lastNameValue);setInputProgress(inputProgress + 0.01)}}
                       placeholder ="The Cat"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />
            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Adresse Postale"
                       onChangeText={(userAddressValue)=> {setUserAddress(userAddressValue); setInputProgress(inputProgress + 0.01)}}
                       placeholder ="56 boulevard Pereire, 75017 Paris"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />

            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Numéro de mobile"
                       onChangeText={(phoneValue)=> {setPhone(phoneValue); setInputProgress(inputProgress + 0.01)}}
                       placeholder ="+33 6 23 45 67 89"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />

            <View>
                <View>
                    <Button
                        mode="outlined"
                        color={"#0E9BA4"}
                        style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#FFFFFF",color:"#0E9BA4" }}
                        onPress={showDatepicker} icon="calendar" ><Text  Style={{color:"#0E9BA4"}}>Date de naissance</Text></Button>
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
                mode="contained" onPress={() =>{ props.navigation.navigate('RegisterC');props.sendPersonalData({firstName : firstName, lastName:lastName, userAddress:userAddress, inputPhone:phone, gender:gender, dateOfBirth:dateOfBirth}) }}>
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

