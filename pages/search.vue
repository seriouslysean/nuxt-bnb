<template>
    <div class="ass-search-results-page">
        <div class="app-search-results">
            <div class="app-search-results-listing">
                <h2 class="app-title">Stays in {{ label }}</h2>
                <nuxt-link
                    v-for="home in homes"
                    :key="home.objectID"
                    :to="`/home/${home.objectID}`"
                    @mouseover.native="highlightMarker(home.objectID, true)"
                    @mouseout.native="highlightMarker(home.objectID, false)"
                    prefetch>

                    <HomeRow
                        :home="home"
                        class="app-house" />
                </nuxt-link>
            </div>
            <div class="app-search-results-map">
                <div class="app-map" ref="map"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: `Homes around ${this.label}`,
        }
    },
    mounted() {
        this.updateMap();
    },
    computed: {
        getHomeMarkers() {
            if (this.homes.length <= 0) {
                return;
            }

            return this.homes.map(home => ({
                ...home._geoloc,
                pricePerNight: home.pricePerNight,
                id: home.objectID,
            }));
        },
    },
    methods: {
        highlightMarker(homeId, isHighlighted) {
            document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker--highlight', isHighlighted);
        },
        updateMap() {
            this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers);
        },
    },
    async beforeRouteUpdate(to, from, next) {
        const { label, lat, lng } = to.query;
        const data = await this.$dataApi.getHomesByLocation(lat, lng);
        this.homes = data.json.hits;
        this.label = label;
        this.lat = lat;
        this.lng = lng;
        this.updateMap();
        next();
    },
    async asyncData({ query, $dataApi }) {
        const { label, lat, lng } = query;
        const data = await $dataApi.getHomesByLocation(lat, lng);
        return {
            homes: data.json.hits,
            label,
            lat,
            lng,
        };
    },
}
</script>

<style>
.marker {
    background-color: #FFF;
    border: 1px solid #DEDEDE;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 8px;
}

.marker--highlight {
    color: #FFF !important;
    background-color: #000;
    border: 1px solid #000;
}
</style>
