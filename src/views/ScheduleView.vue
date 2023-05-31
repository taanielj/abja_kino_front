<template>
<div class="schedule-container">
    <div v-if="allSeanceIds.length !== 0" class="row justify-content-center">
        <div class="col col-12 p-2">
            <div class="d-flex flex-wrap">
                <div v-for="seanceId in allSeanceIds" :key="seanceId" class="col-6">
                    <SeanceMovieCard
                            class="seance-card"
                            :seanceId="seanceId"
                            :journey="journey"
                    />
                </div>
            </div>
        </div>
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
            journey: "schedule",
            allSeanceIds: [0],
        }
    },
    methods: {
        getAllSeanceIds() {
            this.$http.get("/api/v1/seance/all-future-id")
                .then(response => {
                    this.allSeanceIds = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },
    beforeMount() {
        this.getAllSeanceIds();
    }


}
</script>

<style scoped>
.seance-card {
    margin: 2vh;
    width: 90%;
}

.schedule-container {
    width: 80vw;
    margin: 0 auto;

}


</style>

