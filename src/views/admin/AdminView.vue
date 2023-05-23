<template>
    <div class="container text-center">
        <AlertDanger :message="errorMessage"/>
        <div class="row">
            <div class="col">
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
                    <div class="col-6 col-md-4 admin-table">
                        <GenreTable @event-error-message="setErrorMessage($event)"/>
                    </div>
                    <div class="col-2 d-none d-md-block"></div> <!-- Spacer column -->
                    <div class="col-6 col-md-4 admin-table">
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
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {

    components: {AlertDanger, RoomTable, SeanceTable, SeanceCard, MovieTable, AllMoviesView, TicketTypeTable, GenreTable},

    name: "AdminView",
    data() {
        return {
            errorMessage: ''
        }
    },
    methods: {
        setErrorMessage(errorMessage) {
            this.errorMessage = errorMessage;

            setTimeout(() => {
                this.errorMessage = '';
            }, 5000);
        }
    }
}
</script>

<style scoped>

.admin-table {
    background-color: orange;
    border-radius: 20px;
    margin-bottom: 20px;

}

</style>
