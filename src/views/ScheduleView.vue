<template>
    <div class="container">
        <div class="row">
            <h1>Kava</h1>
        </div>
        <div class="row">
            <div class="d-flex flex-row flex-nowrap justify-content-center">
                <div class="p-2">
                    <SeanceCardFull movie-id="0" seance-id="0"/>
                </div>
                <div class="p-2">
                    <SeanceCardFull movie-id="0" seance-id="0"/>
                </div>

            </div>
        </div>
    </div>

</template>

<script>


import MovieCard from "@/components/MovieCard.vue";
import SeanceCardFull from "@/components/SeanceCardFull.vue";

export default {
    name: 'ScheduleView',
    components: {SeanceCardFull, MovieCard},
    data() {
        return {
            allSeanceIds: [
                0
            ],
            allMovieIds: [
                0
            ],
        }
    },
    methods: {
        getAllSeanceIds() {
            this.$http.get("/seance/ids")
                .then(response => {
                    this.allSeanceIds = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getAllMovieIds() {
            this.$http.get("/movie/ids")
                .then(response => {
                    this.allMovieIds = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },
    beforeMount() {
        this.getAllSeanceIds();
        this.getAllMovieIds();
    }




}
</script>


