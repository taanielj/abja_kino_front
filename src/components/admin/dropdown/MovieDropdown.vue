<template>
    <select v-model="selectedMovieId" @change="emitSelectedMovieId" class="form-select"
            aria-label="Movie Dropdown">
        <option selected value="0">Kõik filmid</option>
        <option v-for="movie in movies" :key="movie.id" :value="movie.id">{{ movie.title}}</option>
    </select>
</template>

<script>
export default {
    name: "MovieDropdown",
    props: ['movie'],
    data() {
        return {
            selectedMovieId: "0",
            movies: [
                {
                    id: 0,
                    title: ""
                }
            ]
        }
    },
    methods: {
        emitSelectedMovieId() {
            this.$emit('event-emit-selected-movie-id', Number(this.selectedMovieId))
        },


        getMovies() {
            this.$http.get("/movie/all")
                .then(response => {
                    this.movies = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    },
    watch: {
        movie(newMovieId) {
            this.selectedMovieId = newMovieId || 0;
        }
    },
    beforeMount() {
        this.getMovies()

    }
}
</script>

<style scoped>

</style>
