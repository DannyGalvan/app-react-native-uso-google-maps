import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { PermissionsProvider } from './src/context/PermissionsContext';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const AppState = ({children}: any) =>{
  return (
    <PermissionsProvider>
      {
        children
      }
    </PermissionsProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigation />
      </AppState>
    </NavigationContainer>
  )
}

export default App

