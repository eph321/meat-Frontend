import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';



function CreateTableScreen(props) {

    return (   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#9b59b6'}}>
                    <Button title="Go to login"
                            onPress={() => props.navigation.navigate('JoinTable')}
                    />
                    <Button title="Go to login"
                            onPress={() => props.navigation.navigate('CreateTable')}
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


export default CreateTableScreen;