import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';


function HomeScreen(props) {

    return (   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#9b59b6'}}>
            <Button title="Go to results"
                    onPress={() => props.navigation.navigate('Result')}
            />
            <Button title="Go to table"
                    onPress={() => props.navigation.navigate('NewTable')}
            />
            
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default HomeScreen;

