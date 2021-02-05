export function authReducer (state, action) {
    switch (action.type) {
        case "SET_AUTH":
            return(
                {
                    ...state,
                    authentication: action.payload,
                }
            )
        case "SET_CURRENT_USER":
            return(
                {
                    ...state,
                    currUser: action.payload,
                }
            )
        case "ALL_FIREBASE_USERS":
            return(
                {
                    ...state,
                    users:[...state.users,action.payload]
                }
            )
        default:
            return state
    }
}