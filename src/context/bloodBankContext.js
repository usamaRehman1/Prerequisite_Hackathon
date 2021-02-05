import React, { createContext, useReducer } from 'react'
import { authReducer } from "../reducer/authReducer"

const BLOODBANK_INITIALSTATE = {
    authentication: false,
    bloodGroup: [
        { item: "A+" },
        { item: "A-" },
        { item: "B+" },
        { item: "B-" },
        { item: "O+" },
        { item: "O-" },
        { item: "AB+" },
        { item: "AB-" }
    ],
    userType: ["Donor", "Accepter"],
    users: [],
    currUser : null ,
}

export const BloodContext = createContext(BLOODBANK_INITIALSTATE)

export const BloddBankProvider = ({ children }) => {

    let [state, dispatch] = useReducer(authReducer, BLOODBANK_INITIALSTATE)

    function getFirebaseUsers(data) {
        dispatch({
            type: "ALL_FIREBASE_USERS",
            payload: data,
        })
    }
    
    function authHandeler(boolean) {
        dispatch({
            type: "SET_AUTH",
            payload: boolean,
        })
    }

    
    function currUserHandler(user) {
        dispatch({
            type: "SET_CURRENT_USER",
            payload: user,
        })
    }

    return (
        <BloodContext.Provider value={{ initialState: state, getFirebaseUsers, authHandeler , currUserHandler}}>
            {children}
        </BloodContext.Provider>
    )
}
