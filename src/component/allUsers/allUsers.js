import React , { useContext , useState , useEffect } from 'react'
import * as Nat from 'react-native'
import { BloodContext } from "../../context/bloodBankContext"
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from "../common"
import Icon from 'react-native-vector-icons/Ionicons'


export function AllUsers({ navigation }) {

    const { initialState: { users }, getFirebaseUsers } = useContext(BloodContext)
    console.log("users=>", users)

    let [currUser, setCurrUser] = useState({})
    console.log("CurrUser=>", currUser)

    
    useEffect(() => {
        async function getCurrUser() {
            try {
                const retrievedCurrUser = await AsyncStorage.getItem('currUser');
                const data = JSON.parse(retrievedCurrUser);
                setCurrUser(data)
            } catch (error) {
                console.log("Error insde home=>", error)
            }
        }
        getCurrUser()
    }, [])



    return (
        <Nat.ScrollView>
            <Nat.View style={styles.userList}>

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
    )
}
const styles = Nat.StyleSheet.create({
    userList:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#fff",
        margin: 5,
        backgroundColor: "red",
    },
    detailBox:{
        flexDirection: "row",
        marginTop: 5 ,
    },
    groupBox:{
        flex: 1,
        height:60,
        padding: 5,
        marginTop:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:100,
        backgroundColor: "#541328",
    },
    userInfo:{
        flex:4, 
        borderWidth: 1, 
        borderBottomLeftRadius:20,
        borderRightWidth:0,
        padding: 10
    },
    contactBox:{
        flex: 1, 
        borderWidth: 1, 
        borderColor:"#541328",
        padding: 10,
    }
})