<template>
<div>
    <div style="display:flex;">
        <img v-for="image in home.images" :key="image" :src="image" height="200" width="150" />
    </div>
    {{ home.title }}<br>
    ${{ home.pricePerNight }} / night<br>
    <img src="/images/marker.svg" height="20" width="20" />{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br>
    <img src="/images/star.svg" height="20" width="20" />{{ home.reviewValue }}<br>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br>
    {{ home.description }}<br>
    <div style="height:800px;width:800px;" ref="map"></div>
</div>
</template>

<script>
import homes from '~/data/homes.json';

export default {
    head() {
        return {
            title: this.home.title,
            script: [...(this.googleMapsApiKey ? [{
                src: `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&libraries=places`,
                hid: 'map',
                defer: true,
            }, {

            }] : [])],
        }
    },
    data() {
        return {
            home: {},
        };
    },
    mounted() {
        this.initGoogleMap();
    },
    created() {
        this.googleMapsApiKey = process.env.NB_GOOGLE_MAPS_API_KEY;
        if (!this.googleMapsApiKey) {
            console.error('Google Maps API key not set!');
        }

        const { id: homeId } = this.$route.params;
        this.home = homes.find(home => home.objectID === homeId);
    },
    methods: {
        initGoogleMap() {
            if (!this.googleMapsApiKey) {
                return;
            }

            const { lat, lng } = this.home._geoloc;
            const position = new window.google.maps.LatLng(lat, lng);
            const mapOptions = {
                zoom: 18,
                center: position,
                disableDefaultUI: true,
                zoomControl: true,
            };
            const map = new window.google.maps.Map(this.$refs.map, mapOptions);
            const marker = new window.google.maps.Marker({ position });
            marker.setMap(map);
        },
    },
};
</script>
