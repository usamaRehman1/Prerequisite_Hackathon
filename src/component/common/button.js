import React from 'react';
import * as Nat from 'react-native'

export function Button ({title , onPress}){
    return (
        <Nat.View style={styles.container}>
            <Nat.TouchableOpacity style={styles.btn} onPress={onPress}>
                <Nat.Text style={styles.text}>{title}</Nat.Text>
            </Nat.TouchableOpacity>
        </Nat.View>
    );
}


export function DisableButton ({title , onPress}){
    return (
        <Nat.View style={styles.container}>
            <Nat.TouchableOpacity style={styles.disBtn} onPress={onPress}>
                <Nat.Text style={styles.disText}>{title}</Nat.Text>
            </Nat.TouchableOpacity>
        </Nat.View>
    );
}



const styles = Nat.StyleSheet.create({
    container:{
        flex:1,
    },
    btn: {
        borderWidth:1,
        borderColor: "#541328",
        borderRadius: 5,
        padding:10,
        margin:10,
        backgroundColor:"#541328",
        textAlign:"center"
    },
    text: {
        fontSize:20,
        color:"#fff",
        textAlign:"center",
        letterSpacing:1,
    },
    disBtn: {
        borderWidth:1,
        borderColor: "#541328",
        borderRadius: 5,
        padding:10,
        margin:10,
        textAlign:"center",
        backgroundColor: "#fff"
    },
    disText: {
        fontSize:20,
        color:"#541328",
        textAlign:"center",
        letterSpacing:1,
    }
})