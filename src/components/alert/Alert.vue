<template>
    <div v-if="message  !== '' && message !== null" class="alert-body row justify-content-center">
        <div class="col col-6">
            <slot name="body">
                {{ message }}
            </slot>
        </div>
    </div>
    <div v-else class="alert-body">
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        message: String
    }
}
</script>

<style scoped>
    .alert-body {
        height: 4vh;

    }
</style>
