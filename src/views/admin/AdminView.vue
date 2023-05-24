<template>
    <div class="container text-center">
        <AlertDanger :message="errorMessage"/>
        <div class="row">
            <div class="col">
                <h1>
                    Administraatori töölaud
                </h1>
                <div class="row admin-table">
                    <MovieTable @movie-table-error="setErrorMessage" @movie-table-success="setSuccessMessage"/>
                </div>
                <div class="row admin-table">
                    <SeanceTable @seance-table-error="setErrorMessage" @seance-table-success="setSuccessMessage"/>
                </div>
                <div class="row justify-content-center">
                    <div class="col-6 col-md-4 admin-table">
                        <GenreTable @event-error-message="setErrorMessage($event)"/>
                    </div>
                    <div class="col-2 d-none d-md-block"></div> <!-- Spacer column -->
                    <div class="col-6 col-md-4 admin-table rotate">
                        <TicketTypeTable/>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col col-10 admin-table">
                        <RoomTable/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GenreTable from "@/components/admin/table/GenreTable.vue";
import TicketTypeTable from "@/components/admin/table/TicketTypeTable.vue";
import AllMoviesView from "@/views/AllMoviesView.vue";
import MovieTable from "@/components/admin/table/MovieTable.vue";
import SeanceCard from "@/components/SeanceCard.vue";
import SeanceTable from "@/components/admin/table/SeanceTable.vue";
import RoomTable from "@/components/admin/table/RoomTable.vue";
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
        },

        setSuccessMessage(successMessage) {
            this.successMessage = successMessage;

            setTimeout(() => {
                this.successMessage = '';
            }, 5000);
        }

    }
}
</script>

<style scoped>

.admin-table {
    background-color: #fff;
    //border-radius: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2); /* add a box shadow */
    transition: box-shadow 0.3s ease-in-out; /* optional: add a transition for a smooth hover effect */
}

.admin-table:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.2); /* optional: add a hover effect */
}
</style>
