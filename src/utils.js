// variables Google
const MY_API_KEY = 'YOUR_API_KEY';
// variables Foursquare
const MY_CLIENT_ID = 'YOUR_CLIENT_ID';
const MY_CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
let MY_VERSION = '20181207%20';

// Google Maps
export const loadGoogleMaps = () => {
    return new Promise(resolve => {
        // define the global callback that will run when google maps is loaded
        // on success
        window.resolveGoogleMapsPromise = () => {
            // resolve the google object
            resolve(window.google);
            // delete the global callback to tidy up since it is no longer needed
            delete window.resolveGoogleMapsPromise;
        }
        // Now, Load the Google Maps API
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${MY_API_KEY}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        // on error
        script.onerror = (error) => {
            alert ('Sorry, there was an error loading the Google Maps data');
        };
        document.body.appendChild(script);
    });
}

export const loadGoogleMaps2 = () => {
    
}

// Google preview Image
export const loadPreviewImage = (venue) => {
    // const HEADING = '100';
    const PITCH = '3'
    const h = '300';
    const w = '300';
    return `https://maps.googleapis.com/maps/api/streetview?size=${w}x${h}&location=${venue.location.lat},${venue.location.lng}&key=${MY_API_KEY}&pitch=${PITCH}`;

}

// Google places
// will come back to this later
export const loadGooglePlaces = () => {
    const apiURL = `https://maps.googleapis.com/maps/api/js?key=${MY_API_KEY}&libraries=places`

    return fetch(apiURL)
        // return the response as a JSON
        .then(resp => resp.json())
        // catch the error
        .catch(error => {
            console.log('load places error: ', error);
        })
}

// FourSquare venues
export const loadPlaces = () => {
    let near = 'Saarbrucken, Germany';
    // let ll = '4.719243,-74.068181';
    let limit = '40';
    let query = 'Bar';

    const apiURL = `https://api.foursquare.com/v2/venues/search?client_id=${MY_CLIENT_ID}
    &client_secret=${MY_CLIENT_SECRET}
    &v=${MY_VERSION}
    &limit=${limit}
    &near=${near}
    &query=${query}`;

    return fetch(apiURL)
        // return the response as a JSON
        .then(resp => resp.json())
        // catch the error
        .catch(error => {
            console.log('load places error: ', error);
            alert ('Sorry, it appears to be an error while fetching the Foursquare data');
        })
}

// get hours --> not using it, have no credit
export const getVenueHours = (venue) => {
    const apiURL = `https://api.foursquare.com/v2/venues/${venue.id}/hours?client_id=${MY_CLIENT_ID}
    &client_secret=${MY_CLIENT_SECRET}
    &v=${MY_VERSION}`;

    return fetch(apiURL)
        // return the response as a JSON
        .then(resp => resp.json())
        // catch the error
        .catch(error => {
            console.log('load hours error: ', error);
        })
}

// get hours (google)
export const getVenueoHoursGoogle = venue => {

}
