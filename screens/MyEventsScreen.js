import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Button, View, Text } from 'react-native';
import { Appbar, Card, Title, Paragraph, IconButton } from "react-native-paper";

import { connect } from "react-redux";

const FranckLacapsuleIP = "http://172.17.1.118:3000"
const herokuIP = "https://polar-stream-28883.herokuapp.com"
const FranckIP = "http://192.168.1.41:3000"

function MyEventsScreen(props) {

        const [myEventsList, setMyEventsList] = useState([])

        useEffect(async () => {
                var rawResponse = await fetch(`${herokuIP}/my-events/${props.userToken}`);
                var response = await rawResponse.json();
                setMyEventsList(response.result)
        }, [])


        var eventsList = myEventsList.map((e, i) => {

                let dateParse = new Date(e.date)
                let formattedDate = dateParse.toLocaleString("fr-FR", { timeZone: "UTC", weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
                formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)

                return (
                        <Card key={i} style={{ marginBottom: 8 }} onPress={() => { props.navigation.navigate("MyTable"), props.saveTableId(e._id) }}>
                                <Card.Content style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Title style={{ marginBottom: 8 }}>{e.title}</Title>
                                        <Paragraph style={{ fontWeight: "500", marginBottom: 8 }}>{formattedDate}</Paragraph>
                                        <Paragraph style={{ alignSelf: "center" }}>{e.description}</Paragraph>
                                        <Paragraph style={{ fontWeight: "500", alignSelf: "flex-end" }}>M.eaters : {`${e.guests.length + 1}`}</Paragraph>
                                </Card.Content>
                        </Card>
                )
        });


        return (


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
                                        icon="message"
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
                                <Text style={{ fontSize: 26, marginBottom: 20, marginTop: 20 }}>
                                        Mes tables
                                </Text>

                                <ScrollView>
                                        {eventsList}
                                </ScrollView>
                        </View>

                </View>


        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: "#F2F2F2"
        },
        topNavBar: {
                flex: 1.5,
                backgroundColor: "#FFC960",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "flex-end",
        },
        contentView: {
                flex: 11,
                backgroundColor: "#F2F2F2",
                justifyContent: "flex-start",
                marginBottom: 30,
                alignItems: "center",
                width: "100%"
        },
});

function mapDispatchToProps(dispatch) {
        return {
                saveTableId: function (tableId) {
                        dispatch({ type: "saveTableId", tableId: tableId })
                }
        }
}

function mapStateToProps(state) {
        return {
                userToken: state.userToken
        }
}


export default connect(
        mapStateToProps,
        mapDispatchToProps
)(MyEventsScreen);