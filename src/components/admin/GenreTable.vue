<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Genre</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="genre in genres">
            <td>{{genre.name}}</td>
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
    name: "GenreTable",
    data() {
        return {
            genres: [
                {
                    id: 0,
                    name: "",
                }
            ]
        }
    },
    methods: {
        getGenres: function () {
            this.$http.get("/genre/all")
                .then(response => {
                    this.genres = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    },
    beforeMount() {
        this.getGenres()
    }
}
</script>

<style scoped>

</style>