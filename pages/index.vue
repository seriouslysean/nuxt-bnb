<template>
    <div>
        <p>Hello, world.</p>

        <HomeCard v-for="home in homes" :home="home" :key="home.objectID" />
    </div>
</template>

<script>
import homes from '~/data/homes.json';

import HomeCard from '~/components/HomeCard.vue';

export default {
    components: {
        HomeCard,
    },
    head() {
        return {
            title: 'Homepage',
            meta: [{
                name: 'description',
                content: 'This is a homepage!',
                hid: 'description',
            }],
        };
    },
    data() {
        return {
            homes: homes.slice(0, 3),
        }
    },
}
</script>
