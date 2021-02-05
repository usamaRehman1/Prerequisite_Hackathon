import React from 'react'
import * as Nat from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export function InputText ({ icon , placeholder , secureTextEntry , value , onChangeText, maxLength, keyboardType, textContentType, numberOfLines, multiline}){
    return(
        <Nat.View style={styles.container}>
            <Icon name={icon} size={30} style={{color:"#541328"}} />
            {
                (placeholder)?(
                    <Nat.TextInput
                       style={styles.input} 
                       placeholder={placeholder}
                       secureTextEntry={secureTextEntry}
                       maxLength={maxLength}
                       keyboardType = {keyboardType}
                       textContentType={textContentType}
                       numberOfLines ={numberOfLines}
                       multiline={multiline}
                       value={value}
                       onChangeText={onChangeText}
                    />
                ) :(
                    <Nat.Text></Nat.Text>
                )
            }
        </Nat.View>
    )

}

const styles = Nat.StyleSheet.create({
    container:{
        height:40,
        flex: 1,
        flexDirection: "row"
    },
    input:{
        color:"#000",
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex:5,
    }
})