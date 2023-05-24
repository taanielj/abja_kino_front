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

import {defineComponent} from 'vue'
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default defineComponent({
    components: {Modal},
    props: {
        movieId: Number,
        movieTitle: String
    },

    methods: {
        deleteMovie() {
            this.$http.delete("/movie/" + this.movieId)
                .then(() => {
                    this.$emit('movie-deleted')
                    this.$refs.modalRef.closeModal();
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },
    }

})

</script>

