<template>
    <select v-model="selectedGenreId" @change="emitSelectedGenreId" class="form-select"
            aria-label="Default select example">
        <option selected value="0">Kõik žanrid</option>
        <option v-for="genre in genres" :key="genre.genreId" :value="genre.genreId">{{ genre.genreName }}</option>

    </select>
</template>

<script>

import genreTable from "@/components/admin/GenreTable.vue";

export default {
    name: "GenreDropdown",
    data() {
        return {
            selectedGenreId: '0',
            genres: [
                {
                    genreId: 0,
                    genreName: ''
                }
            ]
        }
    },
    methods: {

        emitSelectedGenreId() {
            this.$emit('event-emit-selected-genre-id', Number(this.selectedGenreId))
        },

        setSelectedGenreId(genreId) {
            this.selectedGenreId = genreId
        },

        getGenres: function () {
            this.$http.get("/genre/all")
                .then(response => {
                    this.genres = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    },
    beforeMount() {
        this.getGenres()
    }
}
</script>

<style scoped>

</style>