<template>
    <div class="container text-center">
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

export default {
    name: "AdminView",
    components: {TicketTypeTable, GenreTable}
}
</script>

<style scoped>

</style>