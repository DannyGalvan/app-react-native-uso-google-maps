import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { PermissionsContext } from '../context/PermissionsContext';

const Stack = createStackNavigator();

export const  StackNavigation = ()=> {

  const {permissions} = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen/> 
  }

  return (
    <Stack.Navigator
    screenOptions={{
      cardStyle:{
        backgroundColor: 'white',
      }
    }}>
      {
        (permissions.locationStatus === 'granted') 
        ? <Stack.Screen name="Mapas" component={HomeScreen} />  : <Stack.Screen name="Settings" component={SettingsScreen} />
      }
      
        
    </Stack.Navigator>
  );
}