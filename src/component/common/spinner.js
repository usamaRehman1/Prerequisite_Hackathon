import React from "react";
import * as Nat from 'react-native'

export function Spinner (){
  return(
    <Nat.View style={[styles.container, styles.horizontal]}>
      <Nat.ActivityIndicator size="large" color="#541328" />
    </Nat.View>
  )
};

const styles = Nat.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
