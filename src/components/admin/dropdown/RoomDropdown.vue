<template>
    <select v-model="selectedRoomId" @change="emitSelectedRoomId" class="form-select"
            aria-label="Default select example">
        <option selected value="0">Kõik saalid</option>
        <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.name }}</option>
    </select>
</template>

<script>
import {getAuthHeader} from "@/utils";

export default {
    name: "RoomDropdown",
    props: ['room'],
    data() {
        return {
            selectedRoomId: '0',
            rooms: [
                {
                    id: 0,
                    name: ''
                }
            ]
        }
    },
    methods: {

        emitSelectedRoomId() {
            this.$emit('event-emit-selected-room-id', Number(this.selectedRoomId))
        },

        setSelectedRoomId(roomId) {
            this.selectedRoomId = roomId
        },

        getRooms() {
            this.$http.get("/api/v1/room/all", {headers: getAuthHeader()})
                .then(response => {
                    this.rooms = response.data
                })
                .catch(error => {
                       console.log(error)

                })
        },
    },
    watch: {
        room(newRoomId) {
            this.selectedRoomId = newRoomId || 0;
        }
    },
    beforeMount() {
        this.getRooms()
    }
}
</script>

