<template>
    <DeleteSeanceModal ref="deleteSeanceRef"
                       :seanceId="selectedSeanceId"
                       @seance-deleted="refreshAndEmitSuccessMessage"
                       @delete-seance-error="setErrorMessage"/>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Seansi Kuupäev</th>
            <th scope="col">Seansi aeg</th>
            <th scope="col">Film</th>
            <th scope="col">Saal</th>
            <th scope="col">Kohti saadaval</th>
            <th scope="col">Kohti kokku</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="seance in seances">
            <td>{{ seance.date }}</td>
            <td> {{ seance.timeHours }}:{{ seance.timeMinutes }}</td>
            <td>{{ seance.movieTitle }}</td>
            <td>{{ seance.roomName }}</td>
            <td>{{ seance   .availableSeats }}</td>
            <td>{{ seance.totalSeats }}</td>
            <td>
                <font-awesome-icon @click="navigateToEditSeance(seance.id)"
                                   class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                <font-awesome-icon @click="openDeleteSeanceModal(seance.id)" class="hoverable-link"
                                   :icon="['fas', 'trash']"/>
            </td>
        </tr>
        <tr>

            <td colspan="7">
                <button class="btn btn-light w-100 admin-button" @click="navigateToAddSeance">Lisa uus seanss</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>

import router from "@/router";
import DeleteMovieModal from "@/components/modal/DeleteMovieModal.vue";
import DeleteSeanceModal from "@/components/modal/DeleteSeanceModal.vue";
import {getAuthHeader} from "@/utils";

export default {
    name: "SeanceTable",
    components: {DeleteSeanceModal, DeleteMovieModal},
    data() {
        return {
            selectedSeanceId: null,
            seances: [
                {
                    id: 0,
                    dateTime: "2023-06-01T01:11",
                    movieTitle: "pealkiri",
                    roomName: "Marss",
                    date: "2023-06-01",
                    timeHours: 0,
                    timeMinutes: 0,
                    availableSeats: 0,
                    totalSeats: 0
                }
            ]
        }
    },

    methods: {
        getAllSeances() {
            this.$http.get("/api/v1/seance/admin-summary", {headers : getAuthHeader()})
                .then(response => {
                    this.seances = response.data
                    this.dateTimeToDateAndTime()
                })
                .catch(() => {
                    this.errorMessage = "Database connection error"
                })
        },

        dateTimeToDateAndTime() {
            this.seances.forEach(seance => {
                seance.date = seance.dateTime.substring(0, 10)
                seance.timeHours = seance.dateTime.substring(11, 13)
                seance.timeMinutes = seance.dateTime.substring(14, 16)
            })
        },

        navigateToAddSeance() {
            router.push("/admin/add-seance")
        },

        openDeleteSeanceModal(seanceId) {
            this.selectedSeanceId = seanceId
            this.$refs.deleteSeanceRef.$refs.modalRef.openModal()
        },

        navigateToEditSeance(seanceId) {
            router.push({path: "/admin/edit-seance/" + seanceId})
        },

        setErrorMessage(errorMessage) {
            this.$emit("seance-table-error", errorMessage)
        },

        setSuccessMessage(successMessage) {
            this.$emit("seance-table-success", successMessage)
        },

        refreshAndEmitSuccessMessage() {
            this.getAllSeances()
            this.$emit("seance-table-success", "Seanss kustutatud")
        },

    },
    mounted() {
        this.getAllSeances()
    }
}
</script>

