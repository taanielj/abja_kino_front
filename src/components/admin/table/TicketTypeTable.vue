<template>
    <table class="table">
        <colgroup>
            <col style="width: 50%">
            <col style="width: 25%">
            <col style="width: 25%">
        </colgroup>
        <thead>
        <tr>
            <th scope="col">Pileti valik</th>
            <th scope="col">Hind</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(ticketType, index ) in ticketTypes" :key="index" class="text-center">
            <td>
                <input v-model="ticketType.name" type="text" v-if="ticketType.editing" class="w-50" input-field>
                <span v-else>{{ ticketType.name }} </span>
            </td>
            <td>
                <input v-model="ticketType.price" type="number" v-if="ticketType.editing" class="w-50" input-field>
                <span v-else>{{ ticketType.price }}</span>
            </td>
            <td>
                <template v-if="!ticketType.editing">
                    <font-awesome-icon @click="toggleEditTicketType(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'edit']"/>
                    <font-awesome-icon @click="deleteTicketType(ticketType.id)" class="hoverable-link me-3"
                                       :icon="['fas', 'trash']"/>
                </template>
                <template v-else>
                    <font-awesome-icon @click="putTicketType(ticketType.id)" class="hoverable-link me-3"
                                       :icon="['fas', 'save']"/>
                    <font-awesome-icon @click="cancelEditing(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'times']"/>
                </template>
            </td>
        </tr>
        <tr class="text-center">
            <td v-if="showInput">
                <input v-model="newTicketType.name" type="text" class="w-50 input-field" >
            </td>
            <td v-else></td>
            <td v-if="showInput">
                <input v-model="newTicketType.price" type="number" class="w-50 input-field">
            </td>
            <td v-else></td>
            <td>
                <template v-if="showInput">
                    <font-awesome-icon @click="addTicketType" class="hoverable-link me-3"
                                       :icon="['fas', 'save']"/>
                    <font-awesome-icon @click="toggleInput" class="hoverable-link me-3"
                                       :icon="['fas', 'times']"/>
                </template>
                <template v-else>
                    <font-awesome-icon @click="toggleInput" class="hoverable-link me-3"
                                       :icon="['fas', 'plus']"/>
                </template>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Alert from "@/components/alert/Alert.vue";
import router from "@/router";
import index from "vuex";

export default {
    name: "TicketTypeTable",
    components: {FontAwesomeIcon, AlertDanger, Alert},
    computed: {
        index() {
            return index
        }
    },
    data() {
        return {
            errorMessage: "",
            ticketTypes: [
                {
                    id: 0,
                    name: "",
                    price: null,
                    editing: false,
                }
            ],
            newTicketType: {
                id: 0,
                name: "",
                price: null,
            },
            showInput: false,
        }
    },

    methods: {
        getTicketTypes() {
            this.$http.get("/ticket/types")
                .then(response => {
                    this.ticketTypes = response.data
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },
        postTicketType() {
            this.$http.post("/ticket/add", this.newTicketType ).then(() => {
                this.getTicketTypes()
                this.newTicketType = "";
            })
                .catch(error => {
                    this.handleTicketTypeError(error);
                    if (!this.showInput) {
                        this.newTicketType = "";
                    }
                })
        },
        putTicketType(ticketType) {

            this.$http.put("/ticket/" +ticketType.id, null, {
                params: {
                    name: ticketType.name,
                    price: ticketType.price,
                }
            } ).then(() => {
                ticketType.editing = false
                this.getTicketTypes()

            })
                .catch(error => {
                    this.handleTicketTypeError(error);
                    if (!this.showInput) {
                        this.newTicketType = "";
                    }
                })
        },
        addTicketType() {
            if (this.newTicketType.name === "" || this.newTicketType.price === 0) {
                this.errorMessage = "Palun sisesta kõik väljad"
                this.showInput = false;
            } else {
                this.newTicketType.price = Number(this.newTicketType.price)
                this.postTicketType()
            }
        },
        toggleEditTicketType(index) {
            if (index === undefined) {
                this.showInput = !this.showInput
            } else {
                this.ticketTypes[index].editing = !this.ticketTypes[index].editing
            }
        },
        cancelEditing(index) {
            const ticketType = this.ticketTypes[index]
            if (ticketType.id === undefined) {
                this.ticketTypes.splice(index, 1)
            } else {
                ticketType.editing = false
            }
        },
        handleTicketTypeError(error) {
            if (error.response.status === 400) {
                this.errorMessage = error.response.data.message
                this.$emit("event-error-message", this.errorMessage)
            } else {
                router.push({path: "/error"})
            }
        },
        deleteTicketType(index) {
            this.$http.delete("/ticket/types/" + (index))
                .then(() => {
                    this.ticketTypes.splice(index, 1)
                    this.getTicketTypes()
                })
                .catch(error => {
                    this.handleTicketTypeError(error)
                })
        },
        toggleInput() {
            this.showInput = !this.showInput
            if (!this.showInput) {
                this.newTicketType = ""
            }
        }
    },
    beforeMount() {
        this.getTicketTypes()
    }
}
</script>

<style>
.input-field{
    border-radius: 5px;
}
</style>