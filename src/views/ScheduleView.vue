<template>
    <div class="container">
        <div class="row">
            <h1>Kinokava</h1>
        </div>
        <div class="row">
                <div v-for="seanceId in allSeanceIds" class="col-md-6 p-2" :key="seanceId">
                    <SeanceCardSchedule :seance-id="seanceId" />
                </div>


        </div>
    </div>

</template>

<script>


import MovieCard from "@/components/MovieCard.vue";
import SeanceCardSchedule   from "@/components/SeanceCardSchedule.vue";

export default {
    name: 'ScheduleView',
    components: {SeanceCardSchedule, MovieCard},
    data() {
        return {
            allSeanceIds: [
                0
            ],
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


