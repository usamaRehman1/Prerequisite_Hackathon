import React from 'react';
import * as Nat from 'react-native';

export function Card ({ children }){
    return(
        <Nat.View style={styles.cardContainer}>
            {children}
        </Nat.View>
    )
}

const styles = Nat.StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderRadius: 1, 
        borderColor:"#d9d9d9",
        borderBottomWidth:0,
        shadowColor: "#000000",
        backgroundColor: "#fff",
        shadowOpacity:0.2,
        shadowRadius:2,
        padding:10,
    }
})