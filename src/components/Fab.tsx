import React from 'react'
import { View, StyleProp, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
    iconName: string,
    onPress: ()=>void,
    style?: StyleProp<ViewStyle>,
}

export const Fab = (props:Props) => {
    const {iconName, onPress, style} = props;


  return (
    <View style={{...style as any}}>
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.blackButton}>
            <Icon name={iconName} size={35} color='white'/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    blackButton:{
        zIndex: 9999,
        height: 50,
        width: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    }
});
