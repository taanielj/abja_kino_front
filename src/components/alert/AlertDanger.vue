<template>
    <Alert :message="message">
        <template #body>
            <div class="alert alert-danger" role="alert">
                {{message}}
            </div>
        </template>
    </Alert>
</template>

<script>
import Alert from "@/components/alert/Alert.vue";

export default {
    name: 'AlertDanger',
    components: {Alert},
    props: {
        message: String
    }
}
</script>