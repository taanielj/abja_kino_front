<template>
    <div v-if="isOpen" class="modal fade show d-block" tabindex="-1" @click="closeModal">
        <div class="modal-dialog" @click.stop>
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">{{closeButtonName}}</button>
                    <slot name="footer">
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AlertModal',
    props: {
        message: "",
        closeButtonName: ""
    },
    data(){
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
.modal-content {
    background-color: white !important;
}
</style>
