<template>
    <div  v-if="show" class="d-flex flex-column bd-highlight portrait-card mb-3">
        <div class="row row-poster p-2 hoverable-link" @click="gotoMovie(movieId)">
            <PosterImage class="portrait-card-picture" :image-data-base64="image" ref="posterImage"/>

        </div>
        <div class="row row-text  ratio-1x1">
            <div class="portrait-card-title justify-content-start hoverable-link">
                <a @click="gotoMovie(movieId)">{{ movieInfo.title }}</a>
            </div>
            <div class=" portrait-card-text">
                {{ formattedGenreName }} | {{ runtimeHours }}h {{ runtimeMinutes }}min
            </div>
            <div class="portrait-card-text" >
                {{ movieInfo.director }}
            </div>
        </div>
        <div class="row p-2 bd-highlight">
            <div class=" btn-group-vertical d-flex">
                <div class="row">
                    <button
                        type="button"
                        class="btn-outline-secondary custom-button-wide me-2"
                        @click="openTrailerModal">
                        Vaata treilerit
                    </button>
                </div>


                <div class="row">
                    <button type="button"
                            class="btn btn-outline-secondary custom-button-wide"
                            @click="gotoSeanceSection(movieId)">
                        Vali seanss
                    </button>
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
import TrailerModal from "@/components/modal/TrailerModal.vue";

export default defineComponent({
    name: "MovieCard",
    components: {MovieView, PosterImage, TrailerModal},
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
            show: false,
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
        openTrailerModal() {
            this.$refs.trailerModal.openModal();
        },
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
                    this.show = true;

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
    box-shadow: 0 0 1vh 0 rgba(0,0,0,0.5);
    border-radius: 1vh;
    padding: 1vh;
    margin-bottom: 1vh;
    aspect-ratio: 0.5;

}
.portrait-card{
    width: 40vh;
    height: 70vh;
    display: flex;
    align-items: center;
    text-align: start;
    background-color: rgba(255, 240, 225, 0.8);
    box-shadow: 0 0 1vh 0 rgba(0,0,0,0.5);
    border-radius: 1vh;
    padding: 1vh;
}
.portrait-card-title{
    padding-top: 1vh;
    font-size: 3.5vh;
    font-weight: bold;
    text-align: left;
}
.portrait-card-text {
    font-size: 2vh;
    text-align: left;
    aspect-ratio: auto;
}

.custom-button-wide{
    margin: 1vh;
    width: 30vh;
    height: 5vh;
    padding: 0.1vh;
    aspect-ratio: 0.5;
    font-size: 2vh;
    border-radius: 0.5vh;
    border-color: #000000;
    color: #000000;
    background-color: rgba(255, 240, 225, 0.8);
    box-shadow: 0 0 1vh 0 rgba(132, 27, 45, 0.5);
    justify-content: center;

}
.custom-button-wide:hover{
    background-color: rgba(132, 27, 45, 0.8);
    box-shadow: 0 0 1vh 0 rgba(132, 27, 45, 0.5);
    color: #000000;
    border-color: #000000;
    transition: all 0.4s ease-in-out;
}
.row-poster{
    height: 37vh ;
    width: 29vh;
    aspect-ratio: 1;
}
.row-text{
    height: 18vh ;
    width: 35vh;
    aspect-ratio: 0.5;
}
</style>
