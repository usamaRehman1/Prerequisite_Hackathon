import React, { useState, useContext } from 'react'
import * as Nat from 'react-native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { BloodContext } from '../../context/bloodBankContext'
import { Card, CardSection, InputText, Button, DisableButton, Spinner } from '../common'

export function SignUp({ navigation }) {

    let { initialState: { bloodGroup, userType } } = useContext(BloodContext)

    let [name, setName] = useState('')
    let [phoneNum, setPhoneNum] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [location, setLocation] = useState('')
    let [loder, setLoder] = useState(false)
    const [gender, setGender] = useState("__select gender__");
    const [group, setGroup] = useState("__select blood group__")
    const [type, setType] = useState("__select blood Type__")

    const signUp = () => {
        setLoder(true)

        if (validation()) {
            let newUser = { name, email, password, phoneNum, location, gender, group, type }

            auth().createUserWithEmailAndPassword(email, password).then((response) => {
                // console.log("Response=>", response.user.uid)
                let newUserWithUid = { ...newUser, uid: response.user.uid }

                database().ref('/').child(`users/${response.user.uid}`).set(newUserWithUid)
                    .then(() => {
                        setDefaultState()
                        alert("User regestered successfully")
                        navigation.navigate("SignIn")
                    })

            }).catch((error) => {
                setDefaultState()
                console.log("Error=>", error.message)
            })

        }else{
            setLoder(false)
        }
    }


    const setDefaultState = () => {
        setLoder(false)
        setName("")
        setEmail("")
        setPassword("")
        setPhoneNum("")
        setLocation("")
        setGender("__select gender__")
        setGroup("__select blood group__")
    }

    const validation = () => {

        let flag = true;

        let rgxName = /^([a-zA-z])/;
        let rgxEmail = /^([a-zA-Z0-9_\.])+\@(([a-z]{5,10})+\.)+([a-z]{2,4})/;
        let rgxPass = /^([a-zA-Z0-9_\.]{6,8})/;
        let rgxCell = /^([0-9]{11})/;

        if (name.match(rgxName)) {
            setName(name)
        } else {
            alert("Incorrect Name")
            flag = false;
        }

        if (phoneNum.match(rgxCell)) {
            setPhoneNum(phoneNum)
        } else {
            alert("incorect Cell No.")
            flag = false;
        }

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

        if (gender !== "__select gender__") {
            setGender(gender)
        } else {
            alert('Please enter gender')
            flag = false;
        }

        if (group !== "__select blood group__") {
            setGroup(group)
        } else {
            alert("pleaes enter group")
            flag = false;
        }

        if (type !== "__select blood Type__") {
            setType(type)
        } else {
            alert("pleas select type")
            flag = false;
        }


        return flag

    }

    const renderBtnWithLoder = () => {
        if (loder) {
            return <Spinner />

        } else {
            return (
                <Button
                    title="SINGUP"
                    onPress={() => signUp()}
                />
            )
        }

    }

    return (
        <Nat.View>

            <Nat.View style={styles.header}>
                <Nat.Text style={styles.text}>Registor Now</Nat.Text>
            </Nat.View>

            <Nat.View style={styles.body}>

                <CardSection>
                    <InputText
                        icon="person"
                        placeholder="enter name"
                        onChangeText={text => setName(text)}
                        value={name}
                    />
                </CardSection>
                <CardSection>
                    <InputText
                        icon="call"
                        placeholder="enter phone"
                        maxLength={11}
                        keyboardType='numeric'
                        onChangeText={text => setPhoneNum(text)}
                        value={phoneNum}
                    />
                </CardSection>
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
                        secureTextEntry
                        placeholder="enter password"
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                </CardSection>
                <CardSection>
                    <InputText
                        icon="location"
                        placeholder="enter address"
                        onChangeText={text => setLocation(text)}
                        value={location}
                    />
                </CardSection>


                <CardSection>
                    <InputText
                        icon="person"
                    />
                    <Nat.Picker
                        style={{ flex: 5 }}
                        selectedValue={gender}
                        onValueChange={(genderValue, itemIndex) => setGender(genderValue)}
                    >
                        <Nat.Picker.Item label="__select gender__" value="__select gender__" />
                        {
                            ["Male", "Female"].map((gen, ind) => {
                                return <Nat.Picker.Item label={gen} value={gen} key={ind} />
                            })
                        }
                    </Nat.Picker>
                </CardSection>

                <CardSection>
                    <InputText
                        icon="fitness"
                    />
                    <Nat.Picker
                        style={{ flex: 5 }}
                        selectedValue={group}
                        onValueChange={bloodValue => setGroup(bloodValue)}
                    >
                        <Nat.Picker.Item label="__select blood group__" value="__select blood group__" />
                        {
                            bloodGroup.map((groupObj, ind) => {
                                return <Nat.Picker.Item label={groupObj.item} value={groupObj.item} key={ind} />
                            })
                        }
                    </Nat.Picker>
                </CardSection>


                <CardSection>
                    <InputText
                        icon="flask"
                    />
                    <Nat.Picker
                        style={{ flex: 5 }}
                        selectedValue={type}
                        onValueChange={(genderValue, itemIndex) => setType(genderValue)}
                    >
                        <Nat.Picker.Item label="__select blood Type__" value="__select blood Type__" />
                        {
                            userType.map((val, ind) => {
                                return <Nat.Picker.Item label={val} value={val} key={ind} />
                            })
                        }
                    </Nat.Picker>
                </CardSection>

                <CardSection>
                    <DisableButton
                        title="SINGIN"
                        onPress={() => navigation.navigate("SignIn")}
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
        height: 200,
    },
    text: {
        color: "#fff",
        fontSize: 30,
        padding: 50,
        justifyContent: "center",
        alignItems: "center"
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
