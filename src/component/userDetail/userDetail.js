import React, { useState } from "react"
import * as Nat from 'react-native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { Card, CardSection, Button,InputText ,Spinner} from '../common'
import Icon from 'react-native-vector-icons/Ionicons'

export function UserDetail({ route, navigation }){

    let { user, currUser } = route.params;
    console.log("user=>", user)
    console.log("currUser", currUser)

    let [request, setRequest] = useState(false)

    let [date , setdate] = useState('')

    let [des , setDes] = useState('')
    let [loder , setLoder] = useState(false)

    const bloodTypeDetail = [
        { group: "A", text: "Group A has only the A antigen on red cells and B antibody in the plasma" },
        { group: "B", text: "Group B has only the B antigen on red cells and A antibody in the plasma" },
        { group: "AB", text: "Group AB has both A and B antigen on red but neither A nor B antibody in the plasma" },
        { group: "O", text: "Group O has neigther A nor B antigen on red cells but both A and B antibody in the plasma" }
    ]

    
    function reqSubmit (){
        setLoder(true)

        let requestUser = {uid : currUser.uid, date, des}

        database().ref('/').child(`request/${murgeUid()}/${currUser.uid}`).set(requestUser)
        .then(() => {
            setDefaultState()
            alert("User requsest successfully submited")
        })
    }

    const setDefaultState = () => {
        setLoder(false)
        setdate("")
        setDes("")
        setRequest(false)
    }


    function murgeUid (){
        if(user.uid > currUser.uid){
            return currUser.uid + user.uid 

        }else{
            return user.uid + currUser.uid
        }
    }

    
    function renderBtnWithLoder (){
        if (loder) {
            return <Spinner />

        } else {
            return (
                <Button
                    title="Request Submited"
                    onPress = {() => reqSubmit()}
                />
            )
        }

    }

    if (request) {
        return (
            <Card>
                <CardSection>
                    <Icon name="person" size={25} style={{color:"#541328", marginRight :15}} />
                    <Nat.Text style={{flex:1,fontSize:20, fontWeight:"bold"}}>{user.name}</Nat.Text>
                </CardSection>

                
                <CardSection>
                <Icon name="fitness" size={25} style={{color:"#541328", marginRight :15}} />

                    <Nat.Text style={{flex:1,fontSize:20,}}>{user.group}</Nat.Text>
                </CardSection>

                <CardSection>
                <Icon name="call" size={25} style={{color:"#541328", marginRight :15}} />

                    <Nat.Text style={{flex:1,fontSize:20, }}>{user.phoneNum}</Nat.Text>
                </CardSection>

                <CardSection>
                    <Icon name="calendar" size={25} style={{color:"#541328", marginRight :15}} />
                    <Nat.Text style={{flex:1,fontSize:20, }}>{date}</Nat.Text>
                </CardSection>

                <CardSection>
                    
                    <InputText
                        placeholder="description about blood...." 
                        multiline={true}
                        numberOfLines={10}
                        value={des}
                        onChangeText={text => setDes(text)}
                    />

                </CardSection>

                
                <CardSection>

                    {renderBtnWithLoder()}

                </CardSection>

            </Card>

        )
    }

    return (
        <Nat.View style={styles.container}>
            {/* <Nat.View style={styles.detail}>
                <Nat.Text style={{fontSize: 20 , fontWeight:"bold", textAlign:"justify"}}>here we discuss about user blood and we differentiate user donation and accepter blood.</Nat.Text>
            </Nat.View> */}
            <Nat.View style={styles.table}>
                <Nat.Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", margin: 20, textTransform:"uppercase" }}>{`${user.name} Detail`}</Nat.Text>

                <Card>
                    <CardSection>
                        <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Name             :</Nat.Text>
                        <Nat.Text style={{ fontSize: 20, flex: 1 }}>{user.name}</Nat.Text>
                    </CardSection>

                    <CardSection>
                        <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Phone             :</Nat.Text>
                        <Nat.Text style={{ fontSize: 20, flex: 1 }}>{user.phoneNum}</Nat.Text>
                    </CardSection>

                    <CardSection>
                        <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Blood Group   :</Nat.Text>
                        <Nat.Text style={{ fontSize: 20, flex: 1 }}>{user.group}</Nat.Text>
                    </CardSection>

                    <CardSection>
                        <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Type              :</Nat.Text>
                        <Nat.Text style={{ fontSize: 20, flex: 1 }}>{user.type}</Nat.Text>
                    </CardSection>

                    <CardSection>
                        <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Blood Detail   :</Nat.Text>
                        {
                            bloodTypeDetail.map((detailobj, ind) => {
                                return (detailobj.group === String(user.group[0])) &&
                                    <Nat.Text key={ind} style={{ fontSize: 17, flex: 1 }}>{detailobj.text}</Nat.Text>

                            })
                        }
                    </CardSection>

                    <CardSection>
                        <Nat.Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>Address         :</Nat.Text>
                        <Nat.Text style={{ fontSize: 20, flex: 1 }}>{user.location}</Nat.Text>
                    </CardSection>

                    <CardSection>
                        <Button
                            title={`Request  ${user.name}`}
                            onPress={() => {
                                setRequest(true)
                                setdate( new Date().toDateString())
                                navigation.setOptions({ title: 'Make a request for Blood' })
                            }}
                        />
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
    table: {
        flex: 1,
        marginTop: 50,
    },
})