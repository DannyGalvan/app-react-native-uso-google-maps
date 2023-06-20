import React from 'react'
import { Text, TouchableOpacity,StyleProp, StyleSheet, ViewStyle } from 'react-native'

interface Props {
    title: string,
    onPress: ()=>void,
    style?: StyleProp<ViewStyle>,

}

export const BlackButton = (props: Props) => {
    const {title, onPress, style = {}} = props;

  return (
    <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.9}
    style={{
      ...style as any,
      ...styles.blackButton,
    }}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    blackButton:{
      height: 45,
      width: 200,
      backgroundColor: 'black',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      textShadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      elevation: 6,
      marginVertical: 20,
    },
    buttonText:{
      color: 'white',
      fontSize: 18,
      
    }

});
