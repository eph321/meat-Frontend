import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Appbar, TextInput, Card, Title, Paragraph } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect } from "react-redux"

const franckIP = "192.168.1.41"
const StephIP = "192.168.1.9"
const StephIpCapsule = "172.17.1.164"

const franckLaCapsuleIP = "172.17.1.118"

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

    useEffect(async () => {
        var rawResponse = await fetch(`http://${StephIpCapsule}:3000/search-table`);
        var response = await rawResponse.json();

        setTableDataList(response.result)
    }
        , []) // tableDataList



    var tableList = tableDataList.map((e, i) => {

        let capacityAvatar = []
        for (let avatar = 0; avatar < e.capacity; avatar++) {
            capacityAvatar.push(
                <Ionicons key={avatar} name="person-circle-outline" size={24} color="black" />
            )
        }


        return (
            <Card key={i} style={{ marginBottom: 8 }} onPress={() => { props.onCardClick(e._id); props.navigation.navigate("JoinTable") }}>
                <Card.Content>
                    <Title style={{ alignSelf: "center" }}>{e.title}</Title>
                    <Paragraph style={{ alignSelf: "center" }}>{e.date}</Paragraph>
                    <View style={{ flexDirection: "row", alignSelf: "center", marginBottom: 4, marginTop: 4 }}>
                        {capacityAvatar}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <MaterialCommunityIcons name="table-furniture" size={24} color="black" />
                        <View>
                            <Text>Restaurant</Text>
                            <Paragraph style={{ color: "#0E9BA4", fontWeight: "bold" }}>Nom du restaurant</Paragraph>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialIcons name="restaurant" size={24} color="#0E9BA4" />
                            <Paragraph> Type du Restaurant</Paragraph>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginTop: 3 }}>
                        <FontAwesome5 style={{ marginRight: 8 }} name="walking" size={24} color="#0E9BA4" />
                        <Text>à ... m</Text>
                    </View>
                </Card.Content>
            </Card>
        );
    })


    return (

        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <View style={styles.viewHeader}>
                <Appbar style={{ flex: 1, backgroundColor: "#FFC960", height: 20 }}>
                    <Appbar.Content title="Home Page" style={{ textAlign: 'center' }} />
                </Appbar>
                <Appbar style={{ flex: 1, backgroundColor: "#F2F2F2", width: "100%", justifyContent: "space-evenly", height: 40 }}>
                    <Appbar.Action icon="home" onPress={() => props.navigation.navigate('Home')} />
                    <Appbar.Action icon="plus-circle" onPress={() => props.navigation.navigate('NewTable')} />
                    <Appbar.Action icon="calendar-month" onPress={() => props.navigation.navigate('MyEvents')} />
                    <Appbar.Action icon="message-text" onPress={() => props.navigation.navigate('Chat')} />
                    <Appbar.Action icon="account" onPress={() => props.navigation.navigate('MyAccount')}
                    />
                </Appbar>
            </View>
            <View style={{ flex: 2, backgroundColor: "#F2F2F2", justifyContent: "flex-start", marginBottom : 150 }}>

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
            <View style={{ flex: 3 , height: 100}}>
            <ScrollView >

                {tableList}

            </ScrollView>
            </View>

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



function mapStateToProps(state) {
    return {
            tableId: state.tableId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCardClick: function (tableId) {
            dispatch({ type: "saveTableId", tableId: tableId })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)

