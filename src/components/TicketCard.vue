<template>
    <div class="text-black">
        <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header bg-transparent border-success">
                <h2 class="card-title">{{ ticketInfo.movieTitle }}</h2>
            </div>
            <div class="card-body text-success text-black">
                <p class="card-text">{{date}} | {{hours}}:{{minutes}}</p>
                <p class="card-text">{{ticketInfo.roomName}}</p>
                <p class="card-text">Rida: {{ticketInfo.row}}, Koht: {{ticketInfo.col}}</p>
            </div>
            <div class="card-footer bg-transparent border-success">
                {{ticketInfo.ticketTypeName}}
            </div>
        </div>
    </div>

</template>

<script>
import router from "@/router";

export default {
    name: "TicketCard",
    props: {
        ticketId: 0
    },
    data() {
        return {
            ticketInfo: {
                seanceMovieTitle: "Pealkiri",
                seanceDateTime: Date,
                seanceRoomName: "Saali nimi",
                ticketTypeName: "Soodus",
                seatRow: 0,
                seatCol: 0
            },
            date: "dd/mm/yyyy",
            hours: 0,
            minutes: 0
        }
    },
    methods: {
        getTicket() {
            this.$http.get("/ticket/" + this.ticketId)
                .then(response => {
                    this.ticketInfo = response;
                })
                .catch(() => {
                    router.push({path:"/error"})
                })
        },
    },
    mounted() {
        if(this.ticketId !== 0) {
            this.getTicket();
        }
    }
}
</script>

<style scoped>

</style>