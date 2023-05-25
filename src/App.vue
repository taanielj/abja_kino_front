<template>
    <nav>
        <div>
            <h1 style="font-weight: bold">Abja-Paluoja KINO
                <i class="fa-light fa-camera-movie"></i>
            </h1>

        <router-link to="/">Kava</router-link>
        |
        <router-link to="/movies">Filmid</router-link>
        |
        <router-link v-if="userId === null" to="/login">Logi Sisse</router-link>
        <template v-else>
            <router-link to="/tickets">Piletid</router-link>
            |
            <template v-if="roleName === 'ROLE_ADMIN'">
                <router-link to="/admin">Admin</router-link>
                |
            </template>

            <router-link to="/logout" @click="handleLogout">Logi välja</router-link>
        </template>
        </div>
    </nav>
    <div class="content">
        <router-view @event-update-nav-menu="updateNavMenu"/>
    </div>

    <LogoutModal ref="logoutModalRef" @event-update-nav-menu="updateNavMenu"/>


</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";
import Modal from "@/components/modal/Modal.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
    name:"YourComponent",
    components: {LogoutModal, Modal, FontAwesomeIcon},
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            roleName: sessionStorage.getItem('roleName')
        }
    },
    methods: {
        updateNavMenu() {
            this.userId = sessionStorage.getItem('userId')
            this.roleName = sessionStorage.getItem('roleName')
        },

        handleLogout() {
            this.$refs.logoutModalRef.$refs.modalRef.openModal()
        },
    }

}
</script>

<style>
#app {
    font-family: 'Rokkitt', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 25px;
}

nav {
    position: fixed;
    background-color: lightgray;
    padding: 30px;
    font-size: 40px;
    width: 100%;
    transition: top 0.3s;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2); /* add a box shadow */
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}

.content {
    padding-top: 200px;
}
</style>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>
