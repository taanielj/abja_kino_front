<template>
    <div class="bg-dark text-light">
        <div class="row">
            <div class="col col-3">
                <div class="row">
                    <PosterImage :image-data-base64="movieInfo.poster"/>
                </div>

            </div>
            <div class="col col-8">
                <div class="row text-lg-start">
                    <h1>{{ movieInfo.title }}</h1>
                    <p>
                        {{ movieInfo.genre }} | {{ movieInfo.runtime }}
                    </p>
                    <p>
                        {{ seanceInfo.timeStamp }} | {{ seanceInfo.room }}
                    </p>

                </div>
                <div class="row">
                    {{ movieInfo.description }}
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import {defineComponent} from 'vue'
import MovieCard from "@/components/MovieCard.vue";
import PosterImage from "@/components/PosterImage.vue";

export default defineComponent({
    name: "SeanceCardFull",
    components: {PosterImage, MovieCard},
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
            seanceInfo: {
                id: this.seanceId,
                title: "Pealkiri",
                poster: "",
                timeStamp: "Kellaaeg",
                room: "Saal 1",
            },
            movieInfo: {
                title: "Kiired ja vihased X",
                poster: "",
                genre: "Action",
                runtime: "2h 21min"
            }
        }

    },
    methods: {
        getMovie() {
            this.$http.get("/movie/", {
                    params: {

                    }
                }
            ).then(response => {
                this.movieInfo = response.data
            }).catch(error => {
                console.log(error)
            })
        },
        getSeance() {
            this.$http.get("/seance/", {
                    params: {
                        id: this.seanceId
                    }
                }
            ).then(response => {
                this.seanceInfo = response.data
            }).catch(error => {
                console.log(error)
            })
        }
    },
    beforeMount() {
        this.getMovie()
        this.getSeance()
    }


})
</script>

