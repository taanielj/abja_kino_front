<template>
    <div class="container">
        <div class="row justify-content-center mb-4">
            <h1>Seansi lisamine</h1>
        </div>
        <div class="row mb-3 justify-content-center">
            <div class="col col-4">
                <label for="movie" class="form-label">Film</label>
            </div>
            <div class="col col-4">
                <MovieDropdown :movie="seanceInfo.movieId" @event-emit-selected-movie-id="updateMovieId"/>
            </div>
        </div>
        <div class="row mb-3 justify-content-center">
            <div class="col col-4">
                <label for="room" class="form-label">Saal</label>
            </div>
            <div class="col col-4">
                <RoomDropdown :room="seanceInfo.roomId" @event-emit-selected-room-id="updateRoomId"/>
            </div>
        </div>
        <div class="row mb-3 justify-content-center">
            <div class="col col-4">
                <label for="subtitles" class="form-label">Subtiitrid</label>
            </div>
            <div class="col col-4">
                <input v-model="subtitles" type="text" class="form-control" id="subtitles">
            </div>
        </div>
        <div class="row mb-3 justify-content-center">
            <div class="col col-4">
                <label for="language" class="form-label">Keel</label>
            </div>
            <div class="col col-4">
                <input v-model="language" type="text" class="form-control" id="language">
            </div>
        </div>


        <div class="row mb-3 justify-content-center">
            <div class="col col-4">
                <label for="timeDate" class="form-label">Algusaeg</label>
            </div>
            <div class="col col-4">
                <input v-model="dateTime" type="datetime-local" class="form-control" id="timeDate">
            </div>
        </div>

        <div class="row justify-content-center mt-5 mb-5">
            <div class="col col-6">
                <button @click="navigateBack" type="button" class="btn button btn-outline-secondary me-3">
                    Tagasi
                </button>
                <button v-if="isEdit" @click="editSeance" type="button" class="btn btn-outline-success">
                    Muuda
                </button>
                <button v-else @click="postNewSeance" type="button" class="btn button btn-outline-success">
                    Lisa
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import MovieDropdown from "@/components/admin/MovieDropdown.vue";
import RoomDropdown from "@/components/admin/RoomDropdown.vue";
import router from "@/router";

export default {
    name: "AddSeanceView",
    components: {RoomDropdown, MovieDropdown},

    data() {
        return {
            timeDate: 0,
            timeHours: 0,
            timeMinutes: 0,
            successMessage: "",
            errorMessage: "",
            seanceInfo: {
                movieId: 0,
                roomId: 0,
                subtitles: "eesti",
                language: "inglise",
                timeStamp: "2023-05-31T19:11"
            }
        }
    },
    methods: {


        setSeanceInfo(seanceInfo) {
            this.seanceInfo = seanceInfo;
        },

        allFieldsFilled() {
            return this.seanceInfo.movieId !== "" &&
                this.seanceInfo.roomId !== "" &&
                this.seanceInfo.subtitles !== "" &&
                this.seanceInfo.language !== "" &&
                this.seanceInfo.subtitles !== "";
        },

        postNewSeance() {
            this.resetMessageFields();

            if (!this.allFieldsFilled()) {
                this.errorMessage = "Täida kõik väljad!";
                return;
            }
        },
        resetMessageFields() {
            this.successMessage = "";
            this.errorMessage = "";
        },
        navigateBack() {
            router.push({path: "/admin"});
        },

    }
}
</script>

<style scoped>

</style>