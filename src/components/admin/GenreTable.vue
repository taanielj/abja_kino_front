<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Žanr</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(genre, index) in genres" :key="index">
            <td>
                <input v-model="genre.name" type="text" v-if="genre.editing">
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
                    <font-awesome-icon @click="putGenre(genre.id)" class="hoverable-link me-3" :icon="['fas', 'save']"/>
                    <font-awesome-icon @click="cancelEditing(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'times']"/>
                </template>
            </td>
        </tr>
        <tr>
            <td>
                <input v-model="newGenre" type="text" v-if="showInput" class="w-50 form-control">
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
                this.handleGenreError(error);
                if (!this.showInput) {
                    this.newGenre = "";
                }
            })
        },

        putGenre () {
            this.$http.put("/genre/update", null, {
                params: {
                    genreName: this.newGenre
                }
            }).then(() => {
                this.genres.push({id: this.genres.length, name: this.newGenre, editing: false});
                this.newGenre = "";
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

        saveGenre(index) {
            const genre = this.genres[index];
            if (genre.name !== "") {
                genre.editing = false;
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
