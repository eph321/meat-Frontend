import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Appbar, IconButton, Modal, Portal, Provider} from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { Dropdown } from 'react-native-element-dropdown';

const FranckIP = "http://192.168.1.41:3000"
const herokuIP = "https://polar-stream-28883.herokuapp.com"

// Préférence culinaire Liste

const restaurantTypeList = [
    { label: 'Traditionnel', value: 'Traditionnel' },
    { label: 'Italien', value: 'Italien' },
    { label: 'Japonais', value: 'Japonais' },
    { label: 'Fast-food', value: 'Fast-food' },
    { label: 'Chinois', value: 'Chinois' },
    { label: 'Mexicain', value: 'Mexicain' },
    { label: 'Indien', value: 'Indien' },
    { label: 'Coréen', value: 'Coréen' },
    { label: 'Africain', value: 'Africain' },
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
    const [title, setTitle] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [description, setDescription] = useState("");
    const [planner, setPlanner] = useState(props.userToken);
    const [restaurantLocation, setRestaurantLocation] = useState("")

    const [isTypeFocus, setIsTypeFocus] = useState(false); // pour style de la liste déroulante type restaurant
    const [isAgeFocus, setIsAgeFocus] = useState(false); // pour style de la liste déroulante tranche d'âge


    // MODAL
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    // const [newTableCreated, setNewTableCreated ] = useState(false)

    // Date Picker

    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateValue, setDateValue] = useState(false); // Pour affichage uniquement
    const [clickOnTimeBtn, setClickOnTimeBtn] = useState(false)

    // AJOUTER UN MINIMUM DATE + TIME

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateValue(true);
    };

    const formattedDate = date.toLocaleString("fr-FR", options)
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        setVisible(true)
    };

    const showTimepicker = () => {
        showMode('time');
        setClickOnTimeBtn(true);
        setVisible(true)
    };

    // autocomplete addresse

    const [visibleList, setVisibleList] = useState(false);
    const [listLabelAddress, setListLabelAddress] = useState([])
    useEffect(() => {
        const fetchAddress = async (val) => {
            let rawResponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${val.replace('_', "+")}&limit=5`)
            let response = await rawResponse.json();
            let tempList = response.features.map((el) => { return { label: el.properties.label, values: el.geometry } })
            setListLabelAddress(tempList)
            console.log(listLabelAddress)


            setVisibleList(true)
        }
        fetchAddress(restaurantAddress)

    }, [restaurantAddress])

    let addresses = listLabelAddress.map((el, i) => {
        return (<TouchableOpacity key={i} onPress={() => { handlePressAddress(el); }}>
            <Text style={{ margin: 5 }}>{el.label}</Text>
        </TouchableOpacity>)
    })
    let listOfAddresses;

    if (visibleList) {
        listOfAddresses = addresses
    }
    else {
        listOfAddresses = <Text></Text>
    }

    const handlePressAddress = (el) => {
        setRestaurantAddress(el.label);
        setRestaurantLocation({ longitude: el.values.coordinates[0], latitude: el.values.coordinates[1] })
        console.log(restaurantLocation)
        setVisibleList(false)
    }


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

        if (dateValue === false) {
            alert("Veuillez renseigner la date")
        } else if (clickOnTimeBtn === false) {
            alert("Veuillez renseigner l'heure")
        } else if (title === "") {
            alert("Veuillez renseigner le titre de l'évènement")
        } else if (restaurantName === "") {
            alert("Veuillez renseigner le nom du restaurant")
        } else if (restaurantAddress === "") {
            alert("Veuillez renseigner l'adresse du restaurant")
        } else if (restaurantType === "") {
            alert("Veuillez renseigner le type de cuisine")
        } else {
            const tableDataRawResponse = await fetch(`${herokuIP}/add-table`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `date=${date}&title=${title}&placeName=${restaurantName}&placeAddress=${restaurantAddress}&placeType=${restaurantType}&description=${description}&age=${ageRange}&capacity=${capacity}&budget=${budget}&planner=${planner}&latitude=${restaurantLocation.latitude}&longitude=${restaurantLocation.longitude}`
            });
            const tableDataResponse = await tableDataRawResponse.json();
            props.onCreateClick(tableDataResponse.newTable._id);
            props.navigation.navigate("MyTable");
        }
    }

    return (
        /*   <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    > */
        <View style={styles.container}>

            <View style={styles.topNavBar}>
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
                    onPress={() => props.navigation.navigate('MyBuddies')}
                />
                <IconButton
                    icon="account"
                    color={'#0E9BA4'}
                    size={25}
                    onPress={() => props.navigation.navigate('MyAccount')}
                />
            </View>


            <View style={styles.contentView}>

                {/* <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.contentView}
    >   */}

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

                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Button color={"#0E9BA4"} onPress={showDatepicker}> Date </Button>
                    <Button color={"#0E9BA4"} onPress={showTimepicker}> Heure </Button>
                </View>

                <TextInput
                    style={{ alignSelf: "center", width: '70%' }}
                    mode="outlined"
                    label="Titre"
                    value={title}
                    outlineColor={"#0E9BA4"}
                    activeOutlineColor={"#FFC960"}
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    style={{ alignSelf: "center", width: '70%' }}
                    mode="outlined"
                    label="Nom du restaurant"
                    value={restaurantName}
                    outlineColor={"#0E9BA4"}
                    activeOutlineColor={"#FFC960"}
                    onChangeText={text => setRestaurantName(text)}
                />
                <TextInput
                    style={{ alignSelf: "center", width: '70%' }}
                    mode="outlined"
                    label="Adresse du restaurant"
                    value={restaurantAddress}
                    outlineColor={"#0E9BA4"}
                    activeOutlineColor={"#FFC960"}
                    onChangeText={text => setRestaurantAddress(text)}
                />

                {listOfAddresses}
               
                <Dropdown
                    style={[styles.dropdown, isTypeFocus && { borderColor: '#FFC960' }]}
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
                    style={{ alignSelf: "center", width: '70%', height: 120, marginBottom: 12 }}
                    mode="outlined"
                    label="Description"
                    placeholder="Description"
                    multiline={true}
                    dense={true}
                    right={<TextInput.Affix text="/280" />}
                    maxLength={280}
                    value={description}
                    outlineColor={"#0E9BA4"}
                    activeOutlineColor={"#FFC960"}
                    onChangeText={text => setDescription(text)}
                />

                <Dropdown
                    style={[styles.dropdown, isAgeFocus && { borderColor: '#FFC960' }]}
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

                <View style={{ flexDirection: "column", alignItems: "flex-end", marginLeft: 13 }}>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "90%", marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>M.eaters:</Text>
                        <View style={{ flexDirection: "row" }}>
                            {tabCapacity}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Button style={{ margin: 3 }} color={"#0E9BA4"} compact mode="contained" onPress={() => setTableCapacity(capacity - 1)}>-</Button>
                            <Button style={{ margin: 3 }} color={"#0E9BA4"} compact mode="contained" onPress={() => setTableCapacity(capacity + 1)}>+</Button>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "90%" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Budget:</Text>
                        <View style={{ flexDirection: "row", marginLeft: 35 }}>
                            {tabBudget}
                        </View>
                        <View style={{ marginLeft: 25, flexDirection: "row" }}>
                            <Button style={{ margin: 3 }} color={"#0E9BA4"} compact mode="contained" onPress={() => setTableBudget(budget - 1)}>-</Button>
                            <Button style={{ margin: 3 }} color={"#0E9BA4"} compact mode="contained" onPress={() => setTableBudget(budget + 1)}>+</Button>
                        </View>
                    </View>
                </View>
                <Button style={{ marginTop: 20 }} color={"#0E9BA4"} mode="contained" onPress={() => createTable()}>Créer la table</Button>

            </View>

            <Provider>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
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
                        </Modal>
                        </Portal>
                        </Provider>

            {/*  </KeyboardAvoidingView> */}

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    topNavBar: {
        flex: 1.43,
        backgroundColor: "#FFC960",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    contentView: {
        flex: 11,
        backgroundColor: "#F2F2F2",
        alignItems: "center",
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
    },
    dropdown: {
        width: "70%",
        height: 50,
        borderColor: '#0E9BA4',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "transparent",
        marginBottom: 8,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        textAlign: "center",
        color: "gray",
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


