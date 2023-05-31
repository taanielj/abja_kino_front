<template>
    <table class="table" aria-description="Table with TicketTypes in the database">
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
                <input v-model="ticketType.name" type="text" v-if="ticketType.editing" class="w-50">
                <span v-else>{{ ticketType.name }} </span>
            </td>
            <td>
                <input v-model="ticketType.price" type="number" v-if="ticketType.editing" class="w-50">
                <span v-else>{{ ticketType.price }}</span>
            </td>
            <td>
                <span v-if="!ticketType.editing">
                    <font-awesome-icon @click="toggleEditTicketType(index)" class="hoverable-link me-3"
                                       :icon="['fas', 'edit']"/>
                    <font-awesome-icon @click="deleteTicketType(ticketType.id)" class="hoverable-link me-3"
                                       :icon="['fas', 'trash']"/>
                </span>
                <span v-else>
                    <font-awesome-icon @click="editTicketType(ticketType.id)" class="hoverable-link me-3"
                                       :icon="['fas', 'save']"/>
                    <font-awesome-icon @click="cancelEditing" class="hoverable-link me-3"
                                       :icon="['fas', 'times']"/>
                </span>
            </td>
        </tr>
        <tr class="text-center">
            <td v-if="showInput">
                <input v-model="newTicketType.name" type="text" class="w-50 input-field">
            </td>
            <td v-else></td>
            <td v-if="showInput">
                <input v-model="newTicketType.price" type="number" class="w-50 input-field">
            </td>
            <td v-else></td>
            <td>
                <template v-if="showInput">
                    <font-awesome-icon @click="addNewTicketType" class="hoverable-link me-3"
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
import {getAuthHeader} from "@/utils";

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
                    price: 0,
                    editing: false,
                }
            ],
            newTicketType: {
                id: 0,
                name: "",
                price: 0,
            },
            showInput: false,
        }
    },

    methods: {
        getTicketTypes() {
            this.$http.get("/api/v1/ticket/type/all", {headers: getAuthHeader()})
                    .then(response => {
                        this.ticketTypes = response.data
                    })
                    .catch(error => {
                        this.handleTicketTypeError(error);
                    })
        },

        editTicketType(ticketTypeId) {
            const ticketType = this.ticketTypes.find(ticketType => ticketType.id === ticketTypeId);
            this.putTicketType(ticketType);

        },

        validateFieldsFilled(ticketType) {
            this.errorMessage = "";
            if (ticketType.name.trim() !== "" && ticketType.price !== 0) {
                return true;
            }
            this.errorMessage = "Pileti tüübi nimi ja hind ei tohi olla tühi"
            this.$emit("ticket-type-table-error", this.errorMessage)
            return false;
        },

        addNewTicketType() {

            if (!this.validateFieldsFilled(this.newTicketType)) {
                return;
            }

            this.$http.post("/api/v1/ticket/type/add", this.newTicketType, {headers: getAuthHeader()})
                    .then(() => {

                        this.newTicketType = {
                            id: 0,
                            name: "",
                            price: 0,
                        }
                        this.showInput = false;
                        this.getTicketTypes();
                    })
                    .catch(error => {
                        this.handleTicketTypeError(error);
                        if (!this.showInput) {
                            this.newTicketType = {
                                id: 0,
                                name: "",
                                price: 0,
                            };
                        }
                    })
        },

        putTicketType(ticketType) {

            if (!this.validateFieldsFilled(ticketType)) {
                return;
            }

            this.$http.put("/api/v1/ticket/type/" + ticketType.id, ticketType, {headers: getAuthHeader()})
                    .then(() => {
                        ticketType.editing = false;
                        this.getTicketTypes();
                    })
                    .catch(error => {
                        this.handleTicketTypeError(error);

                    })
        },

        toggleEditTicketType(index) {
            if (index === undefined) {
                this.showInput = !this.showInput;
            } else {
                this.ticketTypes[index].editing = !this.ticketTypes[index].editing;
            }
        },
        cancelEditing() {
            this.getTicketTypes();

        },
        handleTicketTypeError(error) {
            if (error.response.status === 400 || error.response.status === 409) {
                this.errorMessage = error.response.data.message;
                if (!this.showInput) {
                    this.newTicketType = {
                        id: 0,
                        name: "",
                        price: 0,}
                }
                this.$emit("ticket-type-table-error", this.errorMessage);
            } else {
                router.push({path: "/error"});
            }
        },
        deleteTicketType(ticketTypeId) {
            this.$http.delete("/api/v1/ticket/type/" + ticketTypeId, {headers: getAuthHeader()})
                    .then(() => {
                        this.getTicketTypes()
                    })
                    .catch(error => {
                        this.handleTicketTypeError(error)
                    })
        },
        toggleInput() {
            this.showInput = !this.showInput
            if (!this.showInput) {
                this.newTicketType = {
                    id: 0,
                    name: "",
                    price: 0,
                }
            }
        }
    },

    watch: {
        "newTicketType.price"(newVal) {
            if (newVal < 0 || newVal === null || newVal === undefined || newVal === "") {
                this.newTicketType.price = 0
            }
        },
        ticketTypes: {
            handler(newVal) {
                newVal.forEach((ticketType, index) => {
                    if (ticketType.price < 0 || ticketType.price === null || ticketType.price === undefined || ticketType.price === "") {
                        ticketType.price = 0;
                        this.ticketTypes.splice(index, 1, ticketType);
                    }
                })
            },
            deep: true
        }
    },

    beforeMount() {
        this.getTicketTypes()
    }
}
</script>

<style>
.input-field {
    border-radius: 5px;
}
</style>
