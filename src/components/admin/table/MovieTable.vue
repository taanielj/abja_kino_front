<template>
    <DeleteMovieModal ref="deleteMovieModalRef"
                      :movieId="selectedMovieId"
                      :movieTitle="selectedMovieTitle"
                      @movie-deleted="refreshAndEmitSuccessMessage"
                      @delete-movie-error="setErrorMessage"

    />
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Film</th>
            <th scope="col">Žanr</th>
            <th scope="col">Seansside arv</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="movie in movies">
            <td>{{movie.title}}</td>
            <td>{{movie.genreName}}</td>
            <td>{{movie.numberOfSeances}}</td>
            <td>
                <font-awesome-icon @click="navigateToEditMovie(movie.id)"
                                   class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                <font-awesome-icon @click="openDeleteMovieModal(movie.id, movie.title)" class="hoverable-link"
                                   :icon="['fas', 'xmark']"/>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <button class="btn btn-light w-100" @click="navigateToAddMovie">Lisa uus film</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>


import router from "@/router";
import DeleteMovieModal from "@/components/modal/DeleteMovieModal.vue";
import {getAuthHeader} from "@/utils";

export default {
    name: "MovieTable",
    components: {DeleteMovieModal},
    data() {
        return {
            movies: [
                {
                    id: 0,
                    title: "default",
                    genreName: "default",
                    numberOfSeances: 0,

                }
            ],
            selectedMovieId: null,
            selectedMovieTitle: null
        }
    },
    methods: {
        getAllMovies() {



            this.$http.get("/api/v1/movie/admin-summary", {headers: getAuthHeader()})
                .then(response => {
                    this.movies = response.data
                })
                .catch(() => {
                    this.errorMessage = "Database connection error"
                })
        },

        refreshAndEmitSuccessMessage(message) {
            this.getAllMovies()
            this.$emit("movie-table-success", message)
        },

        navigateToEditMovie(id) {
            router.push({path: "admin/edit-movie/" + id});
        },

        navigateToAddMovie() {
            router.push({path: "admin/add-movie"});
        },

        openDeleteMovieModal(id, title) {
            this.selectedMovieId = id;
            this.selectedMovieTitle = title;
            this.$refs.deleteMovieModalRef.$refs.modalRef.openModal();
        },



        setErrorMessage(errorMessage) {
            this.errorMessage = errorMessage;
            this.$emit("movie-table-error", errorMessage);
        }
    },
    beforeMount() {
        this.getAllMovies()
    }

}
</script>

<style scoped>

</style>
