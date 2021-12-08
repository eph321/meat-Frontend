export default function (userToken = "", action) {
    if (action.type === "saveUserToken") {
        return action.userToken
    } else if (action.type=== "registerToken")
    {
        return action.userToken
    } else {
        return userToken;
    }
}