<template>
    <div class="app">
        <header class="app-header">
            <div class='app-logo'>
                <img src="/images/logo.svg" />
            </div>
            <div class="app-search">
                <input type="text" ref="citySearch" @changed="handleChanged" placeholder="Enter your address" />
                <input type="text" class="datepicker" placeholder="Check in" />
                <input type="text" class="datepicker" placeholder="Check out" />
                <button>
                    <img src="/images/icons/search.svg" />
                </button>
            </div>
            <div class="app-user-menu">
                <img src="/images/icons/house.svg" />
                <div class="name">Host</div>
                <img src="/images/user.jpg" class="avatar" />
            </div>
        </header>
        <nuxt />
    </div>
</template>

<script>
export default {
    mounted() {
        this.$maps.makeAutocomplete(this.$refs.citySearch);
    },
    methods: {
        handleChanged(event) {
            const { detail: place } = event;
            if (!place.geometry) {
                return;
            }

            const { location } = place.geometry;
            this.$router.push({
                name: 'search',
                query: {
                    lat: location.lat(),
                    lng: location.lng(),
                    label: this.$refs.citySearch.value,
                },
            });
        },
    }
}
</script>
