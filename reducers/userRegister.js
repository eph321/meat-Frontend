export default function(userRegister = {}, action) {
    if(action.type === 'register') {
        return {...userRegister,...action.userData}
    }
    else if ( action.type === 'registerB'){
        return {...userRegister,...action.personalData};
    }
    else if (action.type === 'registerC'){
        return {...userRegister,...action.detailedData};
    }
    else {
        return userRegister;
    }
}