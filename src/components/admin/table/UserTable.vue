<template>
    <table class="table">

        <colgroup>
            <col style="width: 25%">
            <col style="width: 25%">
            <col style="width: 20%">
            <col style="width: 20%">
            <col style="width: 10%">

        </colgroup>
        <thead>
        <tr>
            <th scope="col">Kasutaja nimi</th>
            <th scope="col">E-mail</th>
            <th scope="col">Roll</th>
            <th scope="col">Staatus</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.roleName }}</td>
            <td>{{ user.status }}</td>

        </tr>

        </tbody>
    </table>


</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Alert from "@/components/alert/Alert.vue";
import {getAuthHeader} from "@/utils";

export default {
    name: "UserTable",
    components: {FontAwesomeIcon, AlertDanger, Alert},

    data() {
        return {
            users: [
                {
                    username: "",
                    email: "",
                    roleName: "",
                    status: "",
                }
            ]

        }

    },
    methods: {
        getUsers() {
            this.$http.get("/api/v1/user/admin-summary", {headers: getAuthHeader()})
                    .then(response => {
                        this.users = response.data;

                    })
                    .catch(() => {
                        this.errorMessage = "Database connection error";
                    })
        },
    },
    beforeMount() {
        this.getUsers();
    }


}
</script>
