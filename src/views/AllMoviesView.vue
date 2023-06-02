<template>
    <div v-if="show" class="all-movies">
        <div class="row justify-content-center">
            <div class="d-flex flex-wrap justify-content-start ">
                <div v-if="show" v-for="movieInfo in allMovies" class="m-1">
                    <MovieCard :movieInfo="movieInfo" :key="movieInfo"/>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showNoMovies" class="custom-card w-50 mx-auto">
        Ühtegi filmi ei ole, võtke ühendust administraatoriga.
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
            show: false,
            showNoMovies: false,
            allMovies: [
                {
                    id: 0,
                    title: "",
                    genreName: "",
                    genreId: "",
                    posterImage: "",
                    director: "",
                    description: "",
                    runtime: Number,
                    youtubeLink: ""
                }
            ],
        }
    },

    methods: {
        getAllMovies() {
            this.$http.get("/api/v1/movie/all")
                .then(response => {
                    this.allMovies = response.data;

                    if (this.allMovies.length === 0) {
                        this.showNoMovies = true;
                        return;
                    }
                    this.show = true;
                })
                .catch(error => {
                    console.log(error);
                })
        },

    },

    beforeMount() {
        this.getAllMovies();
    }
})

</script>

<style scoped>
.all-movies{
    margin-left: 7%;
    margin-bottom: 20%;
}
</style>
