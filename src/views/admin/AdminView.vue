<template>

        <AlertModal
                :message="errorMessage"
                ref="alertModalRef"
        />
        <div class="row justify-content-center">
            <div class="col col-9">
                <div class="admin-table row text-center">
                    <h1 class="title">
                        Administraatori töölaud
                    </h1>
                </div>
                <div class="row admin-table">
                    <MovieTable
                            @movie-table-error="openAlertModal"
                            @movie-table-success="refreshTables"
                            ref="movieTableRef"
                    />
                </div>
                <div class="row admin-table">
                    <SeanceTable
                            @seance-table-error="openAlertModal"
                            @seance-table-success="refreshTables"
                            ref="seanceTableRef"
                    />
                </div>
                <div class="row admin-table">
                    <RoomTable @room-table-error="openAlertModal"
                               @room-table-success="refreshTables"

                    />
                </div>
                <div class="row justify-content-center">
                    <div class="col admin-table">
                        <GenreTable @genre-table-error="openAlertModal" @genre-table-success="refreshMovieTable"/>
                    </div>
                    <div class="col-1 d-none d-md-block"></div> <!-- Spacer column -->
                    <div class="col  admin-table">
                        <TicketTypeTable @ticket-type-table-error="openAlertModal"/>
                    </div>
                </div>
                <div class="row admin-table">
                    <UserTable @user-table-error="openAlertModal"/>
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
        openAlertModal(errorMessage) {
            this.errorMessage = errorMessage;
            this.refreshTables();
            this.$refs.alertModalRef.openModal();

        },

        setSuccessMessage(successMessage) {
            this.successMessage = successMessage;

            setTimeout(() => {
                this.successMessage = '';
            }, 5000);
        },
        refreshTables() {
            this.$refs.seanceTableRef.getAllSeances();
            this.$refs.movieTableRef.getAllMovies();
        },

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
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 2,5rem;
}

.title {
    font-size: 4.5rem;
    font-weight: bold;
    color: #1a202c;
    text-align: center;
}

</style>
