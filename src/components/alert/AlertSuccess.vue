<template>
    <Alert :message="message">
        <template #body>
            <div class="alert alert-success" role="alert">
                {{message}}
            </div>
        </template>
    </Alert>
</template>

<script>
import Alert from "@/components/alert/Alert.vue";

export default {
    name: 'AlertSuccess',
    components: {Alert},
    props: {
        message: String
    }
}
</script>