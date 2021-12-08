export default function (tableId = "", action) {
    if (action.type == "saveTableId") {
        return action.tableId
    } else {
        return tableId
    }
}