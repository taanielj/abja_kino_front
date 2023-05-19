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
            <td>{{ seance.timeStamp }}</td>
            <td>{{ seance.movieTitle }}</td>
            <td>{{ seance.room }}</td>
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
                    timeStamp: "kellaaeg",
                    movieTitle: "pealkiri",
                    room: "Marss"
                }
            ]
        }
    },
    methods: {
        getAllSeances: function () {
            this.$http.get("/seance/all")
                .then(response => {
                    this.seances = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    }
}
</script>

<style scoped>

</style>