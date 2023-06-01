<template>

    <div class="row justify-content-center">
        <div class="col col-6">
            <PurchaseJourneyCard :journey="journey"/>
        </div>
    </div>


    <div class="container">
        <h1>
            {{ roomSeance.roomName }}
        </h1>
        <div class="seats">
            <div class="row" v-for="(row, rowIndex) in organizedSeats" :key="`row-${rowIndex}`">
                <div v-for="(seat, seatIndex) in row" :key="`seat-${seatIndex}`" class="seat hoverable-link"
                     :class="{ 'disabled': !seat.available }" @click="toggleSeat(seat)">
                    <img v-if="seat.selected" class="seat-image" src="@/assets/grey_seat.png" alt="Selected_seat"/>
                    <img v-else-if="seat.available" class="seat-image" src="@/assets/green_seat.png"
                         alt="Available seat"/>
                    <img v-else class="seat-image" src="@/assets/red_seat.png" alt="Unavailable seat"/>
                    <div class="seat-number">
                        {{ seat.col }}
                    </div>
                </div>
            </div>
        </div>

        <div class="screen">
            <img src="@/assets/screen.svg" alt="Screen"/>
            <div class="screen-name">
                EKRAAN
            </div>
        </div>

        <!--        buttons: back, confirm seats-->
        <div class="row justify-content-center my-buttons mt-5">
            <div class="col">
                <button class="custom-button" @click="navigateToChooseTickets">Tagasi</button>
            </div>
            <div class="col">
                <button class="custom-button" @click="navigateToConfirm">Kinnita</button>

            </div>


        </div>
    </div>
</template>

<script>


import router from "@/router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {getAuthHeader} from "@/utils";
import PurchaseJourneyCard from "@/components/PurchaseJourneyCard.vue";

export default {
    name: "SelectSeatsView",
    components: {
        PurchaseJourneyCard,
        FontAwesomeIcon
    },

    data() {
        return {
            journey: "seats",
            seanceId: this.$route.params.seanceId,
            boughtTickets: 0,
            roomSeance: {
                roomName: "",
                rows: 0,
                cols: 0,
                seats: [
                    {
                        seatId: 0,
                        row: 0,
                        col: 0,
                        available: false,
                        selected: false,
                    }
                ]
            },

            ticketTypes: [
                {
                    name: "",
                    price: 0,
                    amount: 0,
                }
            ],
            ticketTypeNames: [],
            ticketTypePrices: [],

            userTickets: [
                {
                    userId: 0,
                    seatCol: 0,
                    seatRow: 0,
                    seanceRoomName: "",
                    seanceId: 0,
                    ticketTypeName: "",
                    ticketPrice: 0,
                }
            ],


        }
    },

    computed: {
        organizedSeats() {
            let seats = [];
            for (let i = 1; i <= this.roomSeance.rows; i++) {
                seats[i] = this.roomSeance.seats.filter(seat => seat.row === i);
            }
            return seats;
        }
    },

    methods: {

        navigateToChooseTickets() {
            sessionStorage.removeItem("ticketTypes")
            router.push({path: `/choose-ticket/${this.seanceId}`})
        },

        navigateToConfirm() {
            this.userTickets = this.getSelectedTickets();

            if (this.ticketTypeNames.length !== 0) {
                alert("Vali kõik piletid!")
                return;
            }

            sessionStorage.setItem("userTickets", JSON.stringify(this.userTickets));
            router.push({path: `/confirm-tickets/${this.seanceId}`})
        },

        getSelectedTickets() {
            let selectedTickets = [];
            for (const seat of this.roomSeance.seats) {
                if (seat.selected) {

                    let selectedSeat = {
                        userId: Number(localStorage.getItem("userId")),
                        seatRow: seat.row,
                        seatCol: seat.col,
                        seanceRoomName: this.roomSeance.roomName,
                        seanceId: Number(this.seanceId),
                        ticketTypeName: "",
                        ticketPrice: 0
                    }
                    selectedSeat.ticketTypeName = this.ticketTypeNames[0];
                    selectedSeat.ticketPrice = this.ticketTypePrices[0];
                    this.ticketTypeNames.shift();
                    this.ticketTypePrices.shift();

                    selectedTickets.push(selectedSeat);

                }
            }
            return selectedTickets;
        },

        getRoomSeance() {
            this.$http.get("/api/v1/room/seance/" + this.seanceId, {headers: getAuthHeader()})
                .then(response => {
                    this.roomSeance = response.data;
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        toggleSeat(seat) {
            if (!this.rowSelectedSeats) {
                this.rowSelectedSeats = new Map();
            }

            if (!seat.available) {
                return;
            }

            let selectedSeatsInRow = this.rowSelectedSeats.get(seat.row) || [];
            let allSeatsInRow = this.roomSeance.seats.filter(s => s.row === seat.row && (s.available || s.selected));
            let seatIndex = allSeatsInRow.findIndex(s => s.col === seat.col);
            let nextSeat = allSeatsInRow[seatIndex + 1];
            let previousSeat = allSeatsInRow[seatIndex - 1];

            if (seat.selected && !((nextSeat && nextSeat.selected) && (previousSeat && previousSeat.selected))) {
                seat.selected = false;
                this.boughtTickets++;
                selectedSeatsInRow = selectedSeatsInRow.filter(s => s.col !== seat.col);
                this.rowSelectedSeats.set(seat.row, selectedSeatsInRow);
                return;
            }

            if (this.boughtTickets > 0 && (selectedSeatsInRow.length === 0 || nextSeat?.selected || previousSeat?.selected)) {
                seat.selected = true;
                this.boughtTickets--;
                selectedSeatsInRow.push(seat);
                this.rowSelectedSeats.set(seat.row, selectedSeatsInRow);
            }

        }

    },
    mounted() {
        if (!sessionStorage.getItem("ticketTypes")) {
            this.navigateToChooseTickets()
        } else {
            this.ticketTypes = JSON.parse(sessionStorage.getItem("ticketTypes"));

            this.ticketTypes.forEach(ticketType => {
                this.boughtTickets += ticketType.amount;
            })

            for (let ticketType of this.ticketTypes) {
                while (ticketType.amount > 0) {
                    this.ticketTypeNames.push(ticketType.name)
                    this.ticketTypePrices.push(ticketType.price)
                    ticketType.amount--;
                }
            }



            this.getRoomSeance();
        }

    },
    beforeDestroy() {
        sessionStorage.removeItem("ticketTypes")
    }
}

</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 90%;
}

.seats {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
    width: 100%;
    margin-bottom: 30px;


}

.row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
}

.seat {
    margin-right: 5px;
    flex-shrink: 0;
    width: 40px;
    aspect-ratio: 0.8;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
}

.seat-image {
    object-fit: contain;
    padding: 2px;
}

.screen {
    margin-top: 20px; /* Adjust the margin-top value as needed */
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.seat-number {
    z-index: 1;
    padding: 8px;
    position: absolute;
    /*black text with white glow:*/
    color: black;
    text-shadow: 0 0 8px white;
    font: 12px sans-serif;
}

.screen-name {
    z-index: 1;
    padding: 8px;
    position: absolute;
    /*black text with white glow:*/
    color: black;
    text-shadow: 0 0 8px white;
    transform: perspective(100px) rotateX(60deg);
}

.custom-button{
    border: transparent;
}

</style>
