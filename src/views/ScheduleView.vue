<template>

    <div v-if="allSeanceIds.length !== 0" class="row justify-content-center">
        <div class="col col-10 p-2 w-75">
            <div class="d-flex flex-wrap">
                <div v-for="seanceId in allSeanceIds" :key="seanceId" class="col-md-6">
                    <SeanceMovieCard
                            class="seance-card"
                            :seanceId="seanceId"
                            :journey="journey"
                    />
                </div>
            </div>
        </div>
    </div>

</template>

<script>


import MovieCard from "@/components/MovieCard.vue";
import SeanceCardSchedule from "@/components/SeanceCardSchedule.vue";
import SeanceMovieCard from "@/components/SeanceMovieCard.vue";

export default {
    name: 'ScheduleView',
    components: {SeanceMovieCard, SeanceCardSchedule, MovieCard},
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


