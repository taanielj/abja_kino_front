<template>
    <div class="container admin-table p-3">
        <div class="row justify-content-center mb-4">
            <h1 v-if="isEdit">Muuda Filmi</h1>
            <h1 v-else>Lisa film</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col col-3">
                <div class="row mb-2 poster-add-movie">
                    <PosterImage :image-data-base64="image"/>
                </div>
                <div class="row justify-content-lg-center">
                    <ImageInput ref="imageInputRef" @event-emit-base64="setImageData"/>
                </div>
            </div>
            <div class="col col-7 ">
                <MovieDetailsInput @event-emit-movie-info="setMovieInfo" :movie="movieInfo"/>
            </div>
        </div>

        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>

        <div class="row justify-content-center mt-5 mb-5">
            <div class="col col-6">
                <button @click="navigateBack" type="button" class="btn button btn-outline-secondary custom-button me-3">
                    Tagasi
                </button>
                <button v-if="isEdit" @click="editMovie" type="button"
                        class="btn button btn-outline-secondary custom-button me-3">
                    Muuda
                </button>
                <button v-else @click="addMovie" type="button"
                        class="btn button btn-outline-secondary custom-button me-3">
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
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {getAuthHeader} from "@/utils";

export default {
    name: "AddMovieView",
    components: {AlertSuccess, AlertDanger, ImageInput, MovieDetailsInput, PosterImage},
    data() {
        return {
            movieId: this.$route.params.id,
            successMessage: "",
            errorMessage: "",
            isEdit: false,
            movieInfo: {
                title: "",
                runtime: "",
                director: "",
                youtubeLink: "",
                description: "",
                genreId: 0,
                posterImage: ""
            },
            image: null,
        }
    },
    methods: {
        validateYoutubeLink(link){
            //example: https://www.youtube.com/embed/6CxKrva6NU8, use regex to validate:
            const regex = new RegExp("^(https:\/\/www\.youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})$");
            return regex.test(link);

        },

        setImageData(imageDataBase64) {
            this.image = imageDataBase64;
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
                this.movieInfo.youtubeLink !== "" &&
                this.movieInfo.description !== "" &&
                this.movieInfo.genreId !== 0 &&
                this.movieInfo.posterImage !== "";
        },

        getMovie() {
            this.$http.get("/api/v1/movie/" + this.movieId, {headers: getAuthHeader()})
                .then(response => {
                    this.movieInfo = response.data;
                    this.image = this.movieInfo.posterImage;
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        addMovie() {
            this.resetMessageFields();

            if (!this.allFieldsFilled()) {
                this.setErrorMessage("Täida kõik väljad!")
                return;
            }

            if(!this.validateYoutubeLink(this.movieInfo.youtubeLink)){
                this.setErrorMessage("Youtube link ei ole õiges formaadis\nhttps://www.youtube.com/embed/xxxxxxxxxxx")
                return;
            }

            this.movieInfo.posterImage = this.image;

            this.$http.post("/api/v1/movie/add", this.movieInfo, {headers: getAuthHeader()}
            ).then(() => {
                this.setSuccessMessage("Film lisatud!")
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            })
        },

        setSuccessMessage(message) {
            this.successMessage = message;
            setTimeout(() => {
                this.successMessage = "";
            }, 5000);
        },

        setErrorMessage(message) {
            this.errorMessage = message;
            setTimeout(() => {
                this.errorMessage = "";
            }, 5000);
        },

        putMovie() {
            this.$http.put("/api/v1/movie/" + this.movieId, this.movieInfo, {headers: getAuthHeader()})
                .then(() => {
                    this.setSuccessMessage("Film muudetud!")
                    this.getMovie();
                })
                .catch(error => this.errorMessage = error.response.data.message);
        },

        editMovie() {
            this.resetMessageFields();

            if (!this.allFieldsFilled()) {
                this.setErrorMessage("Täida kõik väljad!")
                return;
            }
            if(!this.validateYoutubeLink(this.movieInfo.youtubeLink)){
                this.setErrorMessage("Youtube link ei ole õiges formaadis!, näide: https://www.youtube.com/embed/xxxxxxxxxxx")
                return;
            }

            this.movieInfo.posterImage = this.image;
            this.putMovie();
        },

        resetMessageFields() {
            this.successMessage = "";
            this.errorMessage = "";
        },

        navigateBack() {
            router.push({path: "/admin"});
        }

    },
    mounted() {
        if (this.movieId !== undefined) {
            this.isEdit = true;
            this.getMovie();
        }
    },

    watch: {
        "movieInfo.runtime": function (newVal, oldVal) {
            if (newVal < 1) {
                this.movieInfo.runtime = 1;
            }
        }
    }
}
</script>
