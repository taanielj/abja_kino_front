<template>
    <div class="all-movies">
        <div class="row justify-content-center">

            <div class="d-flex flex-wrap justify-content-start ">
                <div v-for="movieId in allMovieIds" class="m-1">
                    <MovieCard :movie-id="movieId" :key="movieId"/>
                </div>

            </div>

        </div>
    </div>



</template>

<script>
import {defineComponent} from 'vue'
import MovieCard from "@/components/MovieCard.vue";

export default defineComponent({
    name: "AllMoviesView",
    components: {MovieCard},
    data() {
        return {
            allMovieIds: [
                0
            ],
        }
    },
    methods: {
        getAllMovieIds() {
            this.$http.get("/api/v1/movie/ids")
                .then(response => {
                    this.allMovieIds = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },
    beforeMount() {
        this.getAllMovieIds();
    }
})
</script>


<style scoped>
.all-movies{
    margin-left: 7%;
    margin-bottom: 20%;
}
</style>
