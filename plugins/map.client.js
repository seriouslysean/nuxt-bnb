let IS_LOADED = false;
let WAITING = [];

function addScript(apiKey) {
    if (!apiKey) {
        console.error('Maps API key is not set');
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    window.initMap = initGoogleMaps;
    document.head.appendChild(script);
}

function addToQueue(fn, args) {
    WAITING.push({
        fn,
        args,
    });
}

function initGoogleMaps() {
    IS_LOADED = true;

    // Once the map is loaded, run the waiting calls
    WAITING.forEach((item) => {
        if (typeof item.fn === 'function') {
            item.fn(...item.args);
        }
    });
    WAITING = [];
}

function showMap(canvas, lat, lng, markers) {
    if (!IS_LOADED) {
        addToQueue(showMap, arguments);
        return;
    }

    const mapOptions = {
        zoom: 18,
        center: new window.google.maps.LatLng(lat, lng),
        disableDefaultUI: true,
        zoomControl: true,
        styles: [{
            featureType: 'poi.business',
            elementType: 'labels.icon',
            stylers: [{
                visibility: 'off',
            }],
        }],
    };
    const map = new window.google.maps.Map(canvas, mapOptions);

    if (!markers) {
        const position = new window.google.maps.LatLng(lat, lng);
        const marker = new window.google.maps.Marker({ position });
        marker.setMap(map);
        return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((home) => {
        const position = new window.google.maps.LatLng(home.lat, home.lng);
        const marker = new window.google.maps.Marker({
            position,
            label: {
                text: `$${home.pricePerNight}`,
                className: `marker home-${home.id}`,
            },
            icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
            clickable: false,
        });
        marker.setMap(map);
        bounds.extend(position);
    });

    map.fitBounds(bounds);
}

function makeAutocomplete(input) {
    if (!IS_LOADED) {
        addToQueue(makeAutocomplete, arguments);
        return;
    }
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['(cities)'],
    });
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        input.dispatchEvent(new CustomEvent('changed', {
            detail: place,
        }));
    });
}

export default function (context, inject) {
    const { googleMapsAPIKey } = context.$config;
    addScript(googleMapsAPIKey);

    inject('maps', {
        showMap,
        makeAutocomplete,
    });
}
