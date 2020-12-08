<template>
<div>
    {{ home.title }}
</div>
</template>

<script>
import homes from '~/data/homes.json';

export default {
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
