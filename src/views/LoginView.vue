<template>
    <div class="container text-center">
        <AlertDanger :message="message"/>
        <div @keydown.enter="login" class="row justify-content-center">
            <div class="col col-3 mt-5">
                <div class="mb-3">
                    <label for="username" class="form-label">Kasutajanimi</label>
                    <input v-model="username" type="text" class="form-control" id="username">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Salasõna</label>
                    <input v-model="password" type="password" class="form-control" id="password">
                </div >
                <div class="mb-3">
                    <router-link to="/register">Registreeri</router-link>
                </div>
                <button @click="login" type="submit" class="btn btn-primary">Logi sisse</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
export default {
    name: "LoginView",
    data() {
        return {
            username: "",
            password: "",
            message: "",
            loginResponse: {
                userId: 0,
                roleName: ""
            },
        };
    },
    methods: {
        login() {
            this.message = "";
            if (this.username === "" || this.password === "") {
                this.message = "Täida kõik väljad";
            } else {
                this.sendLoginRequest();
            }
        },

        sendLoginRequest() {



            this.$http.get("/login",{
                params: {
                    username: this.username,
                    password: this.password
                },


            }).then(response => {
                this.loginResponse = response.data;
                sessionStorage.setItem("userId", this.loginResponse.userId);
                sessionStorage.setItem("roleName", this.loginResponse.roleName);
                this.$emit('event-update-nav-menu')
                router.push({name: 'ScheduleRoute'})})
            }
        },
}

</script>

