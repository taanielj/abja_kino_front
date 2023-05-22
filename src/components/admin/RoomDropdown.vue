<template>
    <select v-model="selectedRoomId" @change="emitSelectedRoomId" class="form-select"
            aria-label="Default select example">
        <option selected value="0">Kõik saalid</option>
        <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.name }}</option>
    </select>
</template>

<script>
export default {
    name: "RoomDropdown",

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

        getRooms: function () {
            this.$http.get("/room/all")
                .then(response => {
                    this.rooms = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
    },
    beforeMount() {
        this.getRooms()
    }
}
</script>

<style scoped>

</style>