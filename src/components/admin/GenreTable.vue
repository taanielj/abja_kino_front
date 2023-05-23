<template>
    <table class="table">
        <colgroup>
            <col style="width: 60%">
            <col style="width: 40%">
        </colgroup>
        <thead>
        <tr>
            <th scope="col">Žanr</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(genre, index) in genres" :key="index" class="text-center">
            <td class="text-center">
                <input v-model="genre.name" type="text" v-if="genre.editing" class="w-50 ">
                <span v-else>{{ genre.name }}</span>
            </td>
            <td>
                <template v-if="!genre.editing">
                    <font-awesome-icon @click="toggleEditGenre(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'edit']"/>
                    <font-awesome-icon @click="deleteGenre(genre.id)" class="hoverable-link me-3"
                                       :icon="['fas', 'trash']"/>
                </template>
                <template v-else>
                    <font-awesome-icon @click="saveGenre(genre.id)" class="hoverable-link me-3" :icon="['fas', 'save']"/>
                    <font-awesome-icon @click="cancelEditing(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'times']"/>
                </template>
            </td>
        </tr>
        <tr class="text-center">
            <td>
                <input v-model="newGenre" type="text" v-if="showInput" class="w-50 input-field">
            </td>
            <td>
                <template v-if="showInput">
                    <font-awesome-icon @click="addGenre" class="hoverable-link me-3" :icon="['fas', 'save']"/>
                    <font-awesome-icon @click="toggleInput" class="hoverable-link me-3"
                                       :icon="['fas', 'times']"/>
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
import AlertDanger from "@/components/alert/AlertDanger.vue";
import alert from "@/components/alert/Alert.vue";
import router from "@/router";

export default {
    name: "GenreTable",
    components: {FontAwesomeIcon, AlertDanger, alert},
    computed: {
        index() {
            return index
        }
    },
    data() {
        return {
            errorMessage: "",
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
                    this.handleGenreError(error)
                })
        },
        postGenre () {
            this.$http.post("/genre/add", null, {
                    params: {
                        genreName: this.newGenre
                    }
                }
            ).then(() => {
                this.getGenres();
                this.newGenre = "";
            }).catch(error => {
                this.handleGenreError(error);
                if (!this.showInput) {
                    this.newGenre = "";
                }
            })
        },

        putGenre (genre) {
            this.$http.put("/genre/" + genre.id, null,  {

                params: {
                    genreName: genre.name
                }
            }).then(() => {
                genre.editing = false;
                this.getGenres();
            }).catch(error => {
                this.handleGenreError(error);
                if (!this.showInput) {
                    this.newGenre = "";
                }
            })
        },

        addGenre() {
            if (this.showInput && this.newGenre.trim() !== "") {
                this.postGenre();
                this.getGenres();
            }
            this.showInput = false;
        },

        saveGenre(genreId) {
            const genre = this.genres.find((g) => g.id === genreId);
            if (genre && genre.name !== "") {
                this.putGenre(genre);
                this.getGenres();
            }
        },

        toggleEditGenre(index) {
            this.genres[index].editing = !this.genres[index].editing;
        },

        cancelEditing(index) {
            const genre = this.genres[index];
            if (genre.name === "") {
                this.genres.splice(index, 1);
            } else {
                genre.editing = false;
            }
            this.newGenre = "";
            this.showInput = false;

        },
        handleGenreError(error) {
            if (error.response.status === 409 || error.response.status === 400) {
                this.errorMessage = error.response.data.message;
                this.$emit("event-error-message", this.errorMessage);
            }else {
                router.push({path: '/error'})
            }

        },
        deleteGenre(index) {
            this.$http.delete("/genre/"+ (index))
                .then(() => {
                    this.genres.splice(index, 1);
                    this.getGenres();
                })
                .catch(error => {
                    this.handleGenreError(error);
                })


        },
        toggleInput() {
            this.showInput = !this.showInput;
            if (!this.showInput) {
                this.newGenre = "";
            }
        },

    },
    beforeMount() {
        this.getGenres()
    }
}
</script>
<style>
.input-field{
    border-radius: 5px;
}
</style>

