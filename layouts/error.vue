<template>
    <div style="text-align: center;">
        <img src="/images/lost-travolta.gif" height="476" width="490" />

        <h1>Error!</h1>
        {{ error.message }} {{ error.statusCode }}
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: 'BIG PROBLEMS',
        };
    },
    props: {
        error: {
            type: Object,
            required: true,
        },
    },
};
</script>
