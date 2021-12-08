import * as React from 'react';
import { Appbar } from 'react-native-paper';



export default function Header(props) {
    const navigation = useNavigation();
    return (
      <Appbar.Header style={{backgroundColor: primaryBlack}}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.openDrawer()}
          size={28}
          style={{paddingLeft: 3}}
        />

        <Appbar.Content 
            title={<Text style={{color: textColor, fontSize: 20}}> This is not display </Text>}
            style={{marginLeft: -10}}
        />

        <Appbar.Content
            onPress={() =>
            props.goback ? navigation.goBack() : navigation.navigate('Profile')
            }
            title={
                <TouchableOpacity
                    onPress={() =>
                        props.goback ? navigation.goBack() : navigation.navigate('Profile')
                    }
                    style={{flexDirection: 'row', display: 'flex'}}>
                    <Icon name={'ellipsis-vertical'} size={20} color={'#000'} />
                    <Text style={{color: textColor, fontSize: 21}}>test</Text>
                </TouchableOpacity>
            }
            style={{alignItems: 'flex-end'}}
        />
      </Appbar.Header>
    );
  }
