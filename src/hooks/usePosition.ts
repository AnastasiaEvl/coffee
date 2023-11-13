import { useState, useEffect, SetStateAction} from 'react';

export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);


    const onError = (error: { message: SetStateAction<null>; }) => {
        setError(error.message);
    };
    useEffect(() => {
        const geo = navigator.geolocation
        navigator.geolocation.getCurrentPosition(function(position) {
            setPosition({latitude:position.coords.latitude, longitude:position.coords.longitude})
        })
    }, []);

    return {position, error};
}
