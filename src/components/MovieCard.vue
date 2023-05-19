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
                    <h1>
                        Kiired ja vihased X
                    </h1>
                    <p>
                        genre | runtime: 2h 21min
                    </p>


                </div>
                <div class="row">
                    description
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
        movie: {
            type: Object,
            default: () => ({
                id: 0,
                title: "Pealkiri",
                poster: "",
                timeStamp: "Kellaaeg"

            })
        }
    },
    data() {
        return {
            movieInfo: this.movie
        }
    },
    methods: {
        gotoMovie(id) {
            router.push({name: 'MovieRoute', params: {id: id}})
        },


    }


})
</script>


