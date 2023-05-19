<template>
    <div class="container text-center">
        <div class="row justify-content-center">
            <div class="col col-9">
                <h1>
                    Administraatori töölaud
                </h1>
                <div class="row admin-table">
                    <MovieTable/>
                </div>
                <div class="row admin-table">
                    <SeanceTable/>
                </div>
                <div class="row justify-content-center">
                    <div class="col col-5 admin-table">
                        <GenreTable/>
                    </div>
                    <div class="col col-2">
                    </div>
                    <div class="col col-5 admin-table">
                        <TicketTypeTable/>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col col-5 admin-table">
                        <RoomTable/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GenreTable from "@/components/admin/GenreTable.vue";
import TicketTypeTable from "@/components/admin/TicketTypeTable.vue";
import AllMoviesView from "@/views/AllMoviesView.vue";
import MovieTable from "@/components/admin/MovieTable.vue";
import SeanceCard from "@/components/SeanceCard.vue";
import SeanceTable from "@/components/admin/SeanceTable.vue";
import RoomTable from "@/components/admin/RoomTable.vue";

export default {
    name: "AdminView",
    components: {RoomTable, SeanceTable, SeanceCard, MovieTable, AllMoviesView, TicketTypeTable, GenreTable}
}
</script>

<style scoped>

.admin-table {
    background-color: orange;
    border-radius: 20px;
    margin-bottom: 20px;

}

</style>