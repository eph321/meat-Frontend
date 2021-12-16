import React, {useEffect, useState} from 'react';
import {StyleSheet, View,  ScrollView, TouchableOpacity, Platform, AsyncStorage,KeyboardAvoidingView} from 'react-native';
import {Appbar, Avatar, TextInput, IconButton, RadioButton, Text,List} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from 'react-native-element-dropdown';
import {MaterialIcons} from "@expo/vector-icons";



function MyAccountScreen(props) {
    const [gender, setGender] =useState("male")
    const [image, setImage] = useState(null);
    const [visible, setVisible] = useState(true);





    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [inputErrorFirstname, setInputErrorFirstname] = useState("");
    const [inputErrorLastname, setInputErrorLastname] = useState("");
    const [inputErrorUserAddress, setInputErrorUserAddress] = useState("");
    const [inputErrorPhone, setInputErrorPhone] = useState("");





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

            var rawResponse = await fetch("https://polar-stream-28883.herokuapp.com/users/uploadAvatar",{
                method: 'POST',
                body: dataAvatar});
            var response = await rawResponse.json();

            setTempAvatarUri(response);
        }
    }

    // Messages d'erreur pour les champs obligatoires
    
    const connexionValidation = () => {
        if (inputEmail && inputEmail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) && inputPassword && inputPassword.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) && firstName && lastName && userAddress && phone && phone.match(/^((\+)33|0)[1-9](\d{2}){4}$/) && dateOfBirth) {
            props.navigation.navigate('RegisterC')
        } else {
        
        if (inputEmail === "") {
            setErrorEmail("*Email requis!")
            } else if (!inputEmail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            setErrorEmail("*Format de l'email invalide!")
            } else {
            setErrorEmail("")
        }
    
        if (inputPassword === "") {
            setErrorPassword("*Mot de passe requis!")
            } else if (!inputPassword.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            setErrorPassword("*Le mot de passe doit avoir au moins 8 charactères, une lettre et un nombre!")
            } else { 
            setErrorPassword("")
        }

        if (firstName === "") {
            setInputErrorFirstname("*Prénom requis!")
        } else {
            setInputErrorFirstname("")
        }

        if (lastName === "") {
            setInputErrorLastname("*Nom de famille requis!")
        } else {
            setInputErrorLastname("")
        }

        if (userAddress === "") {
            setInputErrorUserAddress("*Adresse requise!")
        } else {
            setInputErrorUserAddress("")
        }

        if (phone === "") {
            setInputErrorPhone("*Numéro de mobile requis!")
            } else if (!phone.match(/^((\+)33|0)[1-9](\d{2}){4}$/)) {
            setErrorPassword("*Le numéro de mobile doit comporter 10 chiffres!")
            } else {
            setInputErrorPhone("")
        }
      }   
    }



    const [address,setAddress] = useState("");
    const [visibleList, setVisibleList] = useState(false);
    const [listLabelAddress,setListLabelAddress] = useState([])
    useEffect(()=>{
        const fetchAddress = async (val) => {
            let rawResponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${val.replace('_',"+") }&limit=5`)
            let response = await rawResponse.json();
            let tempList = response.features.map((el) =>{ return {label: el.properties.label, values: el.properties}})
            setListLabelAddress(tempList)
            console.log(listLabelAddress)


            setVisibleList(true)}
        fetchAddress(address)

    },[address])

    let addresses = listLabelAddress.map((el,i)=>{
        return(<TouchableOpacity key={i}  onPress={() => {handlePressAddress(el); }}>
            <Text style={{ margin:5}}>{el.label}</Text>
        </TouchableOpacity>)    })
    let listOfAddresses;

    if (visibleList){
        listOfAddresses = addresses}
    else {
        listOfAddresses = <Text></Text>}

    const handlePressAddress = (el) => {
        setAddress(el.label);
        setVisibleList(false)
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
                        icon="message"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() =>  props.navigation.navigate('MyBuddies')}
                    />
                    <IconButton
                        icon="target-account"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() =>  props.navigation.navigate('BuddyProfile')}
                    />
                    <IconButton
                        icon="exit-to-app"
                        color={'#0E9BA4'}
                        size={25}
                        onPress={() =>  {AsyncStorage.clear();props.navigation.navigate('Login')}}
                    />
                </View>
            </View>
            <View style={{flex:7, backgroundColor:"#F2F2F2"}}>
                <ScrollView>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
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


                    <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                        <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{errorEmail}</Text>
                    </View>  

                    <IconButton
                        icon="pencil"
                        color={"#FF3D00"}
                        size={35}
                        onPress={() => {connexionValidation(); console.log('Pressed')}}
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
                    <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                        <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{errorPassword}</Text>
                    </View>

                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => {connexionValidation(); console.log('Pressed')}}
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
                    <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                        <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorFirstname}</Text>
                    </View>

                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => {connexionValidation(); console.log('Pressed')}}
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
                    <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                        <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorLastname}</Text>
                    </View>  
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => {connexionValidation(); console.log('Pressed')}}
                        />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>

                            <TextInput style={{textAlign:'center',width:'70%',alignSelf:"center" }}
                                       mode="outlined"
                                       value={address}
                                       label="Adresse Postale"
                                       onChangeText={(val)=> setAddress(val)}
                                       placeholder ="56 boulevard Pereire, 75017 Paris"
                                       activeOutlineColor={"#FF3D00"}
                                       outlineColor={'#0E9BA4'}
                            />


                            <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                                <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorUserAddress}</Text>
                            </View>
                                <IconButton
                                    icon="pencil"
                                    color={"#FF3D00"}
                                    size={35}
                                    onPress={() => {setAddress(""); console.log('Pressed')}}
                                />
                    </View>
                        <View >
                        {listOfAddresses}
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
                    <View style={{alignItems: "center", justifyContent: "flex-end", marginTop: "-5%"}}>
                        <Text style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000'}}>{inputErrorPhone}</Text>
                    </View>  
                        <IconButton
                            icon="pencil"
                            color={"#FF3D00"}
                            size={35}
                            onPress={() => {connexionValidation(); console.log('Pressed')}}
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
                        </KeyboardAvoidingView>
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
    },dropDownContainer: {
        backgroundColor: 'white',
        padding: 16,
    },
    viewHeader: {
        flex: 2,
        left: 0,
        width:"100%",
        top: 0,
        justifyContent:"flex-start",

},
    dropdown: {
    height: 50,
        textAlign:'center',width:'70%',alignSelf:"center",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
},
icon: {
    marginRight: 5,
},
label: {
    position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
},
placeholderStyle: {
    fontSize: 16,
},
selectedTextStyle: {
    fontSize: 16,
},
iconStyle: {
    width: 20,
        height: 20,
},
inputSearchStyle: {
    height: 40,
        fontSize: 16,
},
});


export default MyAccountScreen;