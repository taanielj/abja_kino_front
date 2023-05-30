<template>
<div class="container">
    <div class="row">
        <div class="col col-6 justify-content-center">
            <div class="col">
                <div class="col">
                    <PurchaseJourneyCard :journey="journey"></PurchaseJourneyCard>
                </div>
                <div class="col ">
                    <SeanceMovieCard
                            :seanceId="seanceId"
                            @event-seance-loaded="setSeanceIdAndShowTicketTypes($event)"
                    />
                </div>
                <div class="col mt-md-5">
                    <SeanceTicketCard ref="seanceTicketCard"
                                      :seanceId="seanceId"
                                      @event-ticket-types-changed="ticketTypes = $event"
                                      :show="showTicketTypes"
                    />
                </div>
                <div v-if="showTicketTypes">
                    <button href="#" @click="navigateToSeats" class="btn btn-secondary btn-lg">Kinnita piletid</button>

                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>


import PurchaseJourneyCard from "@/components/PurchaseJourneyCard.vue";
import SeanceMovieCard from "@/components/SeanceMovieCard.vue";
import SeanceTicketCard from "@/components/SeanceTicketCard.vue";

export default {
    data() {
        return {
            showTicketTypes: false,
            journey: "piletid",
            seanceId: this.$route.params.seanceId,
            ticketTypes: [
                {
                    name: "",
                    price: 0,
                    amount: 0,
                }
            ]
        }
    },
    name: "ChooseTicketView",
    components: {PurchaseJourneyCard, SeanceMovieCard, SeanceTicketCard},
    methods: {
        navigateToSeats() {
            const ticketTypes = this.$refs.seanceTicketCard.ticketTypes;

            if (!ticketTypes.some(ticketType => ticketType.amount > 0)) {
                alert("Vali vähemalt üks pilet!");
                return;
            }
            sessionStorage.setItem("ticketTypes", JSON.stringify(ticketTypes));
            this.$router.push({path: '/select-seats/' + this.seanceId});
        },
        setSeanceIdAndShowTicketTypes(seanceId) {
            this.seanceId = seanceId;
            this.showTicketTypes = true;
        },
    },

}

</script>

<style>
.col-6 {
    width: 50%;
    margin: 0 auto;
    border-bottom: none;
    border-top: none;
    border-left: none;
}

.btn-lg {
    font-size: 20px;
    padding: 10px 20px;
}
</style>
