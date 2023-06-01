<template>
    <select v-model="selectedGenreId" @change="emitSelectedGenreId" class="form-select" aria-label="Default select example">
        <option disabled value="0">Kõik žanrid</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
    </select>
</template>

<script>
export default {
    name: "GenreDropdown",
    props: ['genre'],
    data() {
        return {
            genres: [
                {
                    id: 0,
                    name: ''
                }
            ]
        }
    },

    methods: {
        emitSelectedGenreId() {
            this.$emit('event-emit-selected-genre-id', Number(this.selectedGenreId))
        },

        getGenres: function () {
            this.$http.get("/api/v1/genre/all")
                .then(response => {
                    this.genres = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    },

    watch: {
        genre(newGenreId) {
            this.selectedGenreId = newGenreId || 0;
        }
    },

    beforeMount() {
        this.getGenres()
    }
}

</script>
