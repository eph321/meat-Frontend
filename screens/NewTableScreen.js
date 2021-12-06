import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, BottomSheet, ListItem } from 'react-native';
import { Button, TextInput, Dialog, Portal } from "react-native-paper"


function NewTableScreen(props) {

    const [title, setTitle] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [description, setDescription] = useState('')

    const [culinaryListIsVisible, setCulinaryListIsVisible] = useState(false)
    const hideCulinaryListDialog = () => setCulinaryListIsVisible(false);

    const [culinaryChoice, setCulinaryChoice] = useState("")
    const [ageRangeChoice, setAgeRangeChoice] = useState("")


    // Pour le calendrier Datepicker
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    // Liste déroulante choix cuisine
    /* const [culinaryListValue, setCulinaryListValue] = useState(null) */




    /* REACT NATIVE ELEMENTS - LISTE DEROULANTE
     const culinaryPreferencesList = [
         { title: "Italien" },
         { title: "Japonais" },
         { title: "Fast-food" },
         {
             title: 'Cancel',
             containerStyle: { backgroundColor: 'red' },
             titleStyle: { color: 'white' },
             onPress: () => setIsVisible(false),
         }
     ];
 
     const culinaryPreferences = culinaryPreferencesList.map((e, i) => (
         <ListItem key={i} containerStyle={e.containerStyle} onPress={() => setIsVisible(false)}>
             <ListItem.Content>
                 <ListItem.Title style={e.titleStyle}>{e.title}</ListItem.Title>
             </ListItem.Content>
         </ListItem>
     )) */


    // Liste déroulante trannche d'age
    const ageRangeOptions = [
        {
            value: "18-25 ans",
            label: "18-25"
        },
        {
            value: "25-35 ans",
            label: "25-35"
        },
    ]

    function onAgeRangeChange(value) {
        setAgeRangeChoice(value)
    }






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

                {/*         REACT NATIVE ELEMENTS - Liste déroulante
                <View style={{ flex: 1 }}>
                   <Button title="Quel type de cuisine ?" onPress={() => setIsVisible(true) } />
                    <BottomSheet
                        isVisible={isVisible}
                        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                    >
                        {culinaryPreferences}
                    </BottomSheet>
                </View> */}

<Button mode="outlined" onPress={() => setCulinaryListIsVisible(true) }> Quel type de cuisine ?</Button>

                <Portal>
                    <Dialog visible={culinaryListIsVisible} onDismiss={hideCulinaryListDialog}>
                        <Dialog.ScrollArea>
                            <ScrollView  style={{height:"90%"}} contentContainerStyle={{ paddingHorizontal: 24 }}>
                                <Text>This is a scrollable area</Text>
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
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text>Meaters:</Text>
                    <Button compact mode="contained">-</Button>
                    <Button compact mode="contained">+</Button>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>Budget:</Text>
                    <Button compact mode="contained">-</Button>
                    <Button compact mode="contained">+</Button>
                </View>



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
})

export default NewTableScreen


