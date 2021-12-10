import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Button, ScrollView, TouchableOpacity, Platform} from 'react-native';
import {Appbar, Avatar, TextInput, IconButton, RadioButton, Text,Colors} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";



function MyAccountScreen(props) {
    const [gender, setGender] =useState("male")
    const [image, setImage] = useState(null);
    const [visible, setVisible] = useState(true);

    // préparation de l'envoi dans le store
    const [tempAvatarUri,setTempAvatarUri] =useState("")

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.3,
        });
        if (!result.cancelled) {

            setImage(result.uri);
            let dataAvatar = new FormData();
            dataAvatar.append('avatar',{
                uri: result.uri,
                type: 'image/jpeg',
                name: 'avatar.jpg'});

            var rawResponse = await fetch("http://192.168.1.246:3000/uploadAvatar",{
                method: 'POST',
                body: dataAvatar});
            var response = await rawResponse.json();
            console.log(response)
            setTempAvatarUri(response);
        }
    }


    return (   <View style={{flex:1,justifyContent: 'space-evenly'}}>
            <View style={{ flex: 2,
                left: 0,
                width:"100%",
                top: 0,
                justifyContent:"flex-start",}}>
                <Appbar style={{ backgroundColor: "#FFC960", flex:1}}>
                    <Appbar.Content title="Mon profil" style={{marginTop: 20,alignItems:"center", size: 17}} titleStyle={{fontSize: 22, fontWeight: "700", color: "#009788"}} />
                </Appbar>
                <View style={{flex:1,backgroundColor:"#F2F2F2", width:"100%",flexDirection:"row",justifyContent:"space-around"}}>
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
                        onPress={() => props.navigation.navigate('MyAdresses')}
                    />
                    <IconButton
                        icon="calendar-month"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() =>props.navigation.navigate('MyEvents')}
                    />
                    <IconButton
                        icon="human-handsup"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() =>  props.navigation.navigate('MyBuddies')}
                    />
                    <IconButton
                        icon="message"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() =>  props.navigation.navigate('Chat')}
                    />
                </View>
            </View>
            <View style={{flex:7, backgroundColor:"#F2F2F2"}}>
                <ScrollView>
                    <TouchableOpacity onPress={() =>{ pickImage(); setVisible(!visible)}} >
                        <View >{(visible)?
                            <Avatar.Icon size={128} icon="camera" color={'#0E9BA4'} style={{marginTop: 80,marginLeft: 60,backgroundColor: "#FFFFFF"}}/>
                            :<Avatar.Image size={128} source={{ uri: image }} style={{marginTop: 80,marginLeft: 60 }}/>
                        }
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput style={{  textAlign:'center',width:'70%',alignSelf:"center" }}
                        mode="outlined"
                        label="Adresse mail"
                        onChangeText={(val)=> {setInputEmail(val);setInputProgress(inputProgress + 0.01)}}
                        placeholder ="M.eater_75%"
                        activeOutlineColor={"#FF3D00"}
                        outlineColor={'#0E9BA4'}
                    />
                    <IconButton
                        icon="pencil"
                        color={"#FF3D00"}
                        size={35}
                        onPress={() => console.log('Pressed')}
                    />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput style={{  textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               label="Mot de passe"
                               onChangeText={(val)=> {setInputPassword(val);setInputProgress(inputProgress + 0.01)}}
                               placeholder ="hello@matable.com"
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput
                        style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                        mode="outlined"
                        label="Prénom"
                        onChangeText={(val)=> {setFirstName(val);setInputProgress(inputProgress + 0.01)}}
                        placeholder ="Félix"
                        activeOutlineColor={"#FF3D00"}
                        outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               label="Nom de famille"
                               onChangeText={(val)=> {setLastName(val);setInputProgress(inputProgress + 0.01)}}
                               placeholder ="The Cat"
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               label="Adresse Postale"
                               onChangeText={(val)=> {setUserAddress(val); setInputProgress(inputProgress + 0.01)}}
                               placeholder ="56 boulevard Pereire, 75017 Paris"
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               label="Numéro de mobile"
                               onChangeText={(val)=> {setPhone(val); setInputProgress(inputProgress + 0.01)}}
                               placeholder ="+33 6 23 45 67 89"
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput
                        style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                        mode="outlined"
                        label="Préférences Culinaires 1"
                        onChangeText={(val)=> {setUserPreference1(val);setInputProgress(inputProgress + 0.01)}}
                        placeholder ="Italien..."
                        activeOutlineColor={"#FF3D00"}
                        outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               label="Préférences Culinaires 2"
                               onChangeText={(val)=> {setUserPreference2(val);setInputProgress(inputProgress + 0.01)}}
                               placeholder ="Coréen"
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               label="Préférences Culinaires 3"
                               onChangeText={(val)=> {setUserPreference3(val); setInputProgress(inputProgress + 0.01)}}
                               placeholder ="Fast-Food"
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                               mode="outlined"
                               multiline={true}
                               label="Présentez-vous"
                               right={<TextInput.Affix userDesc="/250" />}
                               onChangeText={(val)=> {setUserDesc(val); setInputProgress(inputProgress + 0.01)}}
                               placeholder ="..."
                               activeOutlineColor={"#FF3D00"}
                               outlineColor={'#0E9BA4'}
                    />
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <RadioButton.Group
                        value={gender}
                        onValueChange={newValue => setGender(newValue)}
                    >
                        <View style={{flexDirection:"row",justifyContent:"space-between",width:"70%",alignItems:"center",marginLeft:60}}>
                            <View >
                                <RadioButton value="male" />
                                <Text>Homme</Text>

                            </View>
                            <View >

                                <RadioButton value="female" />
                                <Text>Femme</Text>
                            </View>
                            <View>
                                <RadioButton value="non-binary" />
                                <Text>Non Binaire</Text>
                            </View>
                        </View>
                    </RadioButton.Group>

                </ScrollView>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },viewHeader: {
        flex: 2,
        left: 0,
        width:"100%",
        top: 0,
        justifyContent:"flex-start",


},
});


export default MyAccountScreen;