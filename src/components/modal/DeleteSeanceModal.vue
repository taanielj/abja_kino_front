<template class="modal">
    <Modal  ref="modalRef" close-button-name="Ei">
        <template #header>
            SeanceId: {{seanceId}}
        </template>
        <template #body>
            Kustuta seanss?
        </template>
        <template #footer>
            <button @click="deleteSeance" type="button" class="btn btn-primary">Jah</button>
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
        seanceId: Number
    },
    methods: {
        deleteSeance() {
            this.$http.delete("/seance/" + this.movieId)
                .then(response => {
                    this.$emit('seance-deleted')
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

    }

})

</script>

