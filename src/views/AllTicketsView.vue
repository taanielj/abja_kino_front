<template>
    <div v-if="show">
        <div class="container text-center">
            <div class="row">
                <h1 class="text-black bigger-text bold-text">
                    Minu piletid
                </h1>
                <div class="col col-md-auto">
                    <div class="card border-success mb-3" style="max-width: 80rem;">
                        <div class="card-header bg-warning border-success">
                            <h2 class="card-title text-black bold-text">Aktiivsed piletid</h2>
                        </div>
                        <div class="card-body text-success">
                            <div v-for="tickedId in activeTicketIds">
                                <TicketCard :ticketId="tickedId" :key="tickedId"/>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent border-success">
                            <div class="d-grid gap-2 text-bold">
                                <button class="btn btn-primary" type="button">Prindi kõik</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-md-auto">
                    <div class="card border-success mb-3" style="max-width: 80rem;">
                        <div class="card-header bg-secondary border-success">
                            <h2 class="card-title text-black bold-text">Kasutatud piletid</h2>
                        </div>
                        <div class="card-body text-success">
                            <div v-for="tickedId in expiredTicketIds">
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

export default {
    name: "AllTicketsView",
    components: {TicketCard},
    data() {
        return {
            show: true,
            userId: localStorage.userId,
            activeTicketIds: [0],
            expiredTicketIds: [0]



        }


    },
    methods: {

        getActiveTicketIds() {
            this.$http.get("/ticket/all-active-ids-by-user/" + this.userId)
                .then(response => {
                    this.activeTicketIds = response.data
                })
                .catch(() => {
                    router.push({path:"/error"})
                })
        },

        getExpiredTicketIds() {
            this.$http.get("/ticket/all-expired-ids-by-user/" + this.userId)
                .then(response => {
                    this.expiredTicketIds = response.data
                })
                .catch(() => {
                    router.push({path:"/error"})
                })
        },
    },
    mounted() {
        this.getActiveTicketIds();
        this.getExpiredTicketIds();
    }
}
</script>

<style scoped>

</style>
