<template>
    <div class="container*">
        <div class="row mb-3">
            <div class="row mb-2">
                <div class="col-3">
                    <label for="title" class="form-label justify-content-center ">Pealkiri</label>
                </div>
                <div class="col-6 justify-content-end mt-2">
                    <input v-model="title" @input="updateField('title', $event)" type="text" class="form-control mb-2"
                           id="title">
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-3">
                    <label for="runtime" class="form-label">Pikkus (Min)</label>
                </div>
                <div class="col-6 justify-content-end mt-2">
                    <input v-model="runtime" @input="updateField('runtime', $event)" type="number"
                           class="form-control mb-2" id="runtime">
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-3">
                    <label for="director" class="form-label">Režissöör</label>
                </div>
                <div class="col-6 justify-content-end mt-2">
                    <input v-model="director" @input="updateField('director', $event)" type="text"
                           class="form-control mb-2" id="director" required>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-3">
                    <label for="youtube" class="form-label">Youtube link</label>
                </div>
                <div class="col-6 justify-content-end mt-2">
                    <input v-model="youtubeLink" @input="updateField('youtubeLink', $event)" type="text"
                           class="form-control mb-2" id="youtube">
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-3">
                    <label for="genre" class="form-label">Žanr</label>
                </div>
                <div class="col-6 justify-content-end mt-2">
                    <GenreDropdown :genre="genreId" @event-emit-selected-genre-id="updateGenreId"/>
                </div>
            </div>
        </div>
        <div class="row mb-3 text-start">
            <label for="description" class="form-label">Sisesta filmi kirjeldus:</label>
            <textarea v-model="description" @input="updateField('description', $event)" type="text" class="form-control" id="description"
                      rows="9"></textarea>
        </div>
    </div>
</template>

<script>
import GenreDropdown from "@/components/admin/dropdown/GenreDropdown.vue";

export default {
    name: "MovieDetailsInput",
    components: {GenreDropdown},
    props: ['movie'],
    data() {
        return {
            title: "",
            runtime: 0,
            director: "",
            youtubeLink: "",
            description: "",
            genreId: 0,
        }
    },
    watch: {
        movie: {
            handler(newMovie) {
                this.title = newMovie.title;
                this.runtime = newMovie.runtime;
                this.director = newMovie.director;
                this.youtubeLink = newMovie.youtubeLink;
                this.description = newMovie.description;
                this.genreId = newMovie.genreId;
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        updateGenreId(genreId) {
            this.genreId = genreId;
            this.$emit('event-emit-movie-info', this.packMovieInfo());
        },
        updateField(field, event) {
            this[field] = event.target.value;
            this.$emit('event-emit-movie-info', this.packMovieInfo());
        },
        packMovieInfo() {
            return {
                title: this.title,
                runtime: this.runtime,
                director: this.director,
                youtubeLink: this.youtubeLink,
                description: this.description,
                genreId: this.genreId
            };
        }
    }
}
</script>
