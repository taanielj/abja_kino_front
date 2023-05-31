<template>
    <Modal ref="modalRef" close-button-name="Ei">
        <template #header>
            Logi välja
        </template>
        <template #body>
            Kas soovid välja logida?
        </template>

        <template #footer>
            <button @click="executeLogout" type="button" class="btn btn-secondary custom-button">Jah</button>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: 'LogoutModal',
    components: {Modal},
    methods: {
        executeLogout() {
            localStorage.clear()
            this.$refs.modalRef.closeModal()
            this.$emit('event-update-nav-menu')
            router.push({name: 'ScheduleRoute'})
        },
    }
}
</script>
