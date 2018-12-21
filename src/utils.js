// variables Google
const MY_API_KEY = 'AIzaSyB2Na2itdrdjtju2_vV0W2QLDrPevufc8U';
// variables Foursquare
const MY_CLIENT_ID = 'HZIUFRTJYQEKW5K3CYVLKYROMWM4EMVT3HXNBG3PIRJWWLPK';
const MY_CLIENT_SECRET = 'MKEFFYMS3255NVMSHVK4EZYMNOY5D3JFCCVQIBVGTTYS5EZJ';
let MY_VERSION = '20181207%20';

// Google Maps
export const loadGoogleMaps = () => {
    return new Promise(resolve => {
        // define the global callback that will run when google maps is loaded
        window.resolveGoogleMapsPromise = function () {
            // resolve the google object
            resolve(window.google);
            // delete the global callback to tidy up since it is no longer needed
            delete window.resolveGoogleMapsPromise;
        }
        // Now, Load the Google Maps API
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${MY_API_KEY}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
    });
}

// Google preview Image
export const loadPreviewImage = (venue) => {
    // const MY_API_KEY = 'AIzaSyB2Na2itdrdjtju2_vV0W2QLDrPevufc8U';
    const HEADING = '100';
    const PITCH = '3'
    const h = '300';
    const w = '300';
    return `https://maps.googleapis.com/maps/api/streetview?size=${w}x${h}&location=${venue.location.lat},${venue.location.lng}&key=${MY_API_KEY}&pitch=${PITCH}`;

}

// Google places
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

// FourSquare things
export const loadPlaces = () => {
    let near = 'Saarbrucken, Germany';
    let ll = '4.719243,-74.068181';
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
        })
}

// get hours
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

// get Hours   
