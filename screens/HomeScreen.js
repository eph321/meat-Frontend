import React, { useState } from 'react';
<<<<<<< HEAD
import { StyleSheet, View, Button } from 'react-native';
import { TextInput, Appbar } from "react-native-paper";
=======
import { StyleSheet, View } from 'react-native';
import {Text, Button, Appbar,TextInput} from "react-native-paper";
>>>>>>> 5767ecb3b93127060877b2aaa76f2d62684b9a04
import DateTimePicker from '@react-native-community/datetimepicker';

function HomeScreen(props) {
<<<<<<< HEAD

    const [place, setPlace] = useState("");
    const [wish, setWish] = useState("");


=======
>>>>>>> 5767ecb3b93127060877b2aaa76f2d62684b9a04
    // DATE PICKER - input "où"
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

<<<<<<< HEAD
    return (
    <View style={styles.container}>

        
        <Appbar style={{flex:1, position: 'absolute', left: 0, height:"10%", width:"100%", top: 0, alignItems: 'center', justifyContent:"center", textAlign:'center', backgroundColor:"#FFC960",}}>
            <Appbar.Content title="Rejoindre une Table" style={{textAlign:'center'}}/>
        </Appbar>   

        <Appbar>
            <Appbar.Action icon="plus" onPress={() => {props.navigation.navigate('NewTable')}} size={28} style={{paddingLeft: 3}}/>
            <Appbar.Action icon="calendar" onPress={() => {props.navigation.navigate('MyEvents')}} size={28} style={{paddingLeft: 3}}/>
            <Appbar.Action icon="account" onPress={() => {props.navigation.navigate('MyAccount')}} size={28} style={{paddingLeft: 3}}/>

        </Appbar> 


            {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9b59b6' }}> */}
            <View style={{flexDirection:"row", marginTop:50}}>
            <Button title="Go to results"
                onPress={() => props.navigation.navigate('Result')}
            />
            <Button title="Go to table"
                onPress={() => props.navigation.navigate('NewTable')}
            />
            <Button title="Go to join"
                onPress={() => props.navigation.navigate('JoinTable')}
            />
            </View>

            <TextInput
                style={styles.input, {width: "80%", marginBottom: 10}}
                mode="outlined"
                label="Où"
                placeholder="Paris 17"
                onChangeText={(val) => setPlace(val)}
            />

            <View style={styles.input, {width: "80%", marginBottom: 10}}>
                <TextInput
                    label="Quand ?"
                    placeholder="JJ/MM/AAAA"
                    onFocus={showDatepicker}
                />
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>

            <TextInput
                style={styles.input, {width: "80%", marginBottom: 10}}
                mode="outlined"
                label="De quoi avez-vous envie ?"
                placeholder="Italien"
                onChangeText={(val) => setWish(val)}
            />
            
    </View>
=======
    return (   <View style={{flex:1,justifyContent: 'space-evenly'}}>
                    <View style={styles.viewHeader}>
                        <Appbar style={{flex:1,backgroundColor:"#FFC960"}}>
                            <Appbar.Content title="Mon Profil" style={{textAlign:'center'}}/>
                        </Appbar>
                        <Appbar style={{flex:1,backgroundColor:"#F2F2F2", width:"100%",justifyContent:"space-evenly"}}>
                            <Appbar.Action icon="home" onPress={() => props.navigation.navigate('Home')} />
                            <Appbar.Action icon="plus-circle" onPress={() => props.navigation.navigate('NewTable')} />
                            <Appbar.Action icon="calendar-month" onPress={() => props.navigation.navigate('MyEvents')} />
                            <Appbar.Action icon="message-text" onPress={() => props.navigation.navigate('Chat')} />
                            <Appbar.Action icon="account" onPress={() => props.navigation.navigate('MyAccount')}
                            />
                        </Appbar>
                    </View>
                    <View style={{flex:7, backgroundColor:"#F2F2F2",justifyContent:"space-evenly"}}>

                        <Button
                            style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#0E9BA4",color:'#FFC960' }}
                            mode="contained" onPress={() =>{ props.navigation.navigate('JoinTable'); }}>
                            <Text Style={{color:'#FFC960'}}>Go to join</Text>
                        </Button>
                        <TextInput
                            label="Où ?"
                            placeholder="Paris 17"
                        />
                        <View>
                            <TextInput
                                label="Quand ?"
                                placeholder="JJ/MM/AAAA"
                                onFocus={showDatepicker}
                            />
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}

                        </View>
                        <TextInput
                            label="De quoi avez-vous envie ?"
                            placeholder="Italien"
                        />
                    </View>


        </View>
>>>>>>> 5767ecb3b93127060877b2aaa76f2d62684b9a04

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },viewHeader: {
        flex: 2,
        left: 0,
        width:"100%",
        top: 0,
        justifyContent:"flex-start",


    },
    input: {
        flex: 0.1
    },
});

export default HomeScreen;

