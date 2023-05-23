<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Seansi aeg</th>
            <th scope="col">Film</th>
            <th scope="col">Saal</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="seance in seances">
            <td>{{ seance.dateTime }}</td>
            <td>{{ seance.movieTitle }}</td>
            <td>{{ seance.roomName }}</td>
            <td>
                <font-awesome-icon @click="navigateToEditAtmLocation(atmLocation.locationId)"
                                   class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                <font-awesome-icon @click="openDeleteLocationModal(atmLocation.locationId)" class="hoverable-link"
                                   :icon="['fas', 'xmark']"/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>


export default {
    name: "SeanceTable",
    data() {
        return {
            seances: [
                {
                    id: 0,
                    dateTime: "2023-06-01T01:11",
                    movieTitle: "pealkiri",
                    roomName: "Marss",
                    date: "2023-06-01",
                    timeHours: 0,
                    timeMinutes: 0,
                }
            ]
        }
    },
    methods: {
        getAllSeances() {
            this.$http.get("/seance/admin-summary")
                .then(response => {
                    this.seances = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        }
    },
    mounted() {
        this.getAllSeances()
    }
}
</script>

<style scoped>

</style>
