import React, { useState } from 'react';
import { StyleSheet, ScrollView, Button, View, Text } from 'react-native';
import { Appbar } from "react-native-paper";

import { MultiSelect } from 'react-native-element-dropdown';
  import { MaterialIcons } from '@expo/vector-icons';

import { connect } from "react-redux";

const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];


function MyEventsScreen(props) {

// TEST LISTE DEROULANTE 
const [value, setValue] = useState(null);



const [selected2, setSelected2] = useState([]);
const [isFocus, setIsFocus] = useState(false);

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
                               

                                <Button title="selected" onPress={() => { console.log(selected);console.log(props.tableId) }} />
                        </View>

{/* TEST LISTE DEROULANTE 2 */}
<View style={{flex:1, width:"100%"}}>
<Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
<MultiSelect
           style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Quel type de cuisine ?"
          searchPlaceholder="Search..."
          value={selected}
          onFocus={() => setIsFocus(true)}
          onChange={item => {
            setSelected2(item);
            setIsFocus(false)
          }}
          renderLeftIcon={() => (
                <MaterialIcons  style={styles.icon} name="restaurant" size={24} color="#0E9BA4" />

          )}
          selectedStyle={styles.selectedStyle}
        />
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
        dropdown: {
                width: "70%",
                height: 50,
                borderColor: 'gray',
                borderWidth: 0.5,
                borderRadius: 8,
                paddingHorizontal: 8,
              },
              placeholderStyle: {
                fontSize: 16,
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
              label: {
                position: 'absolute',
                backgroundColor: '#F2F2F2',
                left: 22,
                top : -8,
                zIndex: 999,
                paddingHorizontal: 8,
                fontSize: 14,
              }
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