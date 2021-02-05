import React from 'react'
import * as Nat from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


export function Requests(){
    return(
        <Nat.View style={styles.container}>
            <Nat.View style={styles.card}>
                <Nat.View style={styles.cardHeader}>
                    <Nat.Text  style={styles.bloodGroop}>AB+</Nat.Text>
                    </Nat.View>
                <Nat.View style={styles.CardInfo}>
                    <Nat.Text><Icon name="person" size={25}  style={{color:"#541328"}} />Muhammad Usama</Nat.Text>
                    <Nat.Text><Icon name="call" size={25}  style={{color:"#541328"}} />03123456789</Nat.Text>
                    <Nat.Text><Icon name="location" size={25}  style={{color:"#541328"}} />Karachi</Nat.Text>
                    <Nat.Text style={{fontSize:20}}><Icon name="chatbubble" size={25}  style={{color:"#541328"}} />I want blood urgently</Nat.Text>
                </Nat.View>

                </Nat.View>


                <Nat.View style={styles.card}>
                <Nat.View style={styles.cardHeader}>
                    <Nat.Text  style={styles.bloodGroop}>AB+</Nat.Text>
                    </Nat.View>
                <Nat.View style={styles.CardInfo}>
                    <Nat.Text><Icon name="person" size={25}  style={{color:"#541328"}} />Muhammad Usama</Nat.Text>
                    <Nat.Text><Icon name="call" size={25}  style={{color:"#541328"}} />03123456789</Nat.Text>
                    <Nat.Text><Icon name="location" size={25}  style={{color:"#541328"}} />Karachi</Nat.Text>
                    <Nat.Text style={{fontSize:20}}><Icon name="chatbubble" size={25}  style={{color:"#541328"}} />I want blood urgently</Nat.Text>
                </Nat.View>

                </Nat.View>
        </Nat.View>
    )
}
const styles = Nat.StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#d6d6d6",
    },
    card:{
        margin:10,
        borderWidth:1,
        borderColor:"#541328",
        borderRadius:5,
        backgroundColor:"#fff",
        padding:5,

    },
    cardHeader:{
        padding:10,
        flexDirection:"row",
    },
    bloodGroop:{
        flex: 1,
        fontSize:25, 
        fontWeight:"bold", 
        textAlign:"center", 
        padding: 10,
        borderRadius:100,
        backgroundColor: "#541328",
        color:"#fff",

    },
    CardInfo:{
    }

})