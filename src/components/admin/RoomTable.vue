<template>
    <table class="table">
        <colgroup>
            <col style="width: 20%">
            <col style="width: 20%">
            <col style="width: 20%">
            <col style="width: 20%">
            <col style="width: 20%">
        </colgroup>
        <thead>
        <tr>
            <th scope="col">Saal</th>
            <th scope="col">Seansside arv</th>
            <th scope="col">Ridade arv</th>
            <th scope="col">Istekohtade arv reas</th>
            <th scope="col">Istekohti kokku</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(room, index) in rooms" :key="room.id" class="text-center">
            <td>
                <input v-model="room.name" type="text" v-if="room.editing" class="w-50 input-field">
                <span v-else>{{ room.name }}</span>
            </td>
            <td>
                <input v-model="room.numberOfSeances" type="number" v-if="room.editing" class="w-50 input-field">
                <span v-else>{{ room.numberOfSeances }}</span>
            </td>
            <td>
                <input v-model="room.numberOfRows" type="number" v-if="room.editing" class="w-50 input-field">
                <span v-else>{{ room.numberOfRows }}</span>
            </td>
            <td>
                <input v-model="room.numberOfSeats" type="number" v-if="room.editing" class="w-50 input-field">
                <span v-else>{{ room.numberOfSeats }}</span>
            </td>
            <td>
                <template v-if="!room.editing">
                    <font-awesome-icon @click="toggleEditRoom(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'edit']"/>
                    <font-awesome-icon @click="deleteRoom(room.id)" class="hoverable-link me-3"
                                       :icon="['fas', 'trash']"/>
                </template>
                <template v-else>
                    <font-awesome-icon @click="putRoom(room.id)" class="hoverable-link me-3" :icon="['fas', 'save']"/>
                    <font-awesome-icon @click="cancelEditing(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'times']"/>
                </template>
            </td>
        </tr>
        <tr class="text-center">
            <td v-if="showInput">
                <input v-model="newRoom.name" type="text" class="w-50 input-field">
            </td>
            <td v-else></td>
            <td v-if="showInput">
                <input v-model="newRoom.numberOfSeances" type="text" class="w-50 input-field">
            </td>
            <td v-else></td>
            <td v-if="showInput">
                <input v-model="newRoom.rows" type="text" class="w-50 input-field ">
            </td>
            <td v-else></td>
            <td v-if="showInput">
                <input v-model="newRoom.seats" type="text" class="w-50 input-field">
            </td>
            <td v-else></td>
            <td>
                <template v-if="showInput">
                    <font-awesome-icon @click="addRoom" class="hoverable-link me-3" :icon="['fas', 'save']"/>
                    <font-awesome-icon @click="toggleInput" class="hoverable-link me-3" :icon="['fas', 'times']"/>
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
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Alert from "@/components/alert/Alert.vue";
import router from "@/router";

export default {
    name: "RoomTable",
    components: {FontAwesomeIcon, AlertDanger, Alert},
    data() {
        return {
            errorMessage: "",
            rooms: [
                {
                    id: 0,
                    name: "Marss",
                    numberOfSeances: 0,
                    rows: 0,
                    seats: 0,
                }
            ],
            newRoom: "",
            showInput: false
        }


    },
    methods: {
        getAllRooms() {
            this.$http.get("/room/all")
                .then(response => {
                    this.rooms = response.data;
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },

        postRoom() {
            this.$http.post("/room/add", null, {
                params: {
                    name: this.newRoom.name,
                    numberOfSeances: this.newRoom.numberOfSeances,
                    numberOfRows: this.newRoom.numberOfRows,
                    numberOfSeats: this.newRoom.numberOfSeats,
                }
            }).then(() => {
                this.rooms.push(this.newRoom)
                this.newRoom = "";
            }).catch(error => {
                this.handleRoomError(error);
                if (!this.showInput) {
                    this.newRoom = "";
                }
            })
        },
        putRoom() {
            this.$http.put("/room/update", null, {
                params: {
                    id: this.newRoom.id,
                    name: this.newRoom.name,
                    numberOfRows: this.newRoom.numberOfRows,
                    numberOfSeats: this.newRoom.numberOfSeats,
                }
            }).then(() => {
                this.rooms.push(this.newRoom)
                this.newRoom = "";
            }).catch(error => {
                this.handleRoomError(error);
                if (!this.showInput) {
                    this.newRoom = "";
                }
            })
        },

        addRoom() {
            if (this.newRoom.name === "") {
                this.errorMessage = "Saali nimi ei tohi olla tühi"
                this.$emit("event-error-message", this.errorMessage)
            } else if (this.newRoom.numberOfSeances === "") {
                this.errorMessage = "Seansside arv ei tohi olla tühi"
                this.$emit("event-error-message", this.errorMessage)
            } else if (this.newRoom.numberOfRows === "") {
                this.errorMessage = "Ridade arv ei tohi olla tühi"
                this.$emit("event-error-message", this.errorMessage)
            } else if (this.newRoom.numberOfSeats === "") {
                this.errorMessage = "Istekohtade arv ei tohi olla tühi"
                this.$emit("event-error-message", this.errorMessage)
            } else {
                this.postRoom()
            }
        },
        toggleEditRoom(index) {
            if (index === undefined) {
                this.showInput = !this.showInput
            } else {
                this.rooms[index].editing = !this.rooms[index].editing
            }
        },
        cancelEditing(index) {
            const room = this.rooms[index]
            if (room.name === undefined) {
                this.rooms.splice(index, 1)
            } else {
                room.editing = false
            }
            this.newRoom = ""
            this.showInput = false;
        },

        handleRoomError(error) {
            if (error.response.status === 400) {
                this.errorMessage = error.response.data.message
                this.$emit("event-error-message", this.errorMessage)
            } else {
                router.push({path: "/error"})
            }
        },
        deleteRoom(id) {
            this.$http.delete("/room/" + (id))

                .then(() => {
                    this.rooms.splice(index, 1)
                    this.getAllRooms()
                }).catch(error => {
                this.handleRoomError(error)
            })
        },
        toggleInput() {
            this.showInput = !this.showInput;
            if (!this.showInput) {
                this.newRoom = "";
            }
        },

    },
    beforeMount() {
        this.getAllRooms();
    }
}
</script>
<style scooped>
.input-field{
    border-radius: 5px;
}
</style>