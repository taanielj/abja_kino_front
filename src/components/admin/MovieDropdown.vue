<template>
    <select v-model="selectedMovieId" @change="emitSelectedMovieId" class="form-select"
            aria-label="Default select example">
        <option selected value="0">Kõik filmid</option>
        <option v-for="movie in movies" :key="movie.id" :value="movie.id">{{ movie.name }}</option>
    </select>
</template>

<script>
export default {
    name: "MovieDropdown",
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

        setSelectedMovieId(movieId) {
            this.selectedMovieId = movieId
        },

        getMovies: function () {
            this.$http.get("/movie/all")
                .then(response => {
                    this.movies = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    },
    beforeMount() {
        this.getMovies()

    }
}
</script>

<style scoped>

</style>