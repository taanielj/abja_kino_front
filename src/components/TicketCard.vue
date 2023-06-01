<template>
    <div v-if="show" class="text-black">
        <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header-auto bg-transparent border-success bold-text">
                <h2 class="card-title">{{ ticketInfo.seanceMovieTitle }}</h2>
            </div>
            <div class="card-body text-success text-black">
                <p class="card-text">{{date}} | {{hours}}:{{minutes}}</p>
                <p class="card-text">{{ticketInfo.seanceRoomName}}</p>
                <p class="card-text">Rida: {{ticketInfo.seatRow}}, Koht: {{ticketInfo.seatCol}}</p>
            </div>
            <div class="card-footer bg-transparent border-success">
                {{ticketInfo.ticketTypeName}}
            </div>
        </div>
    </div>

</template>

<script>
import router from "@/router";

export default {
    name: "TicketCard",
    props: {
        ticketId: 0
    },
    data() {
        return {
            show: false,
            ticketInfo: {
                seanceMovieTitle: "Pealkiri",
                seanceStartTime: "",
                seanceRoomName: "Saali nimi",
                ticketTypeName: "Soodus",
                seatRow: 0,
                seatCol: 0
            },
            date: "dd/mm/yyyy",
            hours: 0,
            minutes: 0
        }
    },
    methods: {
        getTicket() {
            this.$http.get("/api/v1/ticket/" + this.ticketId)
                .then(response => {
                    this.ticketInfo = response.data;
                    this.parseDateTime();
                    this.show = true;

                })
                .catch(() => {
                    router.push({path:"/error"})
                })
        },
        parseDateTime() {
            let date = new Date(this.ticketInfo.seanceStartTime);
            this.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            this.hours = date.getHours();
            //two digits
            this.minutes = ("0" + date.getMinutes()).slice(-2);
        }
    },
    beforeMount() {
        if(this.ticketId !== 0) {
            this.getTicket();
        }
    }
}
</script>
