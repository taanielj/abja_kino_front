<template>
    <div v-if="show" class=" text-block">
        <div class="text-heading">Vali piletid</div>
        <div v-for="(ticketType) in ticketTypes" class="row text text-start">
            <span class="list-group  col-9">
                {{ ticketType.name }}
            </span>
            <span class="list-group col">
                {{ ticketType.price }}
            </span>
            <span class="list-group col ">
                <input type="number" v-model="ticketType.amount" class="form-control my-input">
            </span>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import ScheduleView from "@/views/ScheduleView.vue";
import PosterImage from "@/components/PosterImage.vue";

export default defineComponent({
    name: "SeanceTicketCard",
    components: {ScheduleView, PosterImage},
    props:{
        show: false
    },
    data() {
        return {
            errorMessage: "",
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
        confirmTickets() {
        },

        setAmountToZero() {
            this.ticketTypes.forEach(ticketType => {
                ticketType.amount = 0;
            })
        },
        getTicketTypes() {
            this.$http.get("/api/v1/ticket/type/all")
                .then(response => {
                    this.ticketTypes = response.data;
                    this.setAmountToZero();
                })
                .catch(() => {
                    this.errorMessage = "Piletite tüüpide laadimine ebaõnnestus";
                    this.$emit('event-ticket-types-error', this.errorMessage);
                })
        }
    },
    mounted() {
        if (this.seanceId !== 0) {
            this.getTicketTypes();
        }

    },
    // prevent ticketTypes from going below zero
    watch: {
        ticketTypes: {
            handler(val) {
                console.log("ticketTypes changed");
                this.$emit('event-ticket-types-changed', this.ticketTypes);
                val.forEach(ticketType => {
                    if (ticketType.amount < 0) {
                        ticketType.amount = 0;
                    }
                })
            },
            deep: true
        },

    }

})
</script>

<style>
.text-block {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 100px;
}

.text-heading {
    margin-bottom: 50px;
}

.text {
    font-size: 25px;
    margin-top: 10px;
}

.text-start:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: lightgrey;
    margin-bottom: 10px;
    margin-top: 10px;
}

.my-input {
    font-family: 'Cinzel', Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
    padding: 5px;
    border: 1px solid lightgrey;
    border-radius: unset;

}
</style>
