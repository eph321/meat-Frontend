import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Button, TextInput, Dialog, Portal, Appbar } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
import RNPickerSelect from 'react-native-picker-select';

const franckIP = "192.168.1.41"
const StephIP = "192.168.1.9"
const franckLaCapsuleIP = "172.17.1.118"
const StephIpCapsule = "172.17.1.164"


// Préférence culinaire Liste

const restaurantTypeList = [
    { label: 'Italien', value: 'italien' },
    { label: 'Japonais', value: 'japonais' },
    { label: 'Fast-food', value: 'fast-food' },
];

// Liste déroulante trannche d'age
const ageRangeList = [
    { label: "18-25 ans", value: "18-25" },
    { label: "25-35 ans", value: "25-35" },
    { label: "35-45 ans", value: "35-45" },
    { label: "45-55 ans", value: "45-55" },
    { label: "+ 55ans", value: "55+" },
];


function NewTableScreen(props) {

    // ETATS INPUTS

    const [restaurantType, setRestaurantType] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [title, setTitle] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [description, setDescription] = useState('');
    const planner = props.userToken;

    // Pour le calendrier Datepicker
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    // Date Picker

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


    // Capacity

    const [capacity, setCapacity] = useState(1)

    var setTableCapacity = (countCapacity) => {
        if (countCapacity < 1) {
            countCapacity = 1
        }
        if (countCapacity > 6) {
            countCapacity = 6
        }
        setCapacity(countCapacity)
    }

    const tabCapacity = []
    for (let i = 0; i < 6; i++) {
        var seatColor = "black"
        if (i < capacity) {
            seatColor = "#FFC960"
        }
        var capacityCount = i + 1
        tabCapacity.push(<MaterialCommunityIcons key={i} onPress={() => setTableCapacity(capacityCount)} name="seat" size={24} color={seatColor} />)
    }


    //Budget

    const [budget, setBudget] = useState(1)

    var setTableBudget = (countBudget) => {
        if (countBudget < 1) {
            countBudget = 1
        }
        if (countBudget > 4) {
            countBudget = 4
        }
        setBudget(countBudget)
    }

    const tabBudget = []
    for (let i = 0; i < 4; i++) {
        var signColor = "black"
        if (i < budget) {
            signColor = "#FFC960"
        }
        tabBudget.push(<MaterialIcons key={i} name="euro" size={24} color={signColor} />)
    }

    // Création de la table
    const createTable = async () => {
        await fetch(`https://polar-stream-28883.herokuapp.com/add-table`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `date=${date}&title=${title}&placeName=${restaurantName}&placeAddress=${restaurantAddress}&placeType=${restaurantType}&description=${description}&age=${ageRange}&capacity=${capacity}&budget=${budget}&planner=${planner}`
        })
    }

    return (
        /*   <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={styles.container}
> */

        <ScrollView style={{ flex: 1, marginTop: 50 }}>

            <View style={styles.viewHeader}>
                <Appbar style={{ flex: 1, backgroundColor: "#FFC960", height: 20 }}>
                    <Appbar.Content title="Creer une table" style={{ textAlign: 'center' }} />
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

            <View
                style={styles.container}
            >

                <View>
                    <Button
                        mode="outlined"
                        color={'#FFC960'}
                        style={{ padding: 10, textAlign: 'center', width: '70%', alignSelf: "center", backgroundColor: "#FFFFFF", color: '#FFC960' }}
                        onPress={showDatepicker} icon="calendar" ><Text Style={{ color: '#FFC960' }}>Choisissez une date</Text>


                    </Button>
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
                    style={{ alignSelf: "center", width: '70%' }}
                    mode="outlined"
                    label="Titre"
                    value={title}
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    style={{ alignSelf: "center", width: '70%' }}
                    mode="outlined"
                    label="Nom du restaurant"
                    value={restaurantName}
                    onChangeText={text => setRestaurantName(text)}
                />
                <TextInput
                    style={{ alignSelf: "center", width: '70%' }}
                    mode="outlined"
                    label="Adresse du restaurant"
                    value={restaurantAddress}
                    onChangeText={text => setRestaurantAddress(text)}
                />
                <View style={{ alignContent: "center", marginTop: 12, marginBottom: 8 }}>
                    <RNPickerSelect
                        onValueChange={(value) => { setRestaurantType(value) }}
                        placeholder={{ label: "Quel type de cuisine ?", value: null, color: "black" }}
                        /* style={{...styles.RNPicker}} */
                        items={restaurantTypeList}
                    />
                </View>

                <TextInput
                    style={{ alignSelf: "center", width: '70%' }}
                    mode="outlined"
                    label="Description"
                    placeholder="Présentation de l'évènement"
                    multiline={true}
                    dense={true}
                    right={<TextInput.Affix text="/280" />}
                    maxLength={280}
                    value={description}
                    onChangeText={text => setDescription(text)}
                />

                <View style={{ alignContent: "center", marginTop: 12, marginBottom: 8 }}>
                    <RNPickerSelect
                        onValueChange={(value) => { setAgeRange(value), console.log(ageRange) }}
                        placeholder={{ label: "Tranche d'âge (optionnel)", value: null, color: "black" }}
                        /* style={{...styles.RNPicker}} */
                        items={ageRangeList}
                    />
                </View>

                <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                    <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", justifyContent: "flex-end" }}>

                        <Text>Meaters:</Text>
                        {tabCapacity}
                        <Button compact mode="contained" onPress={() => setTableCapacity(capacity - 1)}>-</Button>
                        <Button compact mode="contained" onPress={() => setTableCapacity(capacity + 1)}>+</Button>

                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                        <Text>Budget:</Text>
                        {tabBudget}
                        <Button compact mode="contained" onPress={() => setTableBudget(budget - 1)}>-</Button>
                        <Button compact mode="contained" onPress={() => setTableBudget(budget + 1)}>+</Button>

                    </View>
                </View>

                <Button mode="contained" onPress={() => createTable()}>Créer la table</Button>

            </View>

        </ScrollView>
        /* </KeyboardAvoidingView> */

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewHeader: {
        flex: 2,
        left: 0,
        width: "100%",
        top: 0,
        justifyContent: "flex-start",
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    RNPicker: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})

function mapStateToProps(state) {
    return {
        userToken: state.userToken
    }
}

export default connect(
    mapStateToProps,
    null
)(NewTableScreen)


