import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Appbar } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select';

import { connect } from "react-redux";

function MyEventsScreen(props) {

        // TEST liste déroulante
        const [selected, setSelected] = useState("")
        const typeList = [
                { label: 'Italien', value: 'italien' },
                { label: 'Japonais', value: 'japonais' },
                { label: 'Fast-food', value: 'fast-food' },
        ]

        return (
                <View style={styles.container}>
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

                        {/* TEST LISTE DEROULANTE */}

                        <View style={{ flex: 4, justifyContent: "center" }}>
                                <RNPickerSelect
                                        onValueChange={(value) => { setSelected(value)}}
                                        items={typeList}
                                />
                                <Button title="selected" onPress={() => { console.log(selected);console.log(props.tableId) }} />
                        </View>
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

function mapStateToProps(state) {
        return {
                tableId: state.tableId
        }
}



export default connect(
        mapStateToProps,
        null
    )( MyEventsScreen);