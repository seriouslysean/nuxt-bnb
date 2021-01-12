<template>
    <span>
        <span v-html="displayText" />
        <button
            v-if="isTooLong"
            type="button"
            class="link"
            @click="handleReadMore">

            {{ buttonText }}
        </button>
    </span>
</template>

<script>
export default {
    data() {
        return {
            isExpanded: false,
            chunks: [],
        };
    },
    props: {
        text: {
            type: String,
            required: true,
        },
        target: {
            type: Number,
            required: true,
        },
    },
    computed: {
        isTooLong() {
            return this.chunks.length === 2;
        },
        displayText() {
            if (!this.isTooLong || this.isExpanded) {
                return this.chunks.join(' ');
            }

            return `${this.chunks[0]}&hellip;`;
        },
        buttonText() {
            return !this.isExpanded ? 'read more' : 'read less';
        },
    },
    created() {
        this.chunks = this.getChunks();
    },
    methods: {
        getChunks() {
            const position = this.text.indexOf(' ', this.target);

            if (this.text.length <= this.target || position === -1) {
                return [this.text];
            }

            return [this.text.substring(0, position), this.text.substring(position)];
        },
        handleReadMore() {
            this.isExpanded = !this.isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
.link {
    color: blue;
    background: white;
    border: none;
    text-decoration: underline;
    cursor: pointer;

    &:focus {
        border: none;
        outline: none;
    }
}
</style>
