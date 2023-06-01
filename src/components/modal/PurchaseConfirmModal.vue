<template class="modal">
    <Modal  ref="modalRef" close-button-name="Ei">
        <template #header>
            Kinnita ost?
        </template>
        <template #body>
            Summa: {{formattedSum}}
        </template>
        <template #footer>
            <button @click="confirmPurchase" type="button" class="custom-button">Jah</button>
        </template>
    </Modal>
</template>

<script>


import Modal from "@/components/modal/Modal.vue";


export default {
    name: 'PurchaseConfirmModal',
    components: {Modal},
    props: {
        formattedSum: String,
    },

    data() {

    },
    methods: {
        confirmPurchase(){
            this.$emit('purchase-confirmed')
            this.$refs.modalRef.closeModal()
        }
    }
}

</script>

