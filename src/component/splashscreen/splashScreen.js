import React, { useState, useEffect, useContext } from "react"
import * as Nat from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { BloodContext } from '../../context/bloodBankContext'



export function SplashScreen({ navigation }) {

    const { authHandeler, currUserHandler } = useContext(BloodContext)

    useEffect(() => {
        async function getCurrUser() {
            try {
                const retrievedCurrUser = await AsyncStorage.getItem('currUser');
                const data = JSON.parse(retrievedCurrUser);
                console.log("data",data)

                let promise = new Promise(function (resolve, reject) {

                    setTimeout(() => {
                        if (data !== null) {
                            resolve(data);
                        } else {
                            reject(data);
                            navigation.navigate("SignIn")
                        }
                    }, 5000);

                })

                let showData = await promise;
                // console.log("showData => ", showData)

                if (showData !== null) {
                    authHandeler(true)
                    currUserHandler(showData)
                    navigation.navigate("Home")
                }

            } catch (error) {
                console.log(error)
            }
        }
        getCurrUser()
    }, [])


    return (
        <Nat.View style={{ height: "100%", width: "100%", backgroundColor: "#fff", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Nat.View style={{ marginTop: 200 }}>
                <Nat.Image source={require("../../images/logo.png")} style={{ width: 150, height: 150 }} />
            </Nat.View>
            <Nat.View style={{ marginTop: 200 }}>
                <Nat.Text style={{ textAlign: "center", fontSize: 20, color: "black" }}>From</Nat.Text>
                <Nat.Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: "#541328" }}>Muhammad Usama</Nat.Text>
            </Nat.View>

        </Nat.View>
    )
}