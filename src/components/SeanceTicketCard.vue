<template>
    <div class=" text-block">
        <div class="text-heading">Vali piletid</div>
        <div v-for="ticketType in ticketTypes" class="row text text-start">
            <li class="list-group  col-9">
                {{ ticketType.name }}
            </li>
            <li class="list-group col">
                {{ ticketType.price }}
            </li>
            <li class="list-group col">
                <input type="number" v-model="ticketType.amount" class="form-control my-input">
            </li>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import ScheduleView from "@/views/ScheduleView.vue";
import PosterImage from "@/components/PosterImage.vue";

export default defineComponent({
    name: "ChooseTicketView",
    components: {ScheduleView, PosterImage},

    data() {
        return {

            ticketTypes: [
                {
                    name: "",
                    price: 0,
                    amount: 0,
                }
            ]


        }

    },

    methods: {

        setAmountToZero() {
            this.ticketTypes.forEach(ticketType => {
                ticketType.amount = 0;
            })
        },
        getTicketTypes() {
            this.$http.get("/ticket/types")
                .then(response => {
                    this.ticketTypes = response.data;
                    this.setAmountToZero();
                })
                .catch(() => {
                    // router.push({path: "/error"});
                })
        }
    },
    mounted() {
        if (this.seanceId !== 0) {
            this.getTicketTypes();
        }

    }
})
</script>

<style>
.text-block
{
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 100px;
}
.text-heading{
    margin-bottom: 50px;
}
.text {
    font-size: 25px;
    margin-top: 10px;
}
.text-start:after{
    content:"";
    display: block;
    width: 100%;
    height: 1px;
    background-color: lightgrey;
    margin-top: 10px;
}
.my-input{
    font-family: 'Cinzel', Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
    padding: 5px;
    border: 1px solid lightgrey;
    border-radius: unset;
}
</style>