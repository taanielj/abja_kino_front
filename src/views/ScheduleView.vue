<template>
    <div class="container">
        <div class="row">
            <h1>Kava</h1>
        </div>
        <div class="row">
            <div class="d-flex flex-row flex-nowrap justify-content-center">
                <div class="p-2">
                    <MovieCard :movie="movieInfo"/>
                </div>
                <div class="p-2">
                    <MovieCard/>
                </div>
                <div class="p-2">
                    <MovieCard/>
                </div>

            </div>
        </div>
    </div>

</template>

<script>


import MovieCard from "@/components/MovieCard.vue";

export default {
    name: 'ScheduleView',
    components: {MovieCard},
    data() {
        return {
            movieInfo: {
                id: 1,
                title: "Pealkiri",
                poster: "",
                timeStamp: "Kellaaeg"
            }
        }
    },

}
</script>


