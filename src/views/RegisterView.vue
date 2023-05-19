<template>
    <h1>Loo konto</h1>
    <div class="container text-center">
        <AlertSuccess :message="successMessage"/>
        <AlertDanger :message="errorMessage"/>
        <div @keydown.enter="login" class="row justify-content-center">
            <div class="col col-3 mt-5">
                <div class="mb-3">
                    <label for="username" class="form-label">Kasutajanimi</label>
                    <input v-model="registrationRequest.username" type="text" class="form-control" id="username">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Parool</label>
                    <input v-model="registrationRequest.password" type="password" class="form-control" id="password">
                </div >
                <div class="mb-3">
                    <label for="password" class="form-label">Parool uuesti</label>
                    <input v-model="matchingPassword" type="password" class="form-control" id="password">
                </div >
                <div class="mb-3">
                    <label for="email" class="form-label">E-posti aadress</label>
                    <input v-model="registrationRequest.email" type="email" class="form-control" id="password">
                </div >
                <div class="row justify-content-center">
                    <div class="">
                         <button @click="navigateBack" type="submit" class="btn btn-outline-success">Tagasi</button>
                        <span style="margin-left: 50px"></span>
                         <button @click="registerNewClient" type="submit" class="btn btn-outline-success">Registreeri</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
    name: "RegisterView",
    components: {AlertDanger},
    data() {
        return {
            matchingPassword: '',
            successMessage: "",
            errorMessage: "",
            registrationRequest: {
                username: "",
                password: "",
                email: "",
            },
            errorResponse: {
                message: "",
                errorCode: 0
            }
        };
    },
    methods: {
        passwordMatch() {
            return this.registrationRequest.password === this.matchingPassword
        },
        navigateBack() {
            router.push({path: '/'})
        },

        registerNewClient() {
            this.errorMessage = ""


            if (!this.passwordMatch()) {
                this.errorMessage = "Paroolid ei kattu"
                return
            }

            if(!this.allRequiredFieldsAreFilled()){
                this.errorMessage = "Täida kõik väljad"
                return
            }

            this.postNewClient();

        },
        allRequiredFieldsAreFilled() {
            return this.registrationRequest.username !== ''
                && this.registrationRequest.password !== ''
                && this.registrationRequest.email !== ''

        },
        postNewClient() {
            this.$http.post('/user/register', this.registrationRequest
                ).then((response) => {

                sessionStorage.setItem("userId", response.data.userId);
                sessionStorage.setItem("roleName", response.data.roleName);
                this.$emit('event-update-nav-menu')
                router.push({name: 'ScheduleRoute'})
                    this.navigateBack()
                })
                .catch(error => {

                    this.handleRegistrationError(error);
                })

        },
        handleRegistrationError(error) {
            if (error.response.status === 409) {
                this.errorMessage = error.response.data.message
            } else {
                router.push({path: '/error'})
            }
        }
    }

}
</script>
