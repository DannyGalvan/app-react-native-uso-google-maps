import React, { useContext } from 'react'
import { Text, View, StyleSheet} from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';
import { BlackButton } from '../components/BlackButton';

export const SettingsScreen = () => {

  const {permissions, askLocationPermission}= useContext(PermissionsContext);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Es necesario el uso de GPS para esta aplicación...</Text>
      <BlackButton title='Permisos' onPress={askLocationPermission}/>
      <Text>{JSON.stringify(permissions,null,5)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title:{
      width: 250,
      fontSize: 18,
      textAlign: 'center'
    }
});

