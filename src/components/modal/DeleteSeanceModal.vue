<template class="modal">
    <Modal  ref="modalRef" close-button-name="Ei">
        <template #header>
            SeanceId: {{seanceId}}
        </template>
        <template #body>
            Kustuta seanss?
        </template>
        <template #footer>
            <button @click="deleteSeance" type="button" class="btn btn-secondary custom-button">Jah</button>
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

    data() {
        return {
            errorMessage: "",
            successMessage: ""
        }
    },

    methods: {
        deleteSeance() {
            this.$http.delete("/api/v1/seance/" + this.seanceId)
                .then(response => {
                    this.successMessage = "Seanss kustutatud"
                    this.$emit('seance-deleted', this.successMessage)
                    this.$refs.modalRef.closeModal()
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        this.errorMessage = error.response.data.message
                        this.$emit('delete-seance-error', this.errorMessage)
                        this.$refs.modalRef.closeModal()
                    } else {
                        router.push({path: "/error"})
                    }
                })
        },
    }
})

</script>

