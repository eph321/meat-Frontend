import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage } from 'react-native';
import { Text, Appbar, TextInput, Card, Title, Paragraph, IconButton, Button } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { connect } from "react-redux"
import { MultiSelect } from 'react-native-element-dropdown';

const FranckLacapsuleIP = "http://172.17.1.118:3000"
const FranckIP = "http://192.168.1.41:3000"
const herokuIP = "https://polar-stream-28883.herokuapp.com"

const restaurantTypeList = [
    { label: 'Italien', value: 'Italien' },
    { label: 'Japonais', value: 'Japonais' },
    { label: 'Fast-food', value: 'Fast-food' },
    { label: 'Chinois', value: 'Chinois' },
    { label: 'Mexicain', value: 'Mexicain' },
    { label: 'Indien', value: 'Indien' },
    { label: 'Coréen', value: 'Coréen' },
    { label: 'Africain', value: 'Africain' },
]

function HomeScreen(props) {

    const [tableDataList, setTableDataList] = useState([])
    const [restaurantType, setRestaurantType] = useState([]);
    const [isFocus, setIsFocus] = useState(false); // pour style de la liste déroulante

    // DATE PICKER - input "où"
    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateValue, setDateValue] = useState(false);

    const formattedDate = date.toLocaleString("fr-FR", options);
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit' }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateValue(true);
        console.log(formattedDate)
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
        var rawResponse = await fetch(`${herokuIP}/search-table`);
        var response = await rawResponse.json();
        setTableDataList(response.result)
    }, [] //(restaurantType.length===0)?tableDataList:undefined
    )

    useEffect(async () => {
        if (restaurantType[0]) {
            if (restaurantType[0].length > 0) {
                const rawFilteredResponse = await fetch(`${herokuIP}/filter-table/${restaurantType}`);
                const filteredResponse = await rawFilteredResponse.json();
                setTableDataList(filteredResponse.result)
            } else {
                var rawResponse = await fetch(`${herokuIP}/search-table`);
                var response = await rawResponse.json();
                setTableDataList(response.result)
            }
        }
    }, [restaurantType])

    // Conditions du useEffect
    // lorsque setRestaurantType([item]) : ne détecte pas changement de l'état restaurantType
    // si suppression des filtres après en avoir mis, restaurantType.length = 1 car dans la liste déroulante "item" ajoute un array à l'état restaurantType (array)
    // à l'initialisation, avant de filtrer, restaurantType.length = 0 (array vide)


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
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcons style={{ marginRight: 5 }} name="table-furniture" size={24} color="#0E9BA4" />
                            <View>
                                <Text>Restaurant</Text>
                                <Paragraph style={{ color: "#0E9BA4", fontWeight: "bold" }}>{e.placeName}</Paragraph>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons style={{ marginRight: 5 }} name="restaurant" size={24} color="#0E9BA4" />
                            <Paragraph>{e.placeType}</Paragraph>
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
            <View style={{
                flex: 2,
                left: 0,
                width: "100%",
                top: 0,
                justifyContent: "flex-start",
            }}>
                <Appbar style={{ backgroundColor: "#FFC960", flex: 1 }}>
                    <Appbar.Content title="Home Screen" style={{ marginTop: 20, alignItems: "center", size: 17 }} titleStyle={{ fontSize: 22, fontWeight: "700", color: "#009788" }} />

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
                        icon="message"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() => props.navigation.navigate('MyBuddies')}
                    />
                    <IconButton
                        icon="calendar-month"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() => props.navigation.navigate('MyEvents')}
                    />
                    <IconButton
                        icon="account"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() => props.navigation.navigate('MyAccount')}
                    />
                </View>
            </View>
            <View style={{ flex: 2, backgroundColor: "#F2F2F2", justifyContent: "flex-start", marginBottom: 150 }}>

                {/*                <Button
                    style={{ padding: 10, textAlign: 'center', width: '70%', alignSelf: "center", backgroundColor: "#0E9BA4", color: '#FFC960',marginBottom:5 }}
                    mode="contained" onPress={() => { props.navigation.navigate('JoinTable'); }}>
                    <Text Style={{ color: '#FFC960' }}>Go to join</Text>
                </Button>*/}
                <TextInput style={{ textAlign: 'center', width: '70%', alignSelf: "center", marginBottom: 5 }}
                    mode="outlined"
                    label="Où ?"
                    placeholder="Paris 17"
                    activeOutlineColor={"#FF3D00"}
                    outlineColor={'#0E9BA4'}
                />
                <Text style={{ marginTop: 15, height: 30, alignSelf: "center" }}>{(dateValue) ? "Le "+formattedDate : "Choisissez une date"} </Text>
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

                <View style={{ alignItems: "center", marginTop: 12, marginBottom: 8 }}>
                    <MultiSelect
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        data={restaurantTypeList}
                        labelField="label"
                        valueField="value"
                        placeholder="Quel type de cuisine ?"
                        searchPlaceholder="Search..."
                        /* value={restaurantType} */
                        onChange={item => {
                            setRestaurantType([item]);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <MaterialIcons style={styles.icon} name="restaurant" size={24} color="#0E9BA4" />

                        )}
                        selectedStyle={styles.selectedStyle}
                    />
                </View>

            </View>
            <View style={{ flex: 3, height: 100 }}>
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
    dropdown: {
        width: "70%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "transparent",
    },
    placeholderStyle: {
        fontSize: 16,
        textAlign: "center",
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
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

