<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Saal</th>
            <th scope="col">Seansside arv</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="room in rooms">
            <td>{{ room.name }}</td>
            <td>{{ room.numberOfSeances}}</td>
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
    name: "RoomTable",
    data() {
        return {
            rooms: [
                {
                    id: 0,
                    name: "Marss",
                    numberOfSeances: 0,
                }
            ]
        }
    },
    methods: {
        getAllRooms: function () {
            this.$http.get("/room/all")
                .then(response => {
                    this.rooms = response.data
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