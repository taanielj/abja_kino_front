<template>
<div v-if="show" class="schedule-container">
    <div v-if="allSeances.length !== 0" class="row justify-content-center">
        <div class="col col-12 p-2">
            <div class="d-flex flex-wrap">
                <div v-for="seanceInfo in allSeances" :key="seanceInfo" class="col col-md-5 seance-card">
                    <SeanceMovieCard
                            class="seance-card"
                            :seanceInfo="seanceInfo"
                            :journey="journey"
                    />
                </div>
            </div>
        </div>
    </div>
    <div v-if="showNoSeances" class="custom-card w-50 mx-auto">
        Ühtegi seanssi ei ole, võtke ühendust administraatoriga.
    </div>
</div>

</template>

<script>

import MovieCard from "@/components/MovieCard.vue";
import SeanceMovieCard from "@/components/SeanceMovieCard.vue";
import TrailerModal from "@/components/modal/TrailerModal.vue";

export default {
    name: 'ScheduleView',
    components: {TrailerModal, SeanceMovieCard, MovieCard},
    data() {

        return {
            show: false,
            showNoSeances: false,
            journey: "schedule",
            allSeances: [
                {
                movieId: 0,
                movieTitle: "",
                movieRuntime: 0,
                moviePosterImage: "",
                movieGenreName: "",
                dateTime: "",
                subtitles: "",
                language: "",
                roomName: "",
                movieYoutubeLink: "",
                availableSeats: 0,
                totalSeats: 0,
            }
            ],
        }
    },

    methods: {
        getAllSeances() {
            this.$http.get("/api/v1/seance/all-future")
                .then(response => {
                    this.allSeances = response.data;
                    this.show = true;
                    if (this.allSeances.length === 0) {
                        this.showNoSeances = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },

    beforeMount() {
        this.getAllSeances();
    }
}
</script>

<style scoped>

.schedule-container {
    width: 90vw;
    margin: 0 auto;
}

.seance-card {
    margin-left: 5vh;
    margin-top: 1vh;
}

</style>

