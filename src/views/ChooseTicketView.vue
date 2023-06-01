<template>
    <div class="container">

        <div class="row ">
            <div class="col col-7 d-flex justify-content-center">
                <div class="col">
                    <div class="col">
                        <PurchaseJourneyCard :journey="journey"></PurchaseJourneyCard>
                    </div>
                    <div class="col seance-card">
                        <SeanceMovieCard
                                :seanceId="seanceId"
                                :journey="journey"
                                @event-seance-loaded="show = true"
                                @event-available-seats="availableSeats = $event"
                                @event-seance-id="seanceId = $event"
                        />
                    </div>
                    <div  class="mt-2" >
                        <AlertDanger style="margin: 1vh; max-width: 100%" :message="errorMessage"/>

                    </div>

                    <div class="col mt-md-5">
                        <SeanceTicketCard
                                ref="seanceTicketCard"
                                :seanceId="seanceId"
                                :availableSeats="availableSeats"
                                @event-ticket-types-changed="ticketTypes = $event"
                                :show="show"
                        />
                    </div>
                    <div v-if="show">
                        <button href="#" @click="navigateToSeats" class="custom-button">Kinnita piletid
                        </button>
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
import AlertDanger from "@/components/alert/AlertDanger.vue";


export default {
    data() {
        return {
            errorMessage: "",
            availableSeats: 0,
            show: false,
            journey: "tickets",
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
    components: {AlertDanger, PurchaseJourneyCard, SeanceMovieCard, SeanceTicketCard},
    methods: {
        navigateToSeats() {
            const ticketTypes = this.$refs.seanceTicketCard.ticketTypes;

            if (!ticketTypes.some(ticketType => ticketType.amount > 0)) {
                this.setErrorMessage("Vali vähemalt üks pilet!")
                return;
            }
            sessionStorage.setItem("ticketTypes", JSON.stringify(ticketTypes));
            //check if total tickets is less than available seats
            if (ticketTypes.reduce((a, b) => a + b.amount, 0) > this.availableSeats) {
                this.setErrorMessage("Saalis pole piisavalt vabu kohti!")
                return;
            }

            this.$router.push({path: '/select-seats/' + this.seanceId});
        },

        setErrorMessage(message) {
            this.errorMessage = message;
            setTimeout(() => {
                this.errorMessage = "";
            }, 3500);
        }


    },

}

</script>

<style scoped>
.col {
    margin: 0 auto;
    border-bottom: none;
    border-top: none;
    border-left: none;
}

.btn-lg {
    font-size: 20px;
    padding: 10px 20px;
}

.seance-card {
    margin-top: 20px;
    width: 100%;
}

.btn {
    margin-top: -80px
}

</style>
