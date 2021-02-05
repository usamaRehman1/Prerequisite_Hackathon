import React, { useContext, useEffect, useState } from 'react'
import * as Nat from 'react-native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { BloodContext } from '../../context/bloodBankContext'
import { Card, CardSection } from '../common'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'

export function Home({ navigation }) {

    const { initialState: { users, currUser, authentication }, getFirebaseUsers } = useContext(BloodContext)

    const validationBloodForDonor = () => {
        let checkGroup = "";
        let validGroup = [];

        if (currUser.group.length === 3) {
            checkGroup = currUser.group[0] + currUser.group[1]
        } else {
            checkGroup = currUser.group[0]
        }

        switch (checkGroup) {
            case "O":
                validGroup = ["O", "A", "B", "AB"]
                break;
            case "A":
                validGroup = ["A", "AB"]
                break;
            case "B":
                validGroup = ["B", "AB"]
                break;
            case "AB":
                validGroup = ["AB"]
                break;
            default:
                break;
        }

        return validGroup;
    }

    useEffect(() => {
        database().ref('/').child("users").on("child_added", dataSnap => {
            getFirebaseUsers(dataSnap.val())
        })
    }, [])

    function getDonor() {
        let donor = 0

        for (var i = 0; i < users.length; i++) {
            if (users[i].type === "Donor") {
                donor += 1
            }
        }

        return donor
    }

    function getAccepter() {
        let accepter = 0

        for (var i = 0; i < users.length; i++) {
            if (users[i].type === "Accepter") {
                accepter += 1
            }
        }

        return accepter
    }

    return (
        <Nat.View style={styles.container}>

            <Nat.View style={styles.header}>
            </Nat.View>

            <Nat.View style={styles.infoBox}>

                <Nat.View style={styles.donorBox}>
                    <Nat.Text style={{ fontSize: 25, }}>{getDonor()}</Nat.Text>
                    <Nat.Text style={{ fontSize: 25, }}>Donor</Nat.Text>
                </Nat.View>

                <Nat.View style={styles.recipterBox}>
                    <Nat.Text style={{ fontSize: 25, }}>{getAccepter()}</Nat.Text>
                    <Nat.Text style={{ fontSize: 25, }}>Recipient</Nat.Text>
                </Nat.View>

            </Nat.View>

            <Nat.ScrollView>
                <Nat.View style={styles.userList}>

                    <Nat.View>
                        {
                            (currUser.type === "Donor") ? (
                                <Nat.Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff", padding: 10, }}>You Can Donor</Nat.Text>
                            ) : (
                                    <Nat.Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff", padding: 10, }}>You Can Recipent</Nat.Text>
                                )
                        }
                        <Nat.View style={{ flexDirection: "row" }}>
                            <Nat.Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", padding: 5, }}>Group =</Nat.Text>
                            {
                                validationBloodForDonor().map((reqGroup, ind) => {
                                    return (

                                        <Nat.Text key={ind} style={{ fontSize: 20, fontWeight: "bold", color: "#fff", padding: 5, }}>{`${reqGroup} |`}</Nat.Text>

                                    )
                                })

                            }
                        </Nat.View>
                    </Nat.View>

                    <Card>
                        {
                            users.map((userObj) => {
                                return userObj.uid !== currUser.uid && (
                                    <Nat.View key={userObj.uid} style={styles.detailBox}>

                                        <Nat.View style={styles.groupBox}>
                                            <Nat.Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>{userObj.group}</Nat.Text>
                                        </Nat.View>

                                        <Nat.View style={styles.userInfo}>
                                            <Nat.Text style={{ fontSize: 15, fontWeight: "bold" }}>{userObj.phoneNum}</Nat.Text>
                                            <Nat.Text>{userObj.name}</Nat.Text>
                                            <Nat.Text>{userObj.location}</Nat.Text>
                                        </Nat.View>

                                        <Nat.View style={styles.contactBox} >
                                            <Nat.Text >{userObj.type}</Nat.Text>
                                            <Nat.TouchableOpacity onPress={() => navigation.navigate("Detail", { user: userObj, currUser })}>
                                                <Icon name="call" size={30} style={{ color: "#541328" }} />
                                            </Nat.TouchableOpacity>
                                        </Nat.View>

                                    </Nat.View>

                                )
                            })
                        }
                    </Card>

                </Nat.View>
            </Nat.ScrollView>

        </Nat.View>
    )
}

const styles = Nat.StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "#541328",
        height: 100,
        flexDirection: "row",
    },
    text: {
        color: "#fff",
        fontSize: 25,
        padding: 30,
        justifyContent: "center",
        alignItems: "center"

    },
    infoBox: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#fff",
        marginTop: -70,
        margin: 5,
        backgroundColor: "#fff",
        flexDirection: "row",

    },
    donorBox: {
        width: "50%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    recipterBox: {
        width: "50%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    userList: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#fff",
        margin: 5,
        // backgroundColor: "#fff",
        backgroundColor: "#541328",
        // height: 1000,
    },
    detailBox: {
        flexDirection: "row",
        marginTop: 5,
    },
    groupBox: {
        flex: 1,
        height: 60,
        padding: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "#541328",
    },
    userInfo: {
        flex: 4,
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderRightWidth: 0,
        padding: 10
    },
    contactBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#541328",
        padding: 10,
    }
})

