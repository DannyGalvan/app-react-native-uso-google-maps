import {useEffect, useState, useRef} from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([])
    const [initialPosition, setInitialPosition] = useState<Location>();
    const [userLocation, setUserLocation] = useState<Location>();
    const watchId = useRef<number>()
    const isMounted = useRef(true);

    useEffect(() => {
       getCurrentLocation()
       .then(location => {
            if (!isMounted.current) {
                return;
            }
            setInitialPosition(location);
            setUserLocation(location);
            setRouteLines(routes => [...routes, location]);
            setHasLocation(true);
       })
    }, []);

    useEffect(() => {
       isMounted.current = true;
       return ()=>{
        isMounted.current = true;
       }
    }, [])

    const getCurrentLocation = ():Promise<Location>=>{
        return new Promise ((resolve, reject) => {
            Geolocation.getCurrentPosition(
                info => {
                    const {coords} = info;
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                },
                (err) => reject({err}),
                {
                    distanceFilter: 100,
                    enableHighAccuracy: true,
                }
            );
        })
    }

    const followUserLocation = ()=>{
       watchId.current = Geolocation.watchPosition(
            info => {
                if (!isMounted.current) {
                    return;
                }
                const {coords} = info;
                const location:Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }
                setUserLocation(location);
                setRouteLines(routes => [...routes, location]);
            },
            (err) => console.log({err}),
            {
                distanceFilter: 10,
                enableHighAccuracy: true,
                
            }
        );
    }

    const stopFollowUserLocation = ()=>{
        if (watchId.current) {
            Geolocation.clearWatch(watchId.current!)
        }
        
    }

  return {
    hasLocation,
    initialPosition,
    userLocation,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    routeLines
  }
}


