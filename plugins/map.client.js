const MAPS_API_KEY = process.env.NB_GOOGLE_MAPS_API_KEY;

let MAP_LOADED = false;
let MAP_WAITING = null;

function addScript() {
    if (!MAPS_API_KEY) {
        console.error('Maps API key is not set');
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);
}

function initMap() {
    if (MAP_WAITING) {
        const { canvas, lat, lng } = MAP_WAITING;
        renderMap(canvas, lat, lng);
        MAP_WAITING = null;
    }

    MAP_LOADED = true;
}

function showMap(canvas, lat, lng) {
    if (!MAP_LOADED) {
        MAP_WAITING = { canvas, lat, lng };
        return;
    }

    renderMap(canvas, lat, lng);
}

function renderMap(canvas, lat, lng) {
    const mapOptions = {
        zoom: 18,
        center: new window.google.maps.LatLng(lat, lng),
        disableDefaultUI: true,
        zoomControl: true,
    };
    const map = new window.google.maps.Map(canvas, mapOptions);
    const position = new window.google.maps.LatLng(lat, lng);
    const marker = new window.google.maps.Marker({ position });
    marker.setMap(map);
}

export default function (context, inject) {
    addScript();

    inject('maps', {
        showMap,
    });
}
