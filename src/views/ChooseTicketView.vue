<template>

    <div class="col col-6 justify-content-center">
        <div class="col">
            <div class="col">
                <SeanceNavbarCard :seanceId="seanceId"></SeanceNavbarCard>
            </div>
            <div class="col ">
                <SeanceMovieCard
                        :seanceId="seanceId"
                        @event-seance-loaded="seanceId = $event"
                />
            </div>
            <div class="col mt-md-5">
                <SeanceTicketCard ref="seanceTicketCard"
                                  :seanceId="seanceId"
                                  @event-ticket-types-changed="ticketTypes = $event"
                />
            </div>
            <div>
                <button href="#" @click="navigateToSeats" class="btn btn-secondary btn-lg">Kinnita piletid</button>

            </div>
        </div>
    </div>
</template>

<script>


import SeanceNavbarCard from "@/components/SeanceNavbarCard.vue";
import SeanceMovieCard from "@/components/SeanceMovieCard.vue";
import SeanceTicketCard from "@/components/SeanceTicketCard.vue";

export default {
    data() {
        return {
            seanceId: 0,
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
    components: {SeanceNavbarCard, SeanceMovieCard, SeanceTicketCard},
    methods: {
        navigateToSeats() {
            const ticketTypes = this.$refs.seanceTicketCard.ticketTypes;

            if (!ticketTypes.some(ticketType => ticketType.amount > 0)) {
                alert("Vali vähemalt üks pilet!");
                return;
            }
            sessionStorage.setItem("ticketTypes", JSON.stringify(ticketTypes));
            this.$router.push({path: '/select-seats/' + this.seanceId});
        }
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
