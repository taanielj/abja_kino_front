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
                            <div v-for="tickedId in ticketIds">
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
                            <div v-for="tickedId in ticketIds">
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

export default {
    name: "AllTicketsView",
    components: {TicketCard},
    data() {
        return {
            show: true,
            userId: sessionStorage.userId,
            ticketIds: [0]

        }


    },
    methods: {
        getTicketIds() {

        },
    },
    mounted() {
        this.getTicketIds();
    }
}
</script>

<style scoped>

</style>