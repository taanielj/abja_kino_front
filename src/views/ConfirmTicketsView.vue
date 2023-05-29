<template>

    <div class="container">
        <div class="row">
            <div class="col">

            </div>
        </div>

    </div>

</template>

<script>

export default {
    name: "ConfirmTicketsView",
    data() {
        return {
            seanceId: this.$route.params.seanceId,
            userTickets: [
                {
                    userId: 0,
                    row: 0,
                    col: 0,
                    roomName: "",
                    seanceId: 0,
                    ticketTypeName: "",
                }
            ],
        }
    },
    mounted() {
        this.userTickets = JSON.parse(sessionStorage.getItem("userTickets"));
    }

}
</script>



