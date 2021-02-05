import React , { useState ,useContext} from 'react'
import * as Nat from 'react-native'
import {Card , CardSection , Button , Spinner } from '../common'
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { BloodContext } from '../../context/bloodBankContext'


export function Account({ navigation }){

    const { initialState : {  currUser } ,getFirebaseUsers , authHandeler , currUserHandler} = useContext(BloodContext)
    
    let [loder , setLoder] = useState(false)
    
    const bloodTypeDetail = [
        { group: "A", text: "Group A has only the A antigen on red cells and B antibody in the plasma" },
        { group: "B", text: "Group B has only the B antigen on red cells and A antibody in the plasma" },
        { group: "AB", text: "Group AB has both A and B antigen on red but neither A nor B antibody in the plasma" },
        { group: "O", text: "Group O has neigther A nor B antigen on red cells but both A and B antibody in the plasma" }
    ]

    function logout() {
        setLoder(true)
        auth().signOut().then(async () =>{
            try {
                await AsyncStorage.removeItem('currUser').then(() => {
                    setLoder(false)
                    // authHandeler(false)
                    // getFirebaseUsers([])
                    // currUserHandler(null)
                    navigation.navigate("SignIn")
                })
            } catch (error) {
                console.log("error =>", error)
            }
        }
        );
    } 


    const renderBtnWithLoder = () => {
        if (loder) {
            return <Spinner />

        } else {
            return (
                <Button  title="Logout" onPress={()=> logout() }/>
            )
        }

    }
    return(
        <Nat.View style={styles.container}>
      
        <Nat.View style={styles.table}>
            <Nat.View style={styles.profile}>
                <Nat.Text style={styles.profileImage} >{currUser.name[0]}</Nat.Text>
            </Nat.View>

            <Card>
                <CardSection>
                    <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Name             :</Nat.Text>
                    <Nat.Text style={{ fontSize: 20, flex: 1 }}>{currUser.name}</Nat.Text>
                </CardSection>

                <CardSection>
                    <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Phone             :</Nat.Text>
                    <Nat.Text style={{ fontSize: 20, flex: 1 }}>{currUser.phoneNum}</Nat.Text>
                </CardSection>

                <CardSection>
                    <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Blood Group   :</Nat.Text>
                    <Nat.Text style={{ fontSize: 20, flex: 1 }}>{currUser.group}</Nat.Text>
                </CardSection>

                <CardSection>
                    <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Type              :</Nat.Text>
                    <Nat.Text style={{ fontSize: 20, flex: 1 }}>{currUser.type}</Nat.Text>
                </CardSection>

                <CardSection>
                    <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Blood Detail   :</Nat.Text>
                    {
                        bloodTypeDetail.map((detailobj, ind) => {
                            return (detailobj.group === String(currUser.group[0])) &&
                                <Nat.Text key={ind} style={{ fontSize: 17, flex: 1 }}>{detailobj.text}</Nat.Text>

                        })
                    }
                </CardSection>

                <CardSection>
                    <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Address         :</Nat.Text>
                    <Nat.Text style={{ fontSize: 20, flex: 1 }}>{currUser.location}</Nat.Text>
                </CardSection>

                
                <CardSection>
                    {renderBtnWithLoder()}
                </CardSection>


            </Card>



        </Nat.View>

    </Nat.View>
    )
}

const styles = Nat.StyleSheet.create({
    container: {
        flex: 1,
    },
    profile:{
        justifyContent:"center",
        alignItems:"center",
    },
    profileImage: {
        padding:20,
        margin:10,
        width:80,
        borderRadius:70,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:30,
        backgroundColor: "#541328",
        color:"#fff",

    },
    table: {
        flex: 1,
        marginTop: 50,
    },
})