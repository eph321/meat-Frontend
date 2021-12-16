import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, AsyncStorage, TouchableOpacity} from 'react-native';
import { Text, Appbar, TextInput, Card, Title, Paragraph, IconButton, Button } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { connect } from "react-redux"
import { MultiSelect } from 'react-native-element-dropdown';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import 'intl';
import 'intl/locale-data/jsonp/fr-FR';

const haversine = require('haversine')

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

    const [address,setAddress] = useState("");
    const [visibleList, setVisibleList] = useState(false);
    const [listLabelAddress,setListLabelAddress] = useState([])
    useEffect(()=>{
        const fetchAddress = async (val) => {
            let rawResponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${val.replace('_',"+") }&limit=5`)
            let response = await rawResponse.json();
            let tempList = response.features.map((el) =>{ return {label: el.properties.label, values: el.geometry}})
            setListLabelAddress(tempList)
            console.log(listLabelAddress)


            setVisibleList(true)}
        fetchAddress(address)

    },[address])

    let addresses = listLabelAddress.map((el,i)=>{
        return(<TouchableOpacity key={i}  onPress={() => {handlePressAddress(el); console.log("clic sur addr")}}>
            <Text style={{ margin:5}}>{el.label}</Text>
        </TouchableOpacity>)    })
    let listOfAddresses;

    if (visibleList){
        listOfAddresses = addresses}
    else {
        listOfAddresses = <Text></Text>}

    const handlePressAddress = (el) => {
        setAddress(el.label);
        setUserLocation({ longitude: el.values.coordinates[0], latitude: el.values.coordinates[1] })
        setVisibleList(false)
    }

    const isFocused = useIsFocused();
    const [tableDataList, setTableDataList] = useState([]);
    const [restaurantType, setRestaurantType] = useState([]); // Pour filtre Type Restaurant
    const [dateFilter, setDateFilter] = useState("") // Pour filtre Date
    const [userLocation, setUserLocation] = useState("")


    const [isFocus, setIsFocus] = useState(false); // pour style de la liste déroulante

    // DATE PICKER - input "où"
    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateIsSeleted, setDateIsSelected] = useState(false); // Pour changer le texte dans le button
    // const [userId, setUserId] = useState("")

    /* let formattedDate = date.toLocaleString("fr-FR", options);
    const options = { weekday: "long", day: '2-digit', month: '2-digit', year: '2-digit' } */

    const formattedDate = new Intl.DateTimeFormat('fr-FR', { weekday: "long", day: '2-digit', month: '2-digit', year: '2-digit' }).format(date)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateIsSelected(true);
        setDateFilter(currentDate)
    };

    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
        async function askPermissions() {
            var { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                var location = await Location.getCurrentPositionAsync({});
                setUserLocation({ longitude: location.coords.longitude, latitude: location.coords.latitude })
            }
            props.saveUserLocation(userLocation)
        }
        askPermissions();
    }, []);

    // Affichage des tables existantes 

    useEffect(() => {
        if (isFocused === true) {
            const getTableList = async () => {
                let rawResponse = await fetch(`${herokuIP}/search-table`);
                let response = await rawResponse.json();
                setTableDataList(response.result)
                // console.log(response.result[0].guests.map(item => item._id), "-----------> RESPONSE RESULT")
                // console.log(new Date(), "useeffect")
            };
            getTableList()
        }
    }, [isFocused]
    )

    useEffect(async () => {
        /*  if (restaurantType[0]) {
             if (restaurantType[0].length > 0) {
                 const rawTypeFilterResponse = await fetch(`${herokuIP}/filter-table/${restaurantType}`);
                 const typeFilterResponse = await rawTypeFilterResponse.json();
                 setTableDataList(typeFilterResponse.result)
             } else {
                 let rawResponse = await fetch(`${herokuIP}/search-table`);
                 let response = await rawResponse.json();
                 setTableDataList(response.result)
             }
         } */

        //// FILTRE Quand ?
        /////////////////////PARAMS//////////

        /*   let dateFromFront = () => {
              if (dateFilter) {
                 return( "/" + dateFilter )
              } else {
                return ("")
              }
          }
          let typeFromFront = () => {
              if (restaurantType[0]) {
                  if (restaurantType[0].length > 0) {
                    return ( "/" + restaurantType )
                  } else {
                     return ("")
                  }
              }
          }
  
          const rawDateFilterResponse = await fetch(`${FranckIP}/filter-date${dateFromFront()}${typeFromFront()}`)
          const dateFilterResponse = await rawDateFilterResponse.json();
          console.log(dateFilterResponse.result)
       */
        /*   if (restaurantType[0]) {
              if (restaurantType[0].length > 0 && dateFilter != "") {
                  const rawDataFilterResponse = await fetch(`${FranckIP}/filter-data/${dateFilter}/${restaurantType}`)
                  const dataFilterResponse = await rawDataFilterResponse.json();
                  setTableDataList(dataFilterResponse.result)
              }
          } else  */

        /*  if (restaurantType[0]) {
             if (restaurantType[0].length > 0) {
                 let rawTypeFilterResponse = await fetch(`${FranckIP}/filter-table/${restaurantType}`);
                 let typeFilterResponse = await rawTypeFilterResponse.json();
                 setTableDataList(typeFilterResponse.result)
             }
         } else if (dateFilter) {
             let rawDateFilterResponse = await fetch(`${FranckIP}/filters`, {
                 method: "POST",
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                 body: `date=${dateFilter}&type=${restaurantType}`
             })
             let dateFilterResponse = rawDateFilterResponse.json()
             setTableDataList(dateFilterResponse.result)
         } else if (restaurantType[0].length > 0 && dateFilter != "") {
             const rawDataFilterResponse = await fetch(`${FranckIP}/filter-data/${dateFilter}/${restaurantType}`)
             const dataFilterResponse = await rawDataFilterResponse.json();
             setTableDataList(dataFilterResponse.result)  */

        if (restaurantType[0] || dateFilter !== "") {
            let rawDataFilterResponse = await fetch(`${herokuIP}/filters`, {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `date=${dateFilter}&type=${restaurantType}`
            })
            let dataFilterResponse = await rawDataFilterResponse.json()
            // console.log(dataFilterResponse)
            setTableDataList(dataFilterResponse.result)
        } else {
            let rawResponse = await fetch(`${herokuIP}/search-table`);
            let response = await rawResponse.json();
            setTableDataList(response.result)
        }

    }, [restaurantType, dateFilter])

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

        let dateParse = new Date(e.date)
        // let formattedDate = new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }).format(dateParse)
        let formattedDate = dateParse.toLocaleString("fr-FR", { timeZone: "UTC", weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
        formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)  // Première lettre en Maj sur la card

        var redirect = false
        // console.log(e.guests.map(item => item._id), "--------> E GUEST")
        // console.log(new Date(), "e guest")

        //haversine : calcul de distance

        const start = {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
        }

        const end = {
            latitude: 48.858370,
            longitude: 2.294481
        }

        console.log(haversine(start, end, { unit: "meter" }))


        const onCardClick = () => {
            props.saveTableId(e._id);
            let guestCheck = e.guests.some(el => el.token === props.userToken)
            if (e.planner === props.userToken || guestCheck === true) {
                redirect = true
            }

            if (redirect) {
                props.navigation.navigate("MyTable")
            } else {
                props.navigation.navigate("JoinTable")
            }
        }


        return (
            <Card key={i} style={{ marginBottom: 8 }} onPress={() => { onCardClick() }}>

                <Card.Content>
                    <Title style={{ alignSelf: "center" }}>{e.title}</Title>
                    <Paragraph style={{ alignSelf: "center" }}>{formattedDate}</Paragraph>
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
            {/* <View style={{
                flex: 1,
                left: 0,
                width: "100%",
                top: 0,
                justifyContent: "flex-start",
            }}> */}
                {/* <Appbar style={{ backgroundColor: "#FFC960", flex: 1 }}>
                    <Appbar.Content title="Home Screen" style={{ marginTop: 20, alignItems: "center", size: 17 }} titleStyle={{ fontSize: 22, fontWeight: "700", color: "#009788" }} />

                </Appbar> */}
                <View style={{ flex: 1,marginTop:40, marginBottom:20, backgroundColor: "#FFC960", width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
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
                {/* </View> */}
            </View>
            <View style={{ flex: 2, backgroundColor: "#F2F2F2", justifyContent: "flex-start", marginBottom: 150 }}>

                {/*                <Button
                    style={{ padding: 10, textAlign: 'center', width: '70%', alignSelf: "center", backgroundColor: "#0E9BA4", color: '#FFC960',marginBottom:5 }}
                    mode="contained" onPress={() => { props.navigation.navigate('JoinTable'); }}>
                    <Text Style={{ color: '#FFC960' }}>Go to join</Text>
                </Button>*/}

                <TextInput style={{ textAlign: 'center', width: '70%', marginBottom: 5, alignSelf: "center",marginTop:5 }}
                    mode="outlined"
                    label="Où ?"
                    placeholder="Paris 17"
                    activeOutlineColor={"#FFC960"}
                    outlineColor={'#0E9BA4'}
                    onChangeText={(val)=> setAddress(val)}
                />

                <Button
                    mode="contained"
                    onPress={showDatepicker}
                    style={styles.datePicker}
                    labelStyle={{ color: "black", fontWeight: "400", fontSize: 14 }}
                >
                    {(dateIsSeleted) ? "Le " + formattedDate : "Choisissez une date"}
                </Button>
                <View>
                    {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Button onPress={showDatepicker}> Date </Button>
                    </View> */}
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
            <View style={{ flex: 10 }}>
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
    datePicker: {
        width: "70%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "transparent",
        alignSelf: "center",
        justifyContent: "center"
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


const pickerStyle = {
    inputIOS: {
        color: 'white',
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
    },
    inputAndroid: {
        color: 'white',
    },
    placeholderColor: 'white',
    underline: { borderTopWidth: 0 },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 15,
    },
};


function mapStateToProps(state) {
    return {
        tableId: state.tableId,
        userToken: state.userToken,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveTableId: function (tableId) {
            dispatch({ type: "saveTableId", tableId: tableId })
        },
        saveUserLocation: function (userLocation) {
            dispatch({ type: "saveUserLocation", userLocation: userLocation })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)

