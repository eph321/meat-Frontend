import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Button, TextInput, Dialog, Portal } from "react-native-paper"

// Préférence culinaire Liste

const culinaryPreferencesList = [
    { id: 1, title: "Italien" },
    { id: 2, title: "Japonais" },
    { id: 3, title: "Fast-food" },
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);

// Liste déroulante trannche d'age
const ageRangeList = [
    {
        title: "18-25 ans",
        id: "18-25"
    },
    {
        title: "25-35 ans",
        id: "25-35"
    },
]


function NewTableScreen(props) {

    const [title, setTitle] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [description, setDescription] = useState('')
    const [table, setTable] = useState("")

    const [culinaryListIsVisible, setCulinaryListIsVisible] = useState(false)
    const hideCulinaryListDialog = () => setCulinaryListIsVisible(false);

    const [ageRangeIsVisible, setAgeRangeIsVisible] = useState(false)
    const hideAgeRangeListDialog = () => setAgeRangeIsVisible(false);


    // Pour le calendrier Datepicker
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    // Liste déroulante choix cuisine
    /* const [culinaryListValue, setCulinaryListValue] = useState(null) */


    // Préférence culinaire Liste

    const [selectedCulinaryId, setSelectedCulinaryId] = useState(null);

    const renderCulinaryItem = ({ item }) => {
        const backgroundColor = item.id === selectedCulinaryId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedCulinaryId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedCulinaryId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };


    // Choix tranche d'âge

    const [selectedAgeRangeId, setSelectedAgeRangeId] = useState(null);

    const renderAgeRangeItem = ({ item }) => {
        const backgroundColor = item.id === selectedAgeRangeId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedAgeRangeId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedAgeRangeId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };


    return (

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
                {/* <DatePicker defaultValue={moment('01/01/2021', dateFormatList[0])} format={dateFormatList} /> */}
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

                <Button mode="outlined" onPress={() => setCulinaryListIsVisible(true)}> Quel type de cuisine ?</Button>

                <Portal>
                    <Dialog visible={culinaryListIsVisible} onDismiss={hideCulinaryListDialog}>
                        <Dialog.ScrollArea>
                            <ScrollView style={{ height: "90%" }} contentContainerStyle={{ paddingHorizontal: 24 }}>
                                <SafeAreaView style={styles.container}>
                                    <FlatList
                                        data={culinaryPreferencesList}
                                        renderItem={renderCulinaryItem}
                                        keyExtractor={(item) => item.id}
                                        extraData={selectedCulinaryId}
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
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                        <Text>Meaters:</Text>
                        <Button compact mode="contained">-</Button>
                        <Button compact mode="contained">+</Button>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                        <Text>Budget:</Text>
                        <Button compact mode="contained">-</Button>
                        <Button compact mode="contained">+</Button>
                    </View>
                </View>

                <Button mode="contained" onPress={() => setTable}>Créer la table</Button>

            </View>


        </ScrollView>

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


