<template>
    <div class="container">
        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>
        <div class="row justify-content-center mb-4">
            <h1>Lisa film</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col col-4">
                <div class="row mb-2">
                    <PosterImage :image-data-base64="posterImage"/>
                </div>
                <div class="row justify-content-lg-center">
                    <ImageInput ref="imageInputRef" @event-emit-base64="setImageData"/>
                </div>
            </div>
            <div class="col col-6">
                <MovieDetailsInput @event-emit-movie-info="setMovieInfo"/>
            </div>

        </div>
        <div class="row justify-content-center mt-5 mb-5">
            <div class="col col-6">
                <button @click="navigateBack" type="button" class="btn button btn-outline-secondary me-3">
                    Tagasi
                </button>
                <button v-if="isEdit" @click="editMovie" type="button" class="btn btn-outline-success">
                    Muuda
                </button>
                <button v-else @click="postNewMovie" type="button" class="btn button btn-outline-success">
                    Lisa
                </button>
            </div>
        </div>
    </div>


</template>

<script>
import PosterImage from "@/components/PosterImage.vue";
import MovieDetailsInput from "@/components/admin/MovieDetailsInput.vue";
import ImageInput from "@/components/admin/ImageInput.vue";
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
    name: "AddMovieView",

    components: {AlertDanger, ImageInput, MovieDetailsInput, PosterImage},
    data() {
        return {
            successMessage: "",
            errorMessage: "",
            movieInfo: {
                title: "",
                runtime: Number,
                director: "",
                youtube: "",
                description: "",
                genreId: 0,
                posterImage: ""
            },
            posterImage: ""
        }
    },
    methods: {
        setImageData(imageDataBase64) {
            this.posterImage    = imageDataBase64;
            this.movieInfo.posterImage = imageDataBase64;
            this.$emit('event-emit-base64', imageDataBase64)
        },
        setMovieInfo(movieInfo) {
            this.movieInfo = movieInfo;
        },
        allFieldsFilled() {
            return this.movieInfo.title !== "" &&
                this.movieInfo.runtime !== 0 &&
                this.movieInfo.director !== "" &&
                this.movieInfo.youtube !== "" &&
                this.movieInfo.description !== "" &&
                this.movieInfo.genreId !== 0 &&
                this.posterImage !== "";
        },

        postNewMovie() {
            this.resetMessageFields();

            if (!this.allFieldsFilled()) {
                this.errorMessage = "Täida kõik väljad!";
                return;
            }
            this.movieInfo.posterImage = this.posterImage;
            this.$http.post("/movie/add", this.movieInfo
            ).then(response => {
                this.successMessage = "Film lisatud!";
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            })
        },
        resetMessageFields() {
            this.successMessage = "";
            this.errorMessage = "";
        },
        navigateBack() {
            router.push({path: "/admin"});
        },

    }
}
</script>

<style scoped>

.button{
    font-size: 30px;
}

</style>
