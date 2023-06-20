import React, { useRef, useEffect, useState } from 'react'
import {StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

export const Map = () => {

    const {hasLocation, initialPosition, getCurrentLocation,
         followUserLocation, userLocation, stopFollowUserLocation, routeLines} = useLocation();

    const [showLine, setShowLine] = useState(true)

    const mapViewRef = useRef<MapView>();
    const following = useRef(true);

    useEffect(() => {
        followUserLocation();
        return ()=>{
           stopFollowUserLocation();
        }
    }, [])

    useEffect(() => {
        if (!following.current) {
            return 
        }
        mapViewRef.current?.animateCamera({
            center: {
                latitude: userLocation!.latitude,
                longitude: userLocation!.longitude
            }
        });
    }, [userLocation])

    const centerPosition = async ()=>{
        following.current=true
        const location = await getCurrentLocation();

        mapViewRef.current?.animateCamera({
            center: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        });
    }

    if (!hasLocation) {
        return <LoadingScreen />
    }

  return (
    <>
      <MapView
       ref={(el)=>mapViewRef.current = el!}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       showsUserLocation
       initialRegion={{
         latitude: initialPosition!.latitude,
         longitude: initialPosition!.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
       onTouchStart={()=>following.current=false}
     >
        {
           showLine && <Polyline coordinates={routeLines}
           strokeColor="#f12341"
           strokeWidth={3}/>
        }

          {/* <Marker
            image={require('../assets/custom-marker.png')}
            coordinate={{
                latitude: 14.7084243,
                longitude: -90.5544804,
            }}
            title={'Titulo'}
            description={'descripcion del marcador'}
         /> */}
     </MapView>

     <Fab iconName='locate-outline'
     onPress={()=>centerPosition()}
     style={{position: 'absolute', bottom: 20, right: 20}}/>

    <Fab iconName='brush-outline'
     onPress={()=>setShowLine(value => !value)}
     style={{position: 'absolute', bottom: 80, right: 20}}/>
    </>
  )
}

const styles = StyleSheet.create({
    map: {
      flex: 1,
    },
  });
  

