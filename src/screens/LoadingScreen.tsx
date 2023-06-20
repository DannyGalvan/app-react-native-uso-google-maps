import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
        <Text>Loading Screen...</Text>
        <ActivityIndicator size='large' color={'blue'}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});

