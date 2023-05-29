<template>

    <div class="container">
        <div class="row">
            <div class="col">

            </div>
        </div>

    </div>

</template>

<script>

import {getAuthHeader} from "@/utils";
import router from "@/router";

export default {
    name: "ConfirmTicketsView",
    data() {
        return {
            seanceId: this.$route.params.seanceId,
            userTickets: [
                {
                    userId: 0,
                    seatCol: 0,
                    seatRow: 0,
                    seanceRoomName: "",
                    seanceId: 0,
                    ticketTypeName: "",
                }
            ],
        }
    },
    methods:{
        confirmTickets(){
            this.$http.post("/api/v1/ticket/purchase", this.userTickets, {headers: getAuthHeader()})
                .then(() => {
                    router.push({path:"/tickets"})
                })
                .catch(() => {
                    router.push({path:"/error"})
                })
        }
    },
    mounted() {
        this.userTickets = JSON.parse(sessionStorage.getItem("userTickets"));
        this.confirmTickets();
    }

}
</script>



