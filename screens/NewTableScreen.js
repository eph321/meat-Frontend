import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, TextInput, Appbar, IconButton } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { Dropdown } from 'react-native-element-dropdown';


// Préférence culinaire Liste

const restaurantTypeList = [
    { label: 'Italien', value: 'Italien' },
    { label: 'Japonais', value: 'Japonais' },
    { label: 'Fast-food', value: 'Fast-food' },
    { label: 'Chinois', value: 'Chinois' },
    { label: 'Mexicain', value: 'Mexicain' },
    { label: 'Indien', value: 'Indien' },
    { label: 'Coréen', value: 'Coréen' },
];

// Liste déroulante trannche d'age
const ageRangeList = [
    { label: "Sans préférence", value: "" },
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
    const [planner, setPlanner] = useState(props.userToken);

    const [isTypeFocus, setIsTypeFocus] = useState(false); // pour style de la liste déroulante type restaurant
    const [isAgeFocus, setIsAgeFocus] = useState(false); // pour style de la liste déroulante tranche d'âge

    // const [newTableCreated, setNewTableCreated ] = useState(false)

    // Date Picker

    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateValue, setDateValue] = useState(false); // Pour affichage uniquement

// AJOUTER UN MINIMUM DATE + TIME

    const formattedDate = date.toLocaleString("fr-FR", options)
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit' }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateValue(true);
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

    const [capacity, setCapacity] = useState(2)

    var setTableCapacity = (countCapacity) => {
        if (countCapacity < 2) {
            countCapacity = 2
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
        const tableDataRawResponse = await fetch(`https://polar-stream-28883.herokuapp.com/add-table`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `date=${date}&title=${title}&placeName=${restaurantName}&placeAddress=${restaurantAddress}&placeType=${restaurantType}&description=${description}&age=${ageRange}&capacity=${capacity}&budget=${budget}&planner=${planner}`
        });
        const tableDataResponse = await tableDataRawResponse.json();
        props.onCreateClick(tableDataResponse.newTable._id);
        props.navigation.navigate("MyTable");
    }

    return (
        /*   <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={styles.container}
> */

        <ScrollView style={{ flex: 1, marginTop: 50 }}>
            <View style={styles.viewHeader}>
                <Appbar style={{ flex: 1, backgroundColor: "#FFC960" }}>
                    <Appbar.Content title="Créer une table" style={{ marginTop: 20, alignItems: "center", size: 17 }} titleStyle={{ fontSize: 22, fontWeight: "700", color: "#009788" }} />
                </Appbar>
                <View style={{ flex: 1, backgroundColor: "#F2F2F2", width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
                    <IconButton
                        icon="home"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <IconButton
                        icon="plus-circle"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() => props.navigation.navigate('NewTable')}
                    />
                    <IconButton
                        icon="calendar-month"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() => props.navigation.navigate('MyEvents')}
                    />
                    <IconButton
                        icon="message-text"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() => props.navigation.navigate('Chat')}
                    />
                    <IconButton
                        icon="account"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() => props.navigation.navigate('MyAccount')}
                    />
                </View>
            </View>



            <View
                style={styles.container}
            >

                <View>
                    {/*  <Button
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
                    )} */}

                    <Text style={{ marginTop: 15, height: 30, alignSelf: "center", fontSize: 25 }}>{(dateValue) ? "Le " + formattedDate : "Choisissez une date"} </Text>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Button onPress={showDatepicker}> Date </Button>
                            <Button onPress={showTimepicker}> Heure </Button>
                        </View>
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
                <Dropdown
                    style={[styles.dropdown, isTypeFocus && { borderColor: '#0E9BA4' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={restaurantTypeList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Quel type de cuisine ?"
                    searchPlaceholder="Search..."
                    value={restaurantType}
                    onFocus={() => setIsTypeFocus(true)}
                    onBlur={() => setIsTypeFocus(false)}
                    onChange={item => {
                        setRestaurantType(item.value);
                        setIsTypeFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <MaterialIcons style={styles.icon} name="restaurant" size={24} color="#0E9BA4" />
                    )}
                />
                <TextInput
                    style={{ alignSelf: "center", width: '70%' }}
                    mode="outlined"
                    label="Description"
                    placeholder="Description"
                    multiline={true}
                    dense={true}
                    right={<TextInput.Affix text="/280" />}
                    maxLength={280}
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
                <Dropdown
                    style={[styles.dropdown, isAgeFocus && { borderColor: '#0E9BA4' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={ageRangeList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Tranche d'âge (optionnel)"
                    searchPlaceholder="Search..."
                    onFocus={() => setIsAgeFocus(true)}
                    onBlur={() => setIsAgeFocus(false)}
                    onChange={item => {
                        setAgeRange(item.value);
                        setIsAgeFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <Ionicons name="options-outline" size={24} color="#0E9BA4" />
                    )}
                />


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
    dropdown: {
        width: "70%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "transparent",
        marginTop: 12,
        marginBottom: 8,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        textAlign: "center",
    },
    selectedTextStyle: {
        fontSize: 16,
        textAlign: "center"
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})

function mapStateToProps(state) {
    return {
        userToken: state.userToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateClick: function (tableId) {
            dispatch({ type: "saveTableId", tableId: tableId })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewTableScreen)


