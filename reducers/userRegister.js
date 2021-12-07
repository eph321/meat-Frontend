export default function(userRegister = {}, action) {
    if(action.type === 'Register') {
        return {...userRegister,userdata: action.userData};
        }
    else {
        return userRegister;
    }
}