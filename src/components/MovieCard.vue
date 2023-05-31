<template>
<div v-if="show">
    <div class="d-flex flex-column bd-highlight  portrait-card mb-3">
        <div class="p-3 ">
            <PosterImage class="portrait-card-picture" :image-data-base64="image" ref="posterImage"/>

        </div>
        <div class="p-1">
            <h1 class="portrait-card-title justify-content-start hoverable-link">
                <a @click="gotoMovie(movieId)">{{ movieInfo.title }}</a>
            </h1>
            <p class="card-text">
                {{ formattedGenreName }}
            </p></div>
        <div class="p-2 bd-highlight">
            <div class=" btn-group-vertical d-flex">
                <div class="row">
                    <button type="button" class="btn-outline-secondary custom-button-wide me-2" @click="">Vaata treilerit
                    </button>
                </div>


                <div class="row">
                    <button type="button" class="btn btn-outline-secondary custom-button-wide" @click="gotoSeanceSection(movieId)">Vali seanss
                    </button>
                </div>

            </div>
        </div>
    </div>
    </div>

<!--    <div v-if="movieInfo.id !==0" class="d-flex portrait-card" >-->
<!--        <div class="card mb-3">-->
<!--            <div class="row ">-->
<!--                <div class="card-body">-->
<!--                    <h1 class="card-title hoverable-link">-->
<!--                        <a @click="gotoMovie(movieId)">{{ movieInfo.title }}</a>-->
<!--                    </h1>-->
<!--                    <p class="card-text">-->
<!--                        {{ formattedGenreName }}-->
<!--                    </p>-->
<!--                    <div class=" btn-group-vertical d-flex">-->
<!--                        <div class="row">-->
<!--                            <button type="button" class="btn-outline-secondary custom-button-wide me-2" @click="">Vaata treilerit-->
<!--                            </button>-->
<!--                        </div>-->


<!--                        <div class="row">-->
<!--                            <button type="button" class="btn btn-outline-secondary custom-button-wide" @click="gotoSeanceSection(movieId)">Vali seanss-->
<!--                            </button>-->
<!--                        </div>-->

<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        </div>-->


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
            show: true,
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

<style scoped>
.portrait-card-picture {
    object-fit: contain;
    height: 35vh !important;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
}
.portrait-card{
    width: 40vh;
    height: 80vh;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: start;
    background-color: rgba(255, 240, 225, 0.8);

    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    border-radius: 10px;
    padding: 10px;
}
.portrait-card-title{
    padding-top: 1vh;
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
}

.custom-button-wide{
    margin-top: 1vh;
    margin-left: 2vh;
    margin-right: 2vh;
    width: 20vh;
    height: 5vh;
    font-size: 2vh;
    border-radius: 0.5vh;
    border-color: #000000;
    color: #000000;
    background-color: rgba(255, 240, 225, 0.8);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    justify-content: center;
}
</style>
