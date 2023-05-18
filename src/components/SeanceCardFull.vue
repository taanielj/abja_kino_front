<template>
    <div class="container bg-dark text-light">
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
                        {{movieInfo.genre}} | {{movieInfo.runtime}}
                    </p>
                    <p>
                        {{seanceInfo.timeStamp}} | {{seanceInfo.room}}
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
        seanceInfo: {
            type: Object,
            required: true
        },
        movieInfo: {
            type: Object,
            required: true
        }
    },
})
</script>

