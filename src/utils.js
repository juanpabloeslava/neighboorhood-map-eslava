// Google Maps API things

export function loadGoogleMaps() {
    return new Promise((resolve) => {
        // define the global callback that will run when google maps is loaded
        window.resolveGoogleMapsPromise = function () {
            // resolve the google object
            resolve(window.google);
            // delete the global callback to tidy up since it is no longer needed
            delete window.resolveGoogleMapsPromise;
        }
        // Now, Load the Google Maps API
        const script = document.createElement("script");
        const MY_API_KEY = 'AIzaSyB2Na2itdrdjtju2_vV0W2QLDrPevufc8U';
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${MY_API_KEY}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
    });
}

// FourSquare things

export function loadPlaces() {
    let city = 'New York, NY';
    let query = 'gym';
    const MY_CLIENT_ID = 'HZIUFRTJYQEKW5K3CYVLKYROMWM4EMVT3HXNBG3PIRJWWLPK'
    const MY_CLIENT_SECRET = 'MKEFFYMS3255NVMSHVK4EZYMNOY5D3JFCCVQIBVGTTYS5EZJ'
    // var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=N1IAMKZUIK1AUHKRFGFBKPQ2YKDSBAKS4NTER5SYZN5CROR1&client_secret=4MKLXVLU2FGZQVRMAEDC15P0TFJGSCY3ZUYUZ0KHQQQLQ5R3&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
    var apiURL = `https://api.foursquare.com/v2/venues/search?client_id=${MY_CLIENT_ID}&client_secret=${MY_CLIENT_SECRET}&v=20130815%20&limit=50&near=${city}&query=${query}`;

    return fetch(apiURL)
        // return the response as a JSON
        .then( resp => resp.json())
        // catch the error
        .catch( error => {
            console.log ('load places error: ', error);
        })
}