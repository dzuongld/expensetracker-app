export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT': 
            return {}
        default:
            return state; //if not login or logout, the reducer does not care
    }
}