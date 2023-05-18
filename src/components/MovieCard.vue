<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="row" @click="gotoMovie(movieInfo.id)">

                    {{ movieInfo.title }}


                </div>
                <div class=" row" @click="gotoMovie(movieInfo.id)">
                    <PosterImage :image-data-base64="movieInfo.poster"/>
                </div>

            </div>
            <div class="col">
                <div class="row">
                    {{ movieInfo.timeStamp }}
                </div>
                <div class="row">
                    Nupp, ValiPilet
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";
import {useRoute} from "vue-router";

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
        }

    }


})
</script>


