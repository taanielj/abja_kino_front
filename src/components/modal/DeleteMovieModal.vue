<template class="modal">
    <Modal  ref="modalRef" close-button-name="Ei">
        <template #header>
            {{movieTitle}}
        </template>
        <template #body>
            Kustuta film?
        </template>
        <template #footer>
            <button @click="deleteMovie" type="button" class="btn btn-primary">Jah</button>
        </template>
    </Modal>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: 'DeleteMovieModal',
    components: {Modal},
    props: {
        movieId: Number,
        movieTitle: String
    },
    data() {
        return {
            errorMessage: "",
        }
    },

    methods: {
        deleteMovie() {
            this.$http.delete("/api/v1/movie/" + this.movieId)
                .then(() => {
                    this.successMessage = "Film kustutatud";
                    this.$emit('movie-deleted', this.successMessage)
                    this.$refs.modalRef.closeModal();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        this.errorMessage = error.response.data.message;
                        this.$emit('delete-movie-error', this.errorMessage)
                        this.$refs.modalRef.closeModal();
                    } else {
                        router.push({path: "/error"})
                    }

                })
        },
    }

}

</script>

