<template>
    <div class="container admin-table p-2 w-50">
        <div class="row justify-content-center mb-4">
            <h1 v-if="isEdit">Seansi muutmine</h1>
            <h1 v-else>Seansi lisamine</h1>
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
                <input v-model="seanceInfo.subtitles" type="text" class="form-control" id="subtitles">
            </div>
        </div>
        <div class="row mb-3 justify-content-center">
            <div class="col col-4">
                <label for="language" class="form-label">Keel</label>
            </div>
            <div class="col col-4">
                <input v-model="seanceInfo.language" type="text" class="form-control" id="language">
            </div>
        </div>
        <div class="row mb-3 justify-content-center">
            <div class="col col-4">
                <label for="timeDate" class="form-label">Algusaeg</label>
            </div>
            <div class="col col-4">
                <input v-model="seanceInfo.dateTime" type="datetime-local" class="form-control" id="timeDate">
            </div>
        </div>

        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>

        <div class="row justify-content-center mt-5 mb-5">
            <div class="col col-6">
                <button @click="navigateBack" type="button" class="btn button btn-outline-secondary custom-button me-3">
                    Tagasi
                </button>
                <button v-if="isEdit" @click="editSeance" type="button"
                        class="btn button btn-outline-secondary custom-button me-3">
                    Muuda
                </button>
                <button v-else @click="addSeance" type="button"
                        class="btn button btn-outline-secondary custom-button me-3">
                    Lisa
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import MovieDropdown from "@/components/admin/dropdown/MovieDropdown.vue";
import RoomDropdown from "@/components/admin/dropdown/RoomDropdown.vue";
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {getAuthHeader} from "@/utils";
export default {
    name: "AddSeanceView",
    components: {AlertSuccess, AlertDanger, RoomDropdown, MovieDropdown},

    data() {
        return {
            isEdit: false,
            seanceId: this.$route.params.id,
            successMessage: "",
            errorMessage: "",
            seanceInfo: {
                movieId: 0,
                roomId: 0,
                subtitles: "eesti",
                language: "inglise",
                dateTime: "2023-06-02T19:00"
            }
        }
    },
    methods: {

        getSeance() {
            this.$http.get("/api/v1/seance/admin/" + this.seanceId, {headers: getAuthHeader()})
                .then(response => {
                    this.seanceInfo = response.data;
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        addSeance() {
            this.resetMessageFields();

            if (!this.allFieldsFilled()) {
                this.setErrorMessage("Täida kõik väljad!")
                return;
            }

            this.$http.post("/api/v1/seance", this.seanceInfo, {headers: getAuthHeader()})
                .then(() => {
                    this.successMessage = "Seanss lisatud";
                })
                .catch(error => {
                    this.errorMessage = error.response.data.message;
                })
        },

        editSeance() {
            this.resetMessageFields();

            if (!this.allFieldsFilled()) {
                this.setErrorMessage("Täida kõik väljad!");
                return;
            }

            this.$http.put("/api/v1/seance/" + this.seanceId, this.seanceInfo, {headers: getAuthHeader()})
                .then(() => this.setSuccessMessage("Seanss muudetud"))
                .catch(error => this.errorMessage = error.response.data.message);
        },

        allFieldsFilled() {
            return this.seanceInfo.movieId !== 0 &&
                this.seanceInfo.roomId !== 0 &&
                this.seanceInfo.subtitles !== "" &&
                this.seanceInfo.language !== "" &&
                this.seanceInfo.subtitles !== "";
        },

        resetMessageFields() {
            this.successMessage = "";
            this.errorMessage = "";
        },

        setSuccessMessage(message) {
            this.successMessage = message;
            setTimeout(() => {
                this.successMessage = "";
            }, 5000);
        },

        setErrorMessage(message) {
            this.errorMessage = message;
            setTimeout(() => {
                this.errorMessage = "";
            }, 5000);
        },

        navigateBack() {
            router.push({path: "/admin"});
        },
        updateMovieId(movieId) {
            this.seanceInfo.movieId = movieId;
        },
        updateRoomId(roomId) {
            this.seanceInfo.roomId = roomId;
        }
    },
    mounted() {
        if (this.seanceId !== undefined) {
            this.isEdit = true;
            this.getSeance();
        }
    }
}
</script>

