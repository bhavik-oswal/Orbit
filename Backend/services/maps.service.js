import axios from 'axios';

export const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    console.log("URL:", url);

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        throw new Error(`Failed to fetch coordinates: ${error.message}`);
    }
};

export const calculateDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'OK') {
                return {
                    distance: element.distance.text,
                    duration: element.duration.text
                };
            } else {
                throw new Error('Unable to calculate distance and time');
            }
        } else {
            throw new Error('Failed to fetch distance and time');
        }
    } catch (error) {
        throw new Error(`Error calculating distance and time: ${error.message}`);
    }
};

export const getAutoSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required for autocomplete suggestions');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Failed to fetch autocomplete suggestions');
        }
    } catch (error) {
        throw new Error(`Error fetching autocomplete suggestions: ${error.message}`);
    }
};