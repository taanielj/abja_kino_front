<template>


    <div class="container text-center">
        <div class="row">
            <h1 class="text-black bigger-text bold-text">
                Minu piletid
            </h1>
            <div class="row justify-content-center"
                 v-if="activeTicketIds.length === 0 && expiredTicketIds.length === 0">
                Te ei ole ostnud ühtegi piletit
            </div>
            <div v-if="activeTicketIds.length > 0" class="col col-md-auto">
                <div class="card border-success mb-3" style="max-width: 80rem;">
                    <div class="card-header bg-warning border-success">
                        <h2 class="card-title text-center text-black">Aktiivsed piletid</h2>
                    </div>
                    <div class="card-body text-success">
                        <div class="d-inline-flex flex-wrap">
                            <div v-for="tickedId in activeTicketIds" class="m-1">
                                <TicketCard :ticketId="tickedId" :key="tickedId"/>
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
            <div v-if="expiredTicketIds.length > 0" class="col col-md-auto">
                <div class="card border-success mb-3" style="max-width: 80rem;">
                    <div class="card-header bg-secondary border-success">
                        <h2 class="card-title text-black">Kasutatud piletid</h2>
                    </div>
                    <div class="d-inline-flex flex-wrap">
                        <div class="card-body text-success">
                            <div v-for="tickedId in expiredTicketIds" class="m-1">
                                <TicketCard :ticketId="tickedId" :key="tickedId"/>
                            </div>
                        </div>
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
            activeTicketIds: [0],
            expiredTicketIds: [0]


        }


    },
    methods: {

        getActiveTicketIds() {
            this.$http.get("/api/v1/ticket/all-active-ids-by-user/" + this.userId, {headers: getAuthHeader()})
                .then(response => {
                    this.activeTicketIds = response.data
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        getExpiredTicketIds() {
            this.$http.get("/api/v1/ticket/all-expired-ids-by-user/" + this.userId, {headers: getAuthHeader()})
                .then(response => {
                    this.expiredTicketIds = response.data
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },
    },
    mounted() {
        this.getActiveTicketIds();
        this.getExpiredTicketIds();
    }
}
</script>

