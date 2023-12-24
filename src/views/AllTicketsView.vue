<template>
<div class="row justify-content-center">
    <div class="row justify-content-center custom-card"
         v-if="activeTickets.length === 0 && expiredTickets.length === 0">
        Te ei ole ostnud ühtegi piletit
    </div>
    <div v-if="activeTickets.length > 0" class="col col-md-auto">
        <div class="card mb-3 custom-card" style="max-width: 80rem;">
            <div class="card-header bg-warning border-success">
                <h2 class="card-title text-center text-black">Aktiivsed piletid</h2>
            </div>
            <div class="card-body text-success">
                <div class="d-inline-flex flex-wrap">
                    <div v-for="ticketInfo in activeTickets" class="m-1">
                        <TicketCard :ticketInfo="ticketInfo" :key="ticketInfo"/>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-transparent border-success">
                <div class="d-grid gap-2 text-bold">
                    <button class="btn btn-primary" type="button">Prindi kõik</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="expiredTickets.length > 0" class="col col-md-auto">
        <div class="card mb-3 custom-card" style="max-width: 80rem;">
            <div class="card-header bg-secondary border-success">
                <h2 class="card-title text-center text-black">Vanad piletid</h2>
            </div>
            <div class="card-body text-success">
                <div class="d-inline-flex flex-wrap">
                    <div v-for="ticketInfo in expiredTickets" class="m-1">
                        <TicketCard :ticketInfo="ticketInfo" :key="ticketInfo"/>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-transparent border-success">
                <div class="d-grid gap-2 text-bold">
                    <button class="btn btn-primary" type="button">Prindi kõik</button>
                </div>
            </div>
        </div>
    </div>
</div>


</template>

<script>

import TicketCard from "@/components/TicketCard.vue";
import router from "@/router";
import {getAuthHeader} from "@/utils";

export default {
    name: "AllTicketsView",
    components: {TicketCard},
    data() {
        return {

            userId: localStorage.userId,
            activeTickets: [
                {
                    seanceMovieTitle: "Pealkiri",
                    seanceStartTime: "",
                    seanceRoomName: "Saali nimi",
                    ticketTypeName: "Soodus",
                    seatRow: 0,
                    seatCol: 0

                }
            ],
            expiredTickets: [
                {
                    seanceMovieTitle: "Pealkiri",
                    seanceStartTime: "",
                    seanceRoomName: "Saali nimi",
                    ticketTypeName: "Soodus",
                    seatRow: 0,
                    seatCol: 0
                }
            ],


        }


    },

    methods: {
        getActiveTickets() {
            this.$http.get("/api/v1/ticket/all-active-by-user/" + this.userId, {headers: getAuthHeader()})
                    .then(response => {
                        this.activeTickets = response.data
                    })
                    .catch(() => {
                        router.push({path: "/error"})
                    })
        },

        getExpiredTickets() {
            this.$http.get("/api/v1/ticket/all-expired-by-user/" + this.userId, {headers: getAuthHeader()})
                    .then(response => {
                        this.expiredTickets = response.data
                    })
                    .catch(() => {
                        router.push({path: "/error"})
                    })
        },
    },

    mounted() {
        this.getActiveTickets();
        this.getExpiredTickets();
    }
}
</script>

<style scoped>
.custom-card {
    margin: 2vh;
    padding: 2vh;
}
</style>

