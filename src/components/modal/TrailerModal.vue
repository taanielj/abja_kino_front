<template>
    <div v-if="isOpen" class="modal fade show d-block" tabindex="-1" role="dialog" @click="closeModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="btn-close btn-close-white" aria-label="Close" @click="closeModal"></button>
                <div class="trailer">
                    <iframe
                            title="YouTube video with movie trailer"
                            :src="youtubeLink"
                            allow="autoplay; encrypted-media"
                            allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrailerModal',
    props: {
        youtubeLink: "",
    },
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        openModal() {
            this.isOpen = true
        },
        closeModal() {
            this.isOpen = false
        }
    }
}
</script>

<style scoped>
.modal-dialog {
    max-width: 50vw !important;
}

.modal-content {
    background-color: transparent !important;
    border: transparent;
    height: 100%;
    position: fixed;
    left: 15%;
    top: 22%;
    z-index: 20;
}

button {
    position: fixed;
    left: 20%;
}

iframe {
    aspect-ratio: 16/9;

    width: 80%;
    height: 80%;
}
</style>
