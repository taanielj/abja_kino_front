<template>
    <div class="container text-start">
        <div class="row mb-3">
            <div class="col col-3">
                <label for="title" class="form-label">Pealkiri</label>
                <label for="runtime" class="form-label">Pikkus</label>
                <label for="director" class="form-label">Režissöör</label>
                <label for="youtube" class="form-label">Youtube link</label>
                <label for="genre" class="form-label">Žanr</label>
            </div>
            <div class="col col-9 mb-3">
                <input v-model="movieInfo.title" type="text" class="form-control mb-2" id="title">
                <input v-model="movieInfo.runtime" type="text" class="form-control mb-2" id="runtime">
                <input v-model="movieInfo.director" type="text" class="form-control mb-2" id="director">
                <input v-model="movieInfo.youtube" type="text" class="form-control mb-2" id="youtube">
                <GenreDropdown :genre="movieInfo.genreId" @event-emit-selected-genre-id="updateGenreId"/>
            </div>
        </div>
        <div class="row mb-3 text-start">
            <label for="description" class="form-label">Sisesta filmi kirjeldus:</label>
            <textarea v-model="movieInfo.description" type="text" class="form-control" id="description"
                      rows="9"></textarea>
        </div>
    </div>


</template>

<script>
import GenreDropdown from "@/components/admin/GenreDropdown.vue";

export default {
    name: "MovieDetailsInput",
    components: {GenreDropdown},
    data() {
        return {
            movieInfo: {
                title: "",
                runtime: "",
                director: "",
                youtube: "",
                description: "",
                genreId: 0
            }
        }
    },
    watch: {
        movieInfo: {
            handler() {
                this.emitMovieInfo();
            },
            deep: true
        }
    },
    methods: {
        updateGenreId(genreId) {
            this.movieInfo.genreId = genreId;
        },
        emitMovieInfo() {
            this.$emit('event-emit-movie-info', this.movieInfo)
        }
    }
}
</script>
