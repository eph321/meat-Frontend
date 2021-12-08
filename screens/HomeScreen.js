import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Appbar, TextInput, Card, Title, Paragraph } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

const franckIP = "192.168.1.41"

function HomeScreen(props) {

const [tableDataList, setTableDataList] = useState([""])


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

    // Affichage des tables existantes 

    useEffect( async () => {
       var rawResponse = await fetch(`http://${franckIP}:3000/search-table`);
       var response = await rawResponse.json();
    
       setTableDataList(response.result)
    }
    ,[])
   
    var tableList = tableDataList.map((e, i) => {
        return (
                <Card key={i}>
                    <Card.Content>
                        <Title>{e.title}</Title>
                        <Paragraph>{e.date}</Paragraph>
                    </Card.Content>
                </Card>
        );
    }) 


    return (

        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <View style={styles.viewHeader}>
                <Appbar style={{ flex: 1, backgroundColor: "#FFC960" }}>
                    <Appbar.Content title="Mon Profil" style={{ textAlign: 'center' }} />
                </Appbar>
                <Appbar style={{ flex: 1, backgroundColor: "#F2F2F2", width: "100%", justifyContent: "space-evenly" }}>
                    <Appbar.Action icon="home" onPress={() => props.navigation.navigate('Home')} />
                    <Appbar.Action icon="plus-circle" onPress={() => props.navigation.navigate('NewTable')} />
                    <Appbar.Action icon="calendar-month" onPress={() => props.navigation.navigate('MyEvents')} />
                    <Appbar.Action icon="message-text" onPress={() => props.navigation.navigate('Chat')} />
                    <Appbar.Action icon="account" onPress={() => props.navigation.navigate('MyAccount')}
                    />
                </Appbar>
            </View>
            <View style={{ flex: 4, backgroundColor: "#F2F2F2", justifyContent: "flex-start" }}>

                <Button
                    style={{ padding: 10, textAlign: 'center', width: '70%', alignSelf: "center", backgroundColor: "#0E9BA4", color: '#FFC960' }}
                    mode="contained" onPress={() => { props.navigation.navigate('JoinTable'); }}>
                    <Text Style={{ color: '#FFC960' }}>Go to join</Text>
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
            <ScrollView>

                {tableList} 

            </ScrollView>


        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    }, viewHeader: {
        flex: 2,
        left: 0,
        width: "100%",
        top: 0,
        justifyContent: "flex-start",


    },
    input: {
        flex: 0.1
    },
});

export default HomeScreen;

