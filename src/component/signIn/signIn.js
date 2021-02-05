import React, { useState , useContext } from 'react'
import * as Nat from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { Card, CardSection, InputText, Button, DisableButton, Spinner } from '../common'
import { BloodContext } from '../../context/bloodBankContext'

export function SignIn({ navigation }) {

    const { initialState : { authentication } , authHandeler , currUserHandler} = useContext(BloodContext)

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [loder, setLoder] = useState(false)

    function signIn(){
        setLoder(true)

        if(validation()){
            
            auth().signInWithEmailAndPassword(email, password).then((response) => {
                authHandeler(true)
                database().ref('/').child(`users/${response.user.uid}`).once('value',async (data) => {
                    let curr_user = data.val()
                    try {
                        await AsyncStorage.setItem('currUser', JSON.stringify(curr_user));
                        setDefaultState()
                        currUserHandler(curr_user)
                        alert("SignIn successfully")
                        navigation.navigate("Home")
                    } catch (error) {
                        console.log("error =>", error)
                        // Error saving data
                    }
                })
            }).catch((error) => {
                setDefaultState()
                alert(error.message)
                alert("error=>", error.message)
            })
        }else{
            setLoder(false)
        }
        
    }

    function validation (){

        let flag = true;
        let rgxEmail = /^([a-zA-Z0-9_\.])+\@(([a-z]{5,10})+\.)+([a-z]{2,4})/;
        let rgxPass = /^([a-zA-Z0-9_\.]{6,8})/;

        if (email.match(rgxEmail)) {
            setEmail(email)
        } else {
            alert("Incorrect Email")
            flag = false;
        }

        if (password.match(rgxPass)) {
            setPassword(password)
        } else {
            alert("incorrect Password")
            flag = false;
        }

        return flag
    }


    function setDefaultState (){
        setLoder(false)
        setEmail("")
        setPassword("")
    }

    function renderBtnWithLoder(){
        if (loder) {
            return <Spinner />

        } else {
            return (
                <Button
                    title="SINGIN"
                    onPress={() => signIn()}
                />
            )
        }

    }

    return (
        <Nat.View>

            <Nat.View style={styles.header}>
                <Nat.Image source={require("../../images/logo.png")} style={{width:200, height:200}} />
            </Nat.View>

            <Nat.View style={styles.body}>

                <CardSection>
                    <InputText
                        icon="mail"
                        placeholder="enter email"
                        textContentType="emailAddress"
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </CardSection>
                <CardSection>
                    <InputText
                        icon="lock-closed"
                        placeholder="enter password"
                        textContentType="password"
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                </CardSection>

                <CardSection>
                    <DisableButton
                        title="SINGUP"
                        onPress={() => navigation.navigate("SignUp")}
                    />

                    {renderBtnWithLoder()}

                </CardSection>

            </Nat.View>

        </Nat.View>
    )
}

const styles = Nat.StyleSheet.create({
    header: {
        backgroundColor: "#541328",
        height: 300,
        justifyContent:"center",
        alignItems:"center",
    },
    body: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#fff",
        marginTop: -50,
        margin: 5,
        backgroundColor: "#fff",
    }

})