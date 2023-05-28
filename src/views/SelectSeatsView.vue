<template>
    <div class="title">
        <div class="row justify-content-center">
            <h1>
                {{ roomSeance.roomName }}
            </h1>
            <h2>
                Vali istekoht
            </h2>
        </div>
    </div>
    <div class="container">

        <div class="seats">
            <div class="row" v-for="(row, rowIndex) in organizedSeats" :key="`row-${rowIndex}`">
                <div v-for="(seat, seatIndex) in row" :key="`seat-${seatIndex}`" class="seat hoverable-link"
                     :class="{ 'disabled': !seat.available }" @click="selectSeat(seat)">
                    <img v-if="seat.selected" class="seat-image" src="@/assets/grey_seat.png" alt="Selected_seat"/>
                    <img v-else-if="seat.available" class="seat-image" src="@/assets/green_seat.png"
                         alt="Available seat"/>
                    <img v-else class="seat-image" src="@/assets/red_seat.png" alt="Unavailable seat"/>
                    <div class="seat-number">
                        {{ seat.col + 1 }}
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
    </div>
</template>

<script>


import router from "@/router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {getAuthHeader} from "@/utils";

export default {
    name: "SelectSeatsView",
    components: {
        FontAwesomeIcon
    },

    data() {
        return {
            seanceId: this.$route.params.seanceId,

            roomSeance: {
                roomName: "",
                rows: 0,
                cols: 0,
                seats: [
                    {
                        row: 0,
                        col: 0,
                        available: false,
                        selected: false,
                    }
                ]
            },

            ticketInfo: {
                ticketTypeId: 0,
                seatId: 0,
                seanceId: 0,
            }

        }
    },

    computed: {
        organizedSeats() {
            let seats = [];
            for (let i = 0; i < this.roomSeance.rows; i++) {
                seats[i] = this.roomSeance.seats.filter(seat => seat.row === i);
            }
            return seats;
        }
    },

    methods: {
        getRoomSeance() {
            this.$http.get("/api/v1/room/seance/" + this.seanceId, {headers: getAuthHeader()})
                .then(response => {
                    this.roomSeance = response.data;
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        selectSeat(seat) {

            let selectedSeats = this.roomSeance.seats.filter(s => s.selected);


            if (seat.selected) {
                let selectedSeatsInSameRow = selectedSeats.filter(s => s.row === seat.row);

                if (selectedSeatsInSameRow.length > 1) {
                    let minCol = Math.min(...selectedSeatsInSameRow.map(s => s.col));
                    let maxCol = Math.max(...selectedSeatsInSameRow.map(s => s.col));

                    if (seat.col === minCol || seat.col === maxCol) {
                        seat.selected = false;
                    }
                } else {

                    seat.selected = false;
                }
            } else {

                if (selectedSeats.length > 0) {
                    let selectedSeatsInSameRow = selectedSeats.filter(s => s.row === seat.row);

                    if (selectedSeatsInSameRow.length > 0) {
                        let minCol = Math.min(...selectedSeatsInSameRow.map(s => s.col));
                        let maxCol = Math.max(...selectedSeatsInSameRow.map(s => s.col));

                        if (seat.col === minCol - 1 || seat.col === maxCol + 1) {
                            seat.selected = true;
                        }
                    }
                } else {

                    seat.selected = true;
                }
            }
        }
        ,
    },
    mounted() {
        this.getRoomSeance();
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
    margin-bottom: 80px;


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
</style>
