export default function (userConversation = "", action) {
    if (action.type === "registerConversation") {
        return action.conversationId
    } else {
        return userConversation;
    }
}