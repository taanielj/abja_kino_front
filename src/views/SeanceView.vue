<template>
    <div class="container">

        <div class="row justify-content-center">
            <div class="col col-10">
                <SeanceCardFull :movie-info="movieInfo" :seance-info="seanceInfo"/>
            </div>
        </div>



    </div>
</template>

<script>
import {defineComponent} from 'vue'
import PosterImage from "@/components/PosterImage.vue";
import SeanceCardFull from "@/components/SeanceCardFull.vue";

export default defineComponent({
    name: "SeanceView",
    components: {SeanceCardFull, PosterImage},
    data() {
        return {
            seanceInfo: {
                id: this.$route.params.id,
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
})
</script>


<style scoped>

</style>
