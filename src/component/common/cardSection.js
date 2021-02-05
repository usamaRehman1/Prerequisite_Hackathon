import React from 'react'
import * as Nat from 'react-native'

export function CardSection ({ children }) {

    return (
        <Nat.View style={styles.cardSectionContainer}>
            {children}
        </Nat.View>
    )
}

const styles = Nat.StyleSheet.create({
    cardSectionContainer: {
        marginTop:5,
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: "#fff",
        justifyContent: "center",
        flexDirection: "row",
        borderColor: "#d9d9d9",
        position: "relative",
    }
})