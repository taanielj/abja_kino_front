<template>
    <div class="bg-dark text-light">
        <div class="row justify-content-lg-start">
            <div class="col col-3">
                <div class="row movie-poster">
                    <PosterImage :image-data-base64="image" ref="posterImage"/>
                </div>
            </div>
            <div class="col col-5">
                <div class="row text-lg-start">
                    <h1 class="text-start hoverable-link" @click="gotoMovie(movieId)">
                        {{ movieInfo.title }}
                        <div class="col col-5">
                            <div class="row text-lg-start">
                                <button type="button" class="btn btn-success" @click="gotoSeanceSection(movieId)">Vali seanss</button>
                            </div>
                        </div>
                    </h1>
                    <p class="text-start">
                        {{ movieInfo.director }}
                    </p>
                    <p class="text-start">
                        {{ movieInfo.genreName }} {{ runtimeHours }}h {{ runtimeMinutes }}min
                    </p>
                    <p class="text-start">
                        {{ movieInfo.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";
import MovieView from "@/views/MovieView.vue";

export default defineComponent({
    name: "MovieCard",
    components: {MovieView, PosterImage},
    props: {
        movieId: {
            type: Number,
            default: 0
        },
        seanceId: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            movieInfo: {
                id: 0,
                title: "Pealkiri",
                genreName: "Action",
                genreId: "",
                posterImage: "",
                director: "",
                description: "",
                runtime: Number //minutes
            },
            image: "",
            runtimeHours: 0,
            runtimeMinutes: 0
        }
    },
    methods: {
        gotoMovie(id) {
            router.push({name: 'MovieRoute', params: {id}});
        },
        gotoSeanceSection(id) {
            router.push({
                name: 'MovieRoute',
                params: { id },
                query: { scrollTo: 'seances' }
            });
        },



        getMovie() {
            this.$http.get("/movie/" + this.movieId)
                .then(response => {
                    this.movieInfo = response.data;
                    this.image = this.movieInfo.posterImage;
                    this.runtimeToHoursMinutes()
                    this.getGenre();
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        getGenre() {
            this.$http.get("/genre/" + this.movieInfo.genreId)
                .then(response => {
                    this.movieInfo.genreName = response.data;
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },


        runtimeToHoursMinutes() {
            this.runtimeHours = Math.floor(this.movieInfo.runtime / 60)
            this.runtimeMinutes = this.movieInfo.runtime % 60
        }

    },
    mounted() {
        if (this.movieId !== 0) {
            this.getMovie();
        }
    }


})
</script>


