<template>
<div>
    <div style="display:flex;">
        <img v-for="image in home.images" :key="image" :src="image" height="200" width="150" />
    </div>
    {{ home.title }}<br>
    ${{ home.pricePerNight }} / night<br>
    <img src="/images/marker.svg" height="20" width="20" />{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br>
    <img src="/images/star.svg" height="20" width="20" />{{ home.reviewValue }}<br>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath
</div>
</template>

<script>
import homes from '~/data/homes.json';

export default {
    head() {
        return {
            title: this.home.title,
        }
    },
    data() {
        return {
            home: {},
        };
    },
    created() {
        const { id: homeId } = this.$route.params;
        this.home = homes.find(home => home.objectID === homeId);
    },
};
</script>
