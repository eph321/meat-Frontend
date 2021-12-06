export default function(userRegister = {}, action) {
    if(action.type == 'Register') {
        return {...userRegistration, action.userData}
        };
    } else {
        return userRegister;
    }
}