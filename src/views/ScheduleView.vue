<template>
    <div v-if="allSeanceIds.length !== 0" class="container">
        <div class="row kinokava poster-container">
            <h1 style="font-weight: bold">Kinokava</h1>
        </div>
        <div class="row justify-content-center d-flex">
            <div class="col-12">
                <div v-for="seanceId in allSeanceIds" :key="seanceId">
                    <SeanceCardSchedule :seance-id="seanceId"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


import MovieCard from "@/components/MovieCard.vue";
import SeanceCardSchedule from "@/components/SeanceCardSchedule.vue";

export default {
    name: 'ScheduleView',
    components: {SeanceCardSchedule, MovieCard},
    data() {
        return {
            allSeanceIds: [0],
        }
    },
    methods: {
        getAllSeanceIds() {
            this.$http.get("/seance/all-future-id")
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
<style>
.kinokava-container {
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: lightgrey;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>

