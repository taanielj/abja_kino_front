<template>
    <div class="bg-dark text-light">
        <div class="row">
            <div class="col col-3">
                <div class="row">
                    <PosterImage :image-data-base64="movieInfo.posterImage" ref="posterImage"/>
                </div>

            </div>
            <div class="col col-8">
                <div class="row text-lg-start">
                    <h1 class="text-start">
                        {{ movieInfo.title }}
                    </h1>
                    <p class="text-start">
                        Genre: {{ movieInfo.genreName }}| runtime: {{ runtimeHours }}h {{ runtimeMinutes }}min
                    </p>
                    <p class="text-start">
                        description
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

export default defineComponent({
    name: "MovieCard",
    components: {PosterImage},
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
                posterImage: "",
                runtime: Number //minutes
            },
            runtimeHours: 0,
            runtimeMinutes: 0
        }
    },
    methods: {
        gotoMovie(id) {
            router.push({name: 'MovieRoute', params: {id: id}})
        },
        getMovie() {
            if (this.movieId === 0) {
                return
            }
            console.log("get movie")
            this.$http.get("/movie/" + this.movieId).then(response => {
                this.movieInfo = response.data;
                console.log(this.movieInfo)
                this.$nextTick(() => {
                    this.runtimeToHoursMinutes();
                    console.log("next tick")
                })
                this.setImgData();
            }).catch(() => {
                // router.push({path: '/error'})
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


