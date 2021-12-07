import React, { useState ,useCallback} from 'react';

import { StyleSheet, View} from 'react-native';
import { TextInput,Appbar, Button,ProgressBar,Text,RadioButton} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';


function RegisterScreenB(props) {
    const [inputEmail,setInputEmail] = useState("");
    const [inputPassword,setInputPassword] = useState("");
    const [inputProgress,setInputProgress] = useState(0);
    const [genderValue, setGenderValue] =useState("male")
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
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



    return (<View style={{flex:1,justifyContent: 'space-evenly',}}>

                <Appbar style={styles.bottom}>
                    <Appbar.Content title="Informations Personnelles" style={{textAlign:'center'}}/>
                </Appbar>

            <TextInput
                style={{marginTop: 80, textAlign:'center',width:'70%',alignSelf:"center" }}
                mode="outlined"
                label="Prénom"
                onChangeText={(val)=> {setInputEmail(val);setInputProgress(inputProgress + 0.01)}}
                placeholder ="Félix"
                activeOutlineColor={"#FF3D00"}
                outlineColor={'#0E9BA4'}
            />
            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Nom de famille"
                       onChangeText={(val)=> {setInputPassword(val);setInputProgress(inputProgress + 0.01)}}
                       placeholder ="The Cat"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />
            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Adresse Postale"
                       onChangeText={(val)=> {setInputEmail(val); setInputProgress(inputProgress + 0.01)}}
                       placeholder ="56 boulevard Pereire, 75017 Paris"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />
            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                       mode="outlined"
                       label="Numéro de mobile"
                       onChangeText={(val)=> {setInputEmail(val); setInputProgress(inputProgress + 0.01)}}
                       placeholder ="+33 6 23 45 67 89"
                       activeOutlineColor={"#FF3D00"}
                       outlineColor={'#0E9BA4'}
            />

            <View>
                <View>
                    <Button
                        mode="outlined"
                        color={'#FFC960' }
                        style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#FFFFFF",color:'#FFC960' }}
                        onPress={showDatepicker} icon="calendar" ><Text  Style={{color:'#FFC960'}}>Date de naissance</Text></Button>
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

                <RadioButton.Group
                    genderValue={genderValue}
                    onValueChange={newValue => setGenderValue(newValue)}
                    >
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:"70%",alignItems:"center",marginLeft:60}}>
                    <View >
                        <RadioButton genderValue="male" />
                        <Text>Homme</Text>

                    </View>
                    <View >

                        <RadioButton genderValue="female" />
                        <Text>Femme</Text>
                    </View>
                    <View>
                        <RadioButton genderValue="non-binary" />
                        <Text>Non Binaire</Text>
                    </View>
                    </View>
                </RadioButton.Group>

            <Button
                style={{ padding:10, textAlign:'center',width:'70%',alignSelf:"center",backgroundColor:"#0E9BA4",color:'#FFC960' }}
                mode="contained" onPress={() => props.navigation.navigate('RegisterC')}>
                <Text Style={{color:'#FFC960'}}>Press me</Text>
            </Button>

            <ProgressBar
                style={{ marginTop: 25, textAlign:'center',width:'70%',alignSelf:"center" }}
                progress={inputProgress} color={"#0E9BA4"} />

        </View>
    );
}

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        height:"10%",
        width:"100%",
        top: 20,
        alignItems: 'center',
        justifyContent:"center",
        textAlign:'center',
        backgroundColor:"#FFC960",
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }});


export default RegisterScreenB;


