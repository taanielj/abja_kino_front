<template>
    <div class="container  text-center">
        <div class="row justify-content-center " @keydown.enter="login">
            <div class="col col-3 mt-5 admin-table p-4 ">
                <AlertDanger :message="message"/>
                <div class="mb-3">
                    <label class="form-label" for="username">Kasutajanimi</label>
                    <input id="username" v-model="loginRequest.username" class="form-control" type="text">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="password">Salasõna</label>
                    <input id="password" v-model="loginRequest.password" class="form-control" type="password">
                </div>
                <div class="mb-3">
                    <router-link to="/register">Registreeri</router-link>
                </div>
                <button class="btn button btn-outline-secondary custom-button me-3" type="submit" @click="login">Logi sisse</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Cookies from 'js-cookie';

export default {
    name: "LoginView",
    components: {AlertDanger},
    data() {
        return {
            username: "",
            password: "",
            message: "",
            loginRequest: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        login() {
            this.message = "";
            if (this.loginRequest.username === "" || this.loginRequest.password === "") {
                this.message = "Täida kõik väljad";
            } else {
                this.sendLoginRequest();
            }
        },
        sendLoginRequest() {
            this.$http.post("/api/v1/user/login", this.loginRequest)
                    .then(response => {


                        localStorage.setItem("userId", response.data.userId);
                        localStorage.setItem("roleName", response.data.roleName);
                        localStorage.setItem("jwt", response.data.token);
                        this.$emit('event-update-nav-menu')
                        router.push({name: 'ScheduleRoute'})
                    })
                    .catch(error => {
                        if (error.response.data.errorCode === 401 || error.response.data.errorCode === 403)
                        {
                            this.message = error.response.data.message;
                        }
                    else
                        {
                            router.push({name: 'errorRoute'})
                        }
                    })
        },
    }
}
</script>

