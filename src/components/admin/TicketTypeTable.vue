<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Ticket Type</th>
            <th scope="col">Hind</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="ticketType in ticketTypes">
            <td>{{ticketType.name}}</td>
            <td>{{ticketType.price}}</td>
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
    name: "TicketTypeTable",
    data() {
        return {
            ticketTypes: [
                {
                    id: 0,
                    name: "",
                    price: 0,
                }
            ]
        }
    },

    methods: {
        getTicketTypes: function () {
            this.$http.get("/ticket/types")
                .then(response => {
                    this.ticketTypes = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    },
    beforeMount() {
        this.getTicketTypes()
    }
}
</script>

<style scoped>

</style>