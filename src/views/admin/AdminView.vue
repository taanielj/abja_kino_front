<template>
    <div class="container text-center">
        <AlertDanger :message="errorMessage"/>
        <div class="row">
            <div class="col">
                <h1>
                    Administraatori töölaud
                </h1>
                <GenreTable/>
                <TicketTypeTable/>
            </div>
        </div>
    </div>
</template>

<script>
import GenreTable from "@/components/admin/GenreTable.vue";
import TicketTypeTable from "@/components/admin/TicketTypeTable.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {

    name: "AdminView",
    components: {AlertDanger, TicketTypeTable, GenreTable},
    data() {
        return {
            errorMessage: ''
        }
    },
}
</script>

<style scoped>

</style>