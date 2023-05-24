<template>
    <div class="row justify-content-center">
        <div v-for="movieId in allMovieIds" class="col col-10 p-2 w-75">
            <MovieCard :movie-id="movieId" :key="movieId"/>
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
            this.$http.get("/movie/all-ids")
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

</style>
