<template>
    <div class="container text-center">

        <AlertModal :message="errorMessage" @event-emit-close-alert-modal="clearErrorMessage"/>

        <div class="row justify-content-center">
            <div class="col col-9">

                <div class="admin-table row text-center">
                    <h1 class="title">
                        Administraatori töölaud
                    </h1>

                </div>


                <div class="row admin-table">
                    <MovieTable @movie-table-error="setErrorMessage" @movie-table-success="refreshSeanceTable"
                                ref="movieTableRef"/>
                </div>
                <div class="row admin-table">
                    <SeanceTable @seance-table-error="setErrorMessage" ref="seanceTableRef"
                                 @seance-table-success="setSuccessMessage"/>
                </div>
                <div class="row admin-table">
                    <RoomTable @room-table-error="setErrorMessage" @room-table-success="refreshSeanceTable"/>
                </div>
                <div class="row justify-content-center">
                    <div class="col admin-table">
                        <GenreTable @genre-table-error="setErrorMessage" @genre-table-success="refreshMovieTable"/>
                    </div>
                    <div class="col-1 d-none d-md-block"></div> <!-- Spacer column -->
                    <div class="col  admin-table">
                        <TicketTypeTable @ticket-type-table-error="setErrorMessage"/>
                    </div>
                </div>
                <div class="row admin-table">
                    <UserTable @user-table-error="setErrorMessage"/>
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
import SeanceTable from "@/components/admin/table/SeanceTable.vue";
import RoomTable from "@/components/admin/table/RoomTable.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import UserTable from "@/components/admin/table/UserTable.vue";
import AlertModal from "@/components/modal/AlertModal.vue";

export default {

    components: {
        AlertModal,
        UserTable,
        AlertDanger,
        RoomTable,
        SeanceTable,
        MovieTable,
        AllMoviesView,
        TicketTypeTable,
        GenreTable
    },

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
        },
        refreshSeanceTable() {
            this.$refs.seanceTableRef.getAllSeances();
        },
        refreshMovieTable() {
            this.$refs.movieTableRef.getAllMovies();
        }
    },
    beforeMount() {
        if (localStorage.getItem('roleName') !== 'ADMIN')
            this.$router.push('/');
    }
}
</script>

<style scoped>

.admin-table {
    background-color: rgba(255, 255, 255, 0.8);
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 2.5vh;
}


.title {
    font-size: 4.5vh;
    font-weight: bold;
    color: #1a202c;
    text-align: center;
}


</style>
