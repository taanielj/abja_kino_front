<template>
    <div v-if="movieInfo.id !==0" class="card " style="background-color: lightgrey">
        <div class="row g-5">
            <div class=" col-md-3 poster-container">
                <PosterImage :image-data-base64="image" ref="posterImage"/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h1 class="card-title hoverable-link">
                        <a @click="gotoMovie(movieId)">{{ movieInfo.title }}</a>
                    </h1>
                    <p class="card-text">
                        {{ movieInfo.director }}
                    </p>
                    <p class="card-text">
                        {{ formattedGenreName }} {{ runtimeHours }}h {{ runtimeMinutes }}min
                    </p>
                    <p class="card-text"><small class="text-muted">
                        {{ movieInfo.description }} </small>
                    </p>
                    <p class="">
                        {{  }}
                    </p>
                    <div class="button-container">
                    <button type="button" class="btn btn-success " @click="gotoSeanceSection(movieId)">Vali seanss
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p></p>
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
                title: "",
                genreName: "",
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
    computed: {
        formattedGenreName() {
            if(this.movieInfo.genreName)
            return this.movieInfo.genreName.charAt(0).toUpperCase() + this.movieInfo.genreName.slice(1);
        },
    },
    methods: {
        gotoMovie(id) {
            router.push({name: 'MovieRoute', params: {id}});
        },
        gotoSeanceSection(id) {
            router.push({
                name: 'MovieRoute',
                params: {id},
                query: {scrollTo: 'seances'}
            });
        },


        getMovie() {
            this.$http.get("/api/v1/movie/" + this.movieId)
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
        }
    }


})
</script>

<style>
.card {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
}


.card-title {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
}

.card-text {
    font-size: 20px;
    font-weight: normal;
    text-align: left;
}
.button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
.card-body{
    text-align: left;
    text-clolor: grey;
}
</style>