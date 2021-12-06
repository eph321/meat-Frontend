import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';



function HomeScreen(props) {

    return (   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#9b59b6'}}>
            <Button title="Go to login"
                    onPress={() => props.navigation.navigate('Login')}
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