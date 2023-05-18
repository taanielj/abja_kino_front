<template>
    <div v-if="message  !== '' && message !== null" class="row justify-content-center">
        <div class="col col-6">
            <slot name="body">
                {{ message }}
            </slot>
        </div>
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