<template>
  <div v-if="show" class="schedule-container">
    <div v-if="allSeances.length !== 0" class="seance-wrapper">
      <div v-for="seanceInfo in allSeances" :key="seanceInfo" class="seance-card-item">
        <SeanceMovieCard :seanceInfo="seanceInfo" :journey="journey" />
      </div>
    </div>
    <div v-if="showNoSeances" class="custom-card text-center mx-auto w-50">
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
    max-width: 90vw;
    margin: 0 auto;
}

.seance-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* centers the items */
    align-items: center; /* optional, but helps vertically center if needed */
}

.seance-card-item {
    flex: 0 0 calc(50% - 2rem); /* consider 1rem as margin on each side */
    box-sizing: border-box;
    margin: 1rem; 
}

@media (max-width: 768px) {
    .seance-card-item {
        flex: 0 0 100%;
        margin: 1rem 0; 
    }
}

</style>

