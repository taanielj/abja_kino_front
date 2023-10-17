<template>
    <div v-if="show" class="container">
        <AlertModal
                :message="errorMessage"
                ref="alertModalRef"
        />
        <div class="row ">
            <div class="col col-7 d-flex justify-content-center">
                <div class="col">
                    <div class="col">
                        <PurchaseJourneyCard :journey="journey"></PurchaseJourneyCard>
                    </div>
                    <div class="col seance-card">
                        <SeanceMovieCard
                                :seanceInfo="seanceInfo"
                                :journey="journey"
                                @event-available-seats="seanceInfo.availableSeats = $event"
                                @event-seance-id="seanceId = $event"
                        />
                    </div>
                    <div class="custom-card">
                        <div class="col">
                            <SeanceTicketCard
                                    ref="seanceTicketCard"
                                    :availableSeats="seanceInfo.availableSeats"
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
    </div>

</template>

<script>
import PurchaseJourneyCard from "@/components/PurchaseJourneyCard.vue";
import SeanceMovieCard from "@/components/SeanceMovieCard.vue";
import SeanceTicketCard from "@/components/SeanceTicketCard.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertModal from "@/components/modal/AlertModal.vue";
import router from "@/router";

export default {
    data() {
        return {
            errorMessage: "",
            show: false,
            journey: "tickets",
            seanceId: this.$route.params.seanceId,
            seanceInfo: {
                seanceId: 0,
                movieId: 0,
                movieTitle: "",
                movieRuntime: 0,
                moviePosterImage: "",
                movieGenreName: "",
                dateTime: "",
                subtitles: "",
                language: "",
                roomName: "",
                movieYoutubeLink: "",
                availableSeats: 0,
                totalSeats: 0,

            },
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
    components: {AlertModal, AlertDanger, PurchaseJourneyCard, SeanceMovieCard, SeanceTicketCard},
    methods: {
        navigateToSeats() {
            const ticketTypes = this.$refs.seanceTicketCard.ticketTypes;

            if (!ticketTypes.some(ticketType => ticketType.amount > 0)) {
                this.openAlertModal("Vali vähemalt üks pilet!")
                return;
            }
            sessionStorage.setItem("ticketTypes", JSON.stringify(ticketTypes));
            //check if total tickets is less than available seats
            if (ticketTypes.reduce((a, b) => a + b.amount, 0) > this.seanceInfo.availableSeats) {
                this.openAlertModal("Saalis pole piisavalt vabu kohti!")
                return;
            }
            this.$router.push({path: '/select-seats/' + this.seanceId});
        },

        openAlertModal(message) {
            this.errorMessage = message;
            this.$refs.alertModalRef.openModal();
        },
        getSeanceInfo() {
            this.$http.get("/api/v1/seance/" + this.seanceId)
                .then(response => {
                    this.seanceInfo = response.data;
                    this.show = true;
                })
                .catch(() => {
                    router.push({path: '/error'})
                })
        }
    },
    mounted() {
        this.getSeanceInfo()
    }
}

</script>

<style scoped>
.col {
    margin: 0 auto;
    border-bottom: none;
    border-top: none;
    border-left: none;
}

.seance-card {
    margin-top: 20px;
    width: 100%;
}

.container {
    margin-bottom: 15%;
}

.custom-card {
    margin-top: 4rem;
    padding: 1.5rem 5rem;
}
</style>
