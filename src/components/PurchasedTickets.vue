<template>
    <div class="card">
        <table class="table">
            <thead>
            <tr>
                <th>Rida</th>
                <th>Koht</th>
                <th>Pilet</th>
                <th>Hind</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="ticket in userTickets">
                <td>{{ ticket.seatRow }}</td>
                <td>{{ ticket.seatCol }}</td>
                <td>{{ ticket.ticketTypeName }}</td>
                <td>{{ ticket.priceFormatted }}</td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td><b>Kokku:</b></td>
                <td>{{ userTickets.reduce((sum, ticket) => sum + ticket.ticketPrice, 0).toFixed(2) }} €</td>
            </tr>
            </tbody>
        </table>
    </div>


</template>

<script>

export default {
    name: "PurchasedTickets",
    data() {
        return {
            formattedSum: "",
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
    methods: {
        formatPrice(price) {
            return price.toFixed(2) + " €";
        },
        calculateSum() {
            return this.userTickets.reduce((sum, ticket) => sum + ticket.ticketPrice, 0);
        },
    },
    mounted() {
        this.userTickets = JSON.parse(sessionStorage.getItem("userTickets"));
        this.userTickets.forEach(ticket => {
            ticket.priceFormatted = this.formatPrice(ticket.ticketPrice);
        });
        this.formattedSum = this.formatPrice(this.calculateSum());
        this.$emit('tickets-loaded', this.formattedSum);
    }
}
</script>


