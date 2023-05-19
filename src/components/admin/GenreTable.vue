<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Žanr</th>
            <th scope="col">Tegevus</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(genre, index) in genres" :key="index">
            <td>
                <input v-model="genre.name" type="text" v-if="genre.name === '' && !genre.editing">
                <span v-else>{{ genre.name }}</span>
            </td>
            <td>
                <template v-if="genre.name === '' && !genre.editing">
                    <font-awesome-icon @click="editGenre(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'pen']"/>
                    <font-awesome-icon @click="deleteGenre(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'trash']"/>
                </template>
                <template v-else>
                    <font-awesome-icon @click="saveGenre(index)" class="hoverable-link me-3" :icon="['fas', 'edit']"/>
                    <font-awesome-icon @click="cancelEditing(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'times']"/>
                </template>
            </td>
        </tr>
        <tr>
            <td>
                <input v-model="newGenre" type="text" v-if="showInput" class="form-control">
            </td>
            <td>
                <template v-if="showInput">
                    <button @click="addGenre" type="button" class="btn btn-outline-dark ">Salvesta</button>
                </template>
                <template v-else>
                    <font-awesome-icon @click="toggleInput" class="hoverable-link me-3" :icon="['fas', 'plus']"/>
                </template>

            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import index from "vuex";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
    name: "GenreTable",
    components: {FontAwesomeIcon},
    computed: {
        index() {
            return index
        }
    },
    data() {
        return {
            genres: [
                {
                    id: 0,
                    name: "",
                    editing: false
                }
            ],
            newGenre: "",
            showInput: false
        }
    },
    methods: {
        getGenres() {
            this.$http.get("/genre/all")
                .then(response => {
                    this.genres = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
        postGenre: function () {
            this.$http.post("/genre/add", null, {
                    params: {
                        genreName: this.newGenre
                    }
                }
            ).then(() => {
                this.genres.push({id: this.genres.length, name: this.newGenre, editing: false});
                this.newGenre = "";
            }).catch(error => {
                const errorResponseBody = error.response.data
            })
        },

        addGenre() {
            if (this.showInput && this.newGenre.trim() !== "") {
                this.postGenre();
            }
            this.showInput = false;
        },
        editGenre(index) {
            this.genres[index].editing = true;
        },
        saveGenre(index) {
            const genre = this.genres[index];
            if (genre.name !== "") {
                genre.editing = false;
            }

        },
        cancelEditing(index) {
            const genre = this.genres[index];
            if (genre.name === "") {
                this.genres.splice(index, 1);
            } else {
                genre.editing = false;
            }
        },
        deleteGenre(index) {
            this.genres.splice(index, 1);
        },
        toggleInput() {
            this.showInput = !this.showInput;
        }
    },
    beforeMount() {
        this.getGenres()
    }
}
</script>