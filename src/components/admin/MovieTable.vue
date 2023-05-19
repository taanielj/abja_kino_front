<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Film</th>
            <th scope="col">Žanr</th>
            <th scope="col">Seansside arv</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="movie in movies">
            <td>{{movie.title}}</td>
            <td>{{movie.genreName}}</td>
            <td>{{movie.numberOfSeances}}</td>
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
    name: "MovieTable",
    data() {
        return {
            movies: [
                {
                    id: 0,
                    title: "default",
                    genreName: "default",
                    numberOfSeances: 0,

                }
            ]
        }
    },
    methods: {
        getAllMovies() {
            this.$http.get("/movie/admin-summary")
                .then(response => {
                    this.movies = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    },
    beforeMount() {
        this.getAllMovies()
    }

}
</script>

<style scoped>

</style>