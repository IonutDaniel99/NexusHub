import { useState, useEffect } from 'react';

const useGeolocation = () => {
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLatitude(latitude);
					setLongitude(longitude);
				},
				(error) => {
					setError(error.message);
				}
			);
		} else {
			setError('Geolocation is not available in this browser.');
		}
	}, []);

	return { latitude, longitude, error };
};

export default useGeolocation;