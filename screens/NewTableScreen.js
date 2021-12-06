import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from 'react-native-elements';

function NewTableScreen() {
    const [culinaryChoice, setCulinaryChoice] = useState("")
    const [ageRangeChoice, setAgeRangeChoice] = useState("")


        // Pour le calendrier Datepicker
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    // Liste déroulante choix cuisine

    const culinaryCascaderOptions = [
        {
            value: 'Italien',
            label: 'Italien',
            children: [
                {
                    value: 'Pastas',
                    label: 'Pastas',
                    children: [
                        {
                            value: 'Végé',
                            label: 'Végé',
                        },
                    ],
                },
            ],
        },
        {
            value: 'Japonais',
            label: 'Japonais',
            children: [
                {
                    value: 'Ramen',
                    label: 'Ramen',
                },
                {
                    value: 'Sushis',
                    label: 'Sushis',
                },
            ],
        },
    ];

    function onCulinaryChange(value) {
        setCulinaryChoice(value)
    }

    // Liste déroulante trannche d'age
    const ageRangeOptions = [
        {
            value: "18-25 ans",
            label: "18-25"
        },
        {
            value: "25-35 ans",
            label: "25-35"
        },
    ]

    function onAgeRangeChange(value) {
        setAgeRangeChoice(value)
    }



    return (

        <View>
            <View>
                <Button>HomeScreen</Button>
                <Button>MyEventsScreen</Button>
                <Button>ProfileScreen</Button>
            </View>

            <View>
                {/* <DatePicker defaultValue={moment('01/01/2021', dateFormatList[0])} format={dateFormatList} /> */}
                <Input placeholder="Titre : Les amis, envie d'un rôti jeudi à midi ?" />
                <Input placeholder="Nom du restaurant" />
                <Input placeholder="Adresse du restaurant" />
                {/* <Cascader
                    defaultValue={['Italien', 'Japonais']}
                    options={culinaryCascaderOptions}
                    onChange={onCulinaryChange} 
                />*/}

                <Input placeholder="Présentation de l'évènement" />
               {/*  <Cascader
                    defaultValue={['18-25 ans', '25-35 ans']}
                    options={ageRangeOptions}
                    onChange={onAgeRangeChange}
                /> */}

            <Text>Meaters:
                <Button>-</Button>
                <Button>+</Button>
            </Text>

            <Text>Budget:
                <Button>-</Button>
                <Button>+</Button>
            </Text>


            <Button> </Button>

            </View>


        </View>

    )
}

export default NewTableScreen