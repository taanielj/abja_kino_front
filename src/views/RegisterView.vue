<template>
    <div class="text-center">
        <div class="row justify-content-center">
            <div class="col col-3 mt-5 admin-table p-4">
                <h1>Loo konto</h1>
                <AlertModal
                        :message="errorMessage"
                        ref="alertModalRef"
                />
                <div @keydown.enter="login" class="row justify-content-center">
                    <div class="col col-6 mt-4">
                        <div class="mb-3">
                            <label for="username" class="form-label">Kasutajanimi</label>
                            <input v-model="registrationRequest.username" type="text" class="form-control"
                                   id="username">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Parool</label>
                            <input v-model="registrationRequest.password" type="password" class="form-control"
                                   id="password">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Parool uuesti</label>
                            <input v-model="matchingPassword" type="password" class="form-control" id="password">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">E-posti aadress</label>
                            <input v-model="registrationRequest.email" type="email" class="form-control" id="password"
                                   placeholder="example@gmail.com">
                        </div>
                    </div>
                    <div class="row justify-content-center mt-5 mb-5">
                        <div>
                            <div class="col col-12">
                                <button @click="navigateBack" type="submit"
                                        class="btn button btn-outline-secondary custom-button me-3">Tagasi
                                </button>
                                <button @click="registerNewClient" type="submit"
                                        class="btn button btn-outline-secondary custom-button me-3">Registreeri
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertModal from "@/components/modal/AlertModal.vue";

export default {
    name: "RegisterView",
    components: {AlertModal, AlertSuccess, AlertDanger},
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
                this.openAlertModal("Paroolid ei kattu")
                return
            }

            if (!this.allRequiredFieldsAreFilled()) {
                this.openAlertModal("Täida kõik väljad")
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
            this.$http.post('/api/v1/user/register', this.registrationRequest
            ).then((response) => {

                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("roleName", response.data.roleName);
                localStorage.setItem("jwt", response.data.token);
                this.$emit('event-update-nav-menu')
                router.push({name: 'ScheduleRoute'})
                this.navigateBack()
            })
                .catch(error => {

                    this.handleRegistrationError(error);
                })

        },

        handleRegistrationError(error) {
            if (error.response.status === 409 || error.response.status === 400) {
                this.openAlertModal(error.response.data.message)
            } else {
                router.push({path: '/error'})
            }
        },

        openAlertModal(errorMessage) {
            this.errorMessage = errorMessage;
            this.$refs.alertModalRef.openModal();
        },
    }
}
</script>
