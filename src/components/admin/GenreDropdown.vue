<template>
<!--    <select v-model="selectedGenreId" @change="emitSelectedGenreId" class="form-select"

    </select>-->
</template>

<script>
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

    }
}
</script>

<style scoped>

</style>