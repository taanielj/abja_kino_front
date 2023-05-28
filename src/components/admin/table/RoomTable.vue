<template>
    <table class="table">
        <colgroup>
            <col style="rcawidth: 20%">
            <col style="width: 20%">
            <col style="width: 20%">
            <col style="width: 20%">
            <col style="width: 10%">
        </colgroup>
        <thead>
        <tr>
            <th scope="col">Saal</th>
            <th scope="col">Ridade arv</th>
            <th scope="col">Istekohti reas</th>
            <th scope="col">Istekohti saalis</th>
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
                <input v-model="room.rows" type="number" v-if="room.editing" class="w-50 input-field">
                <span v-else>{{ room.rows }}</span>
            </td>
            <td>
                <input v-model="room.cols" type="number" v-if="room.editing" class="w-50 input-field">
                <span v-else>{{ room.cols }}</span>
            </td>
            <td>
                <span>{{ totalSeats[index] }}</span>
            </td>
            <td>
                <template v-if="!room.editing">
                    <font-awesome-icon @click="toggleEditRoom(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'edit']"/>
                    <font-awesome-icon @click="deleteRoom(room.id)" class="hoverable-link me-3"
                                       :icon="['fas', 'trash']"/>
                </template>
                <template v-else>
                    <font-awesome-icon @click="editRoom(room.id)" class="hoverable-link me-3" :icon="['fas', 'save']"/>
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

            </td>
            <td v-else></td>
            <td v-if="showInput">
                <input v-model="newRoom.rows" type="number" class="w-50 input-field ">
            </td>
            <td v-else></td>
            <td v-if="showInput">
                <input v-model="newRoom.cols" type="number" class="w-50 input-field">
            </td>
            <td v-else></td>
            <td v-if="showInput"></td>

            <td>
                <template v-if="showInput">
                    <font-awesome-icon @click="addNewRoom" class="hoverable-link me-3" :icon="['fas', 'save']"/>
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
import {getAuthHeader} from "@/utils";

export default {
    name: "RoomTable",
    components: {FontAwesomeIcon, AlertDanger, Alert},
    computed: {
        totalSeats() {
            return this.rooms.map(room => room.rows * room.cols);
        }
    },
    data() {
        return {
            errorMessage: "",
            rooms: [
                {
                    id: 0,
                    name: "",
                    rows: 0,
                    cols: 0,
                    editing: false
                }
            ],
            newRoom: {
                id: 0,
                name: "",
                rows: 1,
                cols: 1,
            },
            showInput: false
        }


    },
    methods: {
        getAllRooms() {
            this.$http.get("/api/v1/room/all", {headers: getAuthHeader()})
                    .then(response => {
                        this.rooms = response.data;
                        this.totalSeats = this.rows * this.cols;
                    })
                    .catch(() => {
                        this.errorMessage = "Database connection error";
                    })
        },

        editRoom(roomId) {
            const room = this.rooms.find(room => room.id === roomId);
            if (!this.validateFieldsFilled(room)) {
                return;
            }


            this.putRoom(room);
        },

        addNewRoom() {
            if (!this.validateFieldsFilled(this.newRoom)) {
                return;
            }

            this.postRoom();
        },

        postRoom() {
            this.$http.post("/api/v1/room", this.newRoom, {headers: getAuthHeader()})
                    .then(() => this.resetFields())
                    .catch(error => {
                        this.handleRoomError(error);
                        this.resetFields();
                    })
        },

        putRoom(room) {
            this.$http.put("/api/v1/room/" + room.id, room, {headers: getAuthHeader()})
                    .then(() => {
                        room.editing = false;
                        this.$emit("room-table-success")
                        this.getAllRooms();
                    })
                    .catch(error => this.handleRoomError(error))
        },


        deleteRoom(index) {
            this.$http.delete("/api/v1/room/" + (index), {headers: getAuthHeader()})
                    .then(() => this.getAllRooms())
                    .catch(error => this.handleRoomError(error))
        },

        resetFields() {
            this.newRoom = {
                name: "",
                rows: 1,
                cols: 1,
            }
            this.showInput = false;
            this.getAllRooms()
        },

        validateFieldsFilled(room) {
            this.errorMessage = "";
            if (room.name.trim() !== "" && room.rows !== 0 && room.cols !== 0) {
                return true;
            }
            this.errorMessage = "Kõik väljad peavad olema täidetud!";
            this.$emit("room-table-error", this.errorMessage);
            return false;
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
            this.newRoom = {
                name: "",
                rows: 1,
                cols: 1,
            }
            this.showInput = false;
        },

        handleRoomError(error) {
            if (error.response.status === 400 || error.response.status === 409) {
                this.errorMessage = error.response.data.message
                this.$emit("room-table-error", this.errorMessage)
            } else {
                router.push({path: "/error"})
            }
        },

        toggleInput() {
            this.showInput = !this.showInput;
            if (!this.showInput) {
                this.newRoom = {
                    name: "",
                    rows: 1,
                    cols: 1,
                };
            }
        }

    },
    beforeMount() {
        this.getAllRooms();
    },

    watch: {
        "newRoom.rows"(newVal) {
            if (newVal < 1) {
                this.newRoom.rows = 1;
            }
        },
        "newRoom.cols"(newVal) {
            if (newVal < 1) {
                this.newRoom.cols = 1;
            }
        },
        rooms: {
            handler(editedRooms) {
                editedRooms.forEach((room, index) => {
                    if (room.rows < 1) {
                        room.rows = 1;
                        this.rooms.splice(index, 1, room);
                    }
                    if (room.cols < 1) {
                        room.cols = 1;
                        this.rooms.splice(index, 1, room);
                    }
                });
            },
            deep: true
        }
    }
}
</script>
<style scoped>
.input-field {
    border-radius: 5px;
}
</style>
