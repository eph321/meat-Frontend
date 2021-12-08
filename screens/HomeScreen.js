import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, Button, Appbar,TextInput} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

function HomeScreen(props) {
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

