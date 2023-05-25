<template>
    <div class="container">
        <div class="row justify-content-lg-start">
            <div class="row mb-2">
                <h1 class="text-lg-start">
                    {{ movieInfo.title }}
                </h1>
            </div>
            <div class="col col-5">
                <div class="row mb-2">
                    <PosterImage :image-data-base64="image" ref="posterImage"/>
                </div>
            </div>
            <div class="col col-6 text-lg-start">
                <div class="row mb-2">
                    <h2>{{ movieInfo.description }}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col justify-content-lg-start">
                    <div class="text-lg-start">
                        <h2>Filmi info</h2>
                    </div>
                    <div class="row mb-2">
                        <div class="text-lg-start">
                            Žanr: {{ movieInfo.genreName }}
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="text-lg-start">
                            Režissöör: {{ movieInfo.director }}
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="text-lg-start">
                            Filmi pikkus: {{ runtimeHours }}h {{ runtimeMinutes }}min
                        </div>
                    </div>
                </div>
                <div class="col col-8 justify-content-lg-start">
                    <div class="row mb-2">
                        <iframe
                                title="YouTube video with movie trailer"
                                v-if="showIframe"
                                width="560"
                                height="200"
                                :src="movieInfo.youtubeLink"
                                allow="autoplay; encrypted-media"
                                allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="seanceSelector">
            <h2>Vali seanss</h2>
        </div>
        <div class="row">
            <div v-for="seanceId in allMovieSeanceIds" class="col-md-6 p-2" :key="seanceId">
                <SeanceCardSchedule :seance-id="seanceId"/>
            </div>
        </div>
    </div>
</template>

<script>
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";
import MovieCard from "@/components/MovieCard.vue";
import SeanceCardSchedule from "@/components/SeanceCardSchedule.vue";

export default {
    name: "MovieView",
    components: {SeanceCardSchedule, MovieCard, PosterImage},
    data() {
        return {
            showIframe: true,
            movieId: this.$route.params.id,
            movieInfo: {
                id: 0,
                title: "Pealkiri",
                genreName: "Action",
                posterImage: "",
                director: "",
                description: "",
                youtubeLink: "",
                runtime: 0,
            },
            image: "",
            runtimeHours: 0,
            runtimeMinutes: 0,
            allMovieSeanceIds: [
                0
            ],
        }
    },
    methods: {
        isValidYoutubeEmbedLink(link) {
            const regex = /^https:\/\/www\.youtube\.com\/embed\/[^\/]+$/;
            return regex.test(link);
        },

        getMovie() {
            this.$http.get("/movie/" + this.movieId)
                .then(response => {
                    this.movieInfo = response.data;
                    this.image = this.movieInfo.posterImage;
                    this.runtimeToHoursMinutes()
                    this.getGenre();
                    this.showIframe = this.isValidYoutubeEmbedLink(this.movieInfo.youtubeLink);
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        getAllMovieSeanceIds() {
            this.$http.get("/seance/all-future/" + this.movieId)
                .then(response => {
                    this.allMovieSeanceIds = response.data;
                })
                .catch(error => {
                    console.log(error);
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
            this.getAllMovieSeanceIds();
        }
    }
}
</script>

