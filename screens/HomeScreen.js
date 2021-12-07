import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { TextInput } from "react-native-paper";
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


    return (
<View>
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

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default HomeScreen;

