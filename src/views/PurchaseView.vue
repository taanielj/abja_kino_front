<template>
    <PurchaseConfirmModal
            :formattedSum="formattedSum"
            @purchase-confirmed="postTickets"
            ref="confirmModalRef"
    />
    <div v-if="show" class="container">
        <div class="row">
            <div class="col col-6 justify-content-center">
                <div class="col">
                    <div class="col">
                        <PurchaseJourneyCard :journey="journey"></PurchaseJourneyCard>
                    </div>
                    <div class="col seance-card">
                        <SeanceMovieCard
                                :seanceInfo="seanceInfo"
                                @event-seance-loaded="loadRestOfPage($event)"
                        />
                    </div>
                    <PurchasedTickets
                            @tickets-loaded="formattedSum = $event"
                    />
                    <div class="col col-6 mt-3 mb-xxl-5">
                        <div class="row">
                            <div class="col">
                                <button href="#" @click="cancelPurchase" class="custom-button">
                                    Tühista
                                </button>
                            </div>
                            <div class="col">
                                <button href="#" @click="openConfirmModal" class="custom-button rotate">
                                    Osta
                                </button>
                            </div>
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
import PurchasedTickets from "@/components/PurchasedTickets.vue";
import PurchaseConfirmModal from "@/components/modal/PurchaseConfirmModal.vue";
import {getAuthHeader} from "@/utils";
import router from "@/router";

export default {
    data() {
        return {
            show: false,
            formattedSum: "",
            journey: "purchase",
            seanceId: 0,
            userTickets: [
                {
                    userId: 0,
                    seatCol: 0,
                    seatRow: 0,
                    seanceRoomName: "",
                    seanceId: 0,
                    ticketTypeName: "",
                    ticketPrice: 0,
                    priceFormatted: "",
                }
            ],
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


        }
    },

    name: "PurchaseView",
    components: {PurchaseConfirmModal, PurchasedTickets, PurchaseJourneyCard, SeanceMovieCard, SeanceTicketCard},
    methods: {


        openConfirmModal() {
            this.$refs.confirmModalRef.$refs.modalRef.openModal();
        },

        postTickets() {
            this.$http.post("/api/v1/ticket/purchase", this.userTickets, {headers: getAuthHeader()}
            ).then(() => {
                sessionStorage.removeItem("userTickets");
                router.push({path: "/tickets"});
            }).catch(() => {
                router.push({path: "/error"});
            })
        },

        cancelPurchase() {
            sessionStorage.removeItem("userTickets");
            router.push({path: "/"})
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

    beforeMount() {
        if (sessionStorage.getItem("userTickets") === null) {
            router.push({path: "/"});
        } else {
            this.userTickets = JSON.parse(sessionStorage.getItem("userTickets"));
            this.seanceId = this.userTickets[0].seanceId;
            this.getSeanceInfo();
        }
    }
}

</script>

<style scoped>
.col-6 {
    width: 50%;
    margin: 0 auto;
    border-bottom: none;
    border-top: none;
    border-left: none;
}

.seance-card {
    width: 100%;
    margin-bottom: 5vh;
}

.custom-button {
    border: transparent;
    font-size: 2.6vh;
}

</style>
