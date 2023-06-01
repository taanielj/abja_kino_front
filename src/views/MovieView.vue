<template>
    <div v-if="show">
        <div class="row justify-content-center">
            <div class="card">

                <h1 class="card-header text-black bigger-text bold-text">
                    {{ movieInfo.title }}
                </h1>
                <div class="card-body">
                    <div class="row">
                        <div class="col col-5">
                            <div class="row mb-2 poster-container">
                                <PosterImage :image-data-base64="image" ref="posterImage"/>
                            </div>
                        </div>
                        <div class="col col-6 text-lg-start">
                            <div class="row">
                                <div class="col">
                                    <div class="row mb-3">
                                        <div class="text-lg-start text-muted text-movie-description bigger-text">
                                            Žanr
                                        </div>
                                        <div class="text-lg-start text-black text-movie-body bigger-text">
                                            {{ movieInfo.genreName }}
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="text-lg-start text-muted  text-movie-description bigger-text">
                                            Režissöör
                                        </div>
                                        <div class="text-lg-start text-black text-movie-body bigger-text">
                                            {{ movieInfo.director }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-6 d-flex align-items-end">
                                    <div class="row mb-3">
                                        <div class="text-lg-start text-muted text-movie-description bigger-text">
                                            Filmi pikkus
                                        </div>
                                        <div class="text-lg-start text-black text-movie-body bigger-text">
                                           {{ runtimeHours }}h {{ runtimeMinutes }}min
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2 text-black">
                                <h4>{{ movieInfo.description }}</h4>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
        <div class="row justify-content-center">
            <div class="trailer card">
                <iframe class="card-body"
                        title="YouTube video with movie trailer"
                        v-if="showIframe"
                        :src="movieInfo.youtubeLink"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>

                </iframe>
            </div>


        </div>


    </div>

    <div class="seances row justify-content-center" ref="seanceSelector">
        <div v-if="allMovieSeanceIds.length !== 0" class="custom-card title">
            Vali seanss
        </div>

        <div v-if="allMovieSeanceIds.length !== 0" class="schedule-container">
            <div class="row justify-content-center">
                <div class="col col-12 p-2">
                    <div class="d-flex flex-wrap">
                        <div v-for="seanceId in allMovieSeanceIds" :key="seanceId" class="col col-md-5 seance-card">
                            <SeanceMovieCard
                                    class="seance-card"
                                    :seanceId="seanceId"
                                    :journey="journey"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="custom-card title">
            Filmil ei ole seansse
        </div>

    </div>

</template>

<script>
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";
import MovieCard from "@/components/MovieCard.vue";

import SeanceMovieCard from "@/components/SeanceMovieCard.vue";

export default {
    name: "MovieView",
    components: {SeanceMovieCard, MovieCard, PosterImage},
    data() {
        return {
            show: false,
            journey: "movie",
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
            const regex = /^https:\/\/www\.youtube\.com\/embed\/[^/]+$/;
            return regex.test(link);
        },

        getMovie() {
            this.$http.get("/api/v1/movie/" + this.movieId)
                .then(response => {
                    this.movieInfo = response.data;
                    this.image = this.movieInfo.posterImage;
                    this.runtimeToHoursMinutes()
                    this.getGenre();
                    this.showIframe = this.isValidYoutubeEmbedLink(this.movieInfo.youtubeLink);
                    this.show = true;
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        getAllMovieSeanceIds() {
            this.$http.get("/api/v1/seance/all-future/" + this.movieId)
                .then(response => {
                    this.allMovieSeanceIds = response.data;


                    if (this.$route.query.scrollTo === 'seances') {
                        this.$nextTick(() => {
                            this.$refs.seanceSelector.scrollIntoView({behavior: 'smooth'});
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },


        getGenre() {
            this.$http.get("/api/v1/genre/" + this.movieInfo.genreId)
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

<style scoped>
.title {
    height: 6vh;
    width: 73%;
    font-size: 4vh;
    font-weight: bold;
}

.card {
    width: 73%;
    background-color: rgba(255, 240, 225, 0.8);
}

.seances {
    min-height: 70vh;
}

.schedule-container {
    width: 90vw;
    margin: 0 auto;

}

.seance-card {
    margin-left: 5vh;
    margin-top: 1vh;
}
.text-movie-description {
    font-size: 2vh;
}
.text-movie-body {
    font-size: 2.3vh;
}

</style>
