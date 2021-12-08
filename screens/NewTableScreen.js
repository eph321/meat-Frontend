import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Button, TextInput, Dialog, Portal } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const franckIP = "192.168.1.41"

// Préférence culinaire Liste

const restaurantTypeList = [
    { id: 1, title: "Italien" },
    { id: 2, title: "Japonais" },
    { id: 3, title: "Fast-food" },
];

// Liste déroulante trannche d'age
const ageRangeList = [
    { id: "18-25", title: "18-25 ans" },
    { id: "25-35", title: "25-35 ans" },
];

// Affichage des boutons dans les portals (modal) de liste de choix (type de cuisine et tranche d'âge)
const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);

function NewTableScreen(props) {

    // ETATS INPUTS

    const [restaurantType, setRestaurantType] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [title, setTitle] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [description, setDescription] = useState('');

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


    // Préférence culinaire Liste

    const [restaurantTypeIsVisible, setRestaurantTypeIsVisible] = useState(false);
    const hideRestaurantTypeDialog = () => setRestaurantTypeIsVisible(false);

    const [selectedRestaurantTypeId, setSelectedRestaurantTypeId] = useState(null);

    const renderRestaurantTypeItem = ({ item }) => {
        const backgroundColor = item.id === selectedRestaurantTypeId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedRestaurantTypeId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedRestaurantTypeId(item.id), setRestaurantType(item.title)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };


    // Choix tranche d'âge

    const [ageRangeIsVisible, setAgeRangeIsVisible] = useState(false)
    const hideAgeRangeListDialog = () => setAgeRangeIsVisible(false);

    const [selectedAgeRangeId, setSelectedAgeRangeId] = useState(null);

    const renderAgeRangeItem = ({ item }) => {
        const backgroundColor = item.id === selectedAgeRangeId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedAgeRangeId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedAgeRangeId(item.id), setAgeRange(item.title)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
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
        await fetch(`http://${franckIP}:3000/add-table`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `date=${date}&title=${title}&placename=${restaurantName}&placeaddress=${restaurantAddress}&placetype=${restaurantType}&description=${description}&age=${ageRange}&capacity=${capacity}&budget=${budget}`
        })
    }



    return (
        /*   <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={styles.container}
> */

        <ScrollView style={{ flex: 1, marginTop: 50 }}>

            <View style={{ flexDirection: "row", alignContent: "flex-start" }}>
                <Button
                    title="Home"
                    mode="contained"
                    onPress={() => props.navigation.navigate("Home")}
                >
                    Home
                </Button>

                <Button
                    title="My Events"
                    mode="contained"
                    onPress={() => props.navigation.navigate("MyEvents")}
                >
                    My Events
                </Button>
                <Button
                    title="My Profile"
                    mode="contained"
                    onPress={() => props.navigation.navigate("Profile")}
                >
                    Profile
                </Button>
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

                <Button mode="outlined" onPress={() => setRestaurantTypeIsVisible(true)}> Quel type de cuisine ?</Button>



                <Portal>
                    <Dialog visible={restaurantTypeIsVisible} onDismiss={hideRestaurantTypeDialog}>
                        <Dialog.ScrollArea>
                            <ScrollView style={{ height: "90%" }} contentContainerStyle={{ paddingHorizontal: 24 }}>
                                <SafeAreaView style={styles.container}>
                                    <FlatList
                                        data={restaurantTypeList}
                                        renderItem={renderRestaurantTypeItem}
                                        keyExtractor={(item) => item.id}
                                        extraData={selectedRestaurantTypeId}
                                    />
                                </SafeAreaView>
                            </ScrollView>
                        </Dialog.ScrollArea>
                    </Dialog>
                </Portal>

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

                <Button mode="outlined" onPress={() => setAgeRangeIsVisible(true)}> Age ?</Button>
                <Portal>
                    <Dialog visible={ageRangeIsVisible} onDismiss={hideAgeRangeListDialog}>
                        <Dialog.ScrollArea>
                            <ScrollView style={{ height: "90%" }} contentContainerStyle={{ paddingHorizontal: 24 }}>
                                <SafeAreaView style={styles.container}>
                                    <FlatList
                                        data={ageRangeList}
                                        renderItem={renderAgeRangeItem}
                                        keyExtractor={(item) => item.id}
                                        extraData={selectedAgeRangeId}
                                    />
                                </SafeAreaView>
                            </ScrollView>
                        </Dialog.ScrollArea>
                    </Dialog>
                </Portal>

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
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})

export default NewTableScreen


