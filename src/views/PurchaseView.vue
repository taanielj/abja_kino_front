<template>
    <PurchaseConfirmModal
            :formattedSum="formattedSum"
            @purchase-confirmed="postTickets"
            ref="confirmModalRef"

    />

    <div class="container">
        <div class="row">
            <div class="col col-6 justify-content-center">
                <div class="row">
                    <div class="row">
                        <PurchaseJourneyCard :journey="journey"></PurchaseJourneyCard>
                    </div>
                    <div class="row seance-card ">
                        <SeanceMovieCard
                                :seanceId="seanceId"
                                @event-seance-loaded="loadRestOfPage($event)"
                        />
                    </div>
                    <div class="row">
                        <PurchasedTickets
                            v-if="showRest"
                            @tickets-loaded="formattedSum = $event"
                        />
                    </div>


                    <div class="row mt-4" v-if="showRest">
                        <div class="col">
                            <button href="#" @click="cancelPurchase" class="btn btn-secondary btn-lg me-1">
                                Tühista
                            </button>

                        </div>
                        <div class="col">
                            <button href="#" @click="openConfirmModal" class="btn btn-primary btn-lg">
                                Osta
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
import PurchasedTickets from "@/components/PurchasedTickets.vue";
import PurchaseConfirmModal from "@/components/modal/PurchaseConfirmModal.vue";
import {getAuthHeader} from "@/utils";
import router from "@/router";

export default {
    data() {
        return {
            formattedSum: "",
            showRest: false,
            journey: "ostukorv",
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


        }
    },
    name: "PurchaseView",
    components: {PurchaseConfirmModal, PurchasedTickets, PurchaseJourneyCard, SeanceMovieCard, SeanceTicketCard},
    methods: {

        loadRestOfPage() {
            this.showRest = true;
        },

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
            router.push({path:"/"})
        },

    },
    mounted() {
        this.userTickets = JSON.parse(sessionStorage.getItem("userTickets"));
        this.seanceId = this.userTickets[0].seanceId;
    }

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
