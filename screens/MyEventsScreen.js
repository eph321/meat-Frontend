import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Button, View, Text } from 'react-native';
import { Appbar, Card, Title, Paragraph } from "react-native-paper";

import { connect } from "react-redux";

const herokuIP = "https://polar-stream-28883.herokuapp.com"

function MyEventsScreen(props) {

        const [tableDataList, setTableDataList] = useState([""])

        useEffect(async () => {
                var rawResponse = await fetch(`${herokuIP}/search-table`);
                var response = await rawResponse.json();
                setTableDataList(response.result)
        }, [])

        var tableList = tableDataList.map((e, i) => {


                return (
                        <Card key={i} style={{ marginBottom: 8 }} onPress={() =>{ props.navigation.navigate("MyTable"), props.onCardClick(e._id) }}>
                                <Card.Content style={{alignItems:"center", justifyContent:"center"}}>
                                        <Title>{e.title}</Title>
                                        <Paragraph style={{alignSelf:"center"}}>{e.description}</Paragraph>
                                        <Paragraph>{e.date}</Paragraph>
                                </Card.Content>
                        </Card>
                )
        });


        return (


                <View style={styles.container}>
                        <View style={styles.viewHeader}>
                                <Appbar style={{ flex: 1, backgroundColor: "#FFC960", height: 20 }}>
                                        <Appbar.Content title="My events" style={{ textAlign: 'center', marginTop: 30 }} />
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
                        <Text style={{ fontSize: 26, marginBottom: 20, marginTop: 20 }}>
                                Mes participations
                        </Text>

                        <ScrollView style={{ width: "70%" }}>

                                <View style={{ justifyContent: "center" }}>

                                        {tableList}

                                </View>

                        </ScrollView>






                </View>
        );
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
});

function mapDispatchToProps(dispatch) {
        return {
            onCardClick: function (tableId) {
                dispatch({ type: "saveTableId", tableId: tableId })
            }
        }
    }


export default connect(
        null,
        mapDispatchToProps
)(MyEventsScreen);