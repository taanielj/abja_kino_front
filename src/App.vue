<template id="app">
    <nav @click="closeOnClickOutside">
        <div>
            <div id="cinema-name">
                <font-awesome-icon :icon="['fas', 'clapperboard']" />
                Abja-Paluoja KINO
                <font-awesome-icon :icon="['fas', 'clapperboard']" />
            </div>
            <router-link to="/">Kava</router-link>
            |
            <router-link to="/movies">Filmid</router-link>
            |
            <router-link v-if="userId === null" to="/login">Logi Sisse</router-link>
            <template v-else>
                <router-link to="/tickets">Piletid</router-link>
                |
                <template v-if="roleName === 'ADMIN'">
                    <router-link to="/admin">Admin</router-link>
                    |
                </template>
                <router-link to="/logout" @click.prevent="handleLogout">Logi välja</router-link>
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
    name: "YourComponent",
    components: {LogoutModal, Modal, FontAwesomeIcon},
    data() {
        return {
            navHeight: "20vh",
            userId: localStorage.getItem('userId'),
            roleName: localStorage.getItem('roleName')
        }
    },

    methods: {
        updateNavMenu() {
            this.userId = localStorage.getItem('userId')
            this.roleName = localStorage.getItem('roleName')
        },

        handleLogout() {
            this.$refs.logoutModalRef.$refs.modalRef.openModal()
        },

        closeOnClickOutside() {
            if(!this.$refs.logoutModalRef.$refs.modalRef.isOpen) {
                this.$refs.logoutModalRef.$refs.modalRef.closeModal()
            }
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
    font-size: 2.5vh;
    background-image: url('./assets/background_picture.jpg');
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
}

#cinema-name {
    font-size: 3vw;
    font-weight: bold;
    padding: 0.01vh;
    color: rgba(170, 27, 45, 0.8);
}

nav {
    position: fixed;
    background-color: rgba(255, 240, 225, 1);
    padding: 0.01vh;
    font-size: 2vw;
    width: 100%;
    transition: top 0.3s;
    z-index: 9999;
    box-shadow: 0 0.2vw 0.8vw rgba(0, 0, 0, 0.2); /* changed from px to vw */
    height: 16vh;
    margin: 0.01vh;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}
nav a:hover {
    color: #b98342;
}

nav a.router-link-exact-active {
    color: rgba(170, 27, 45, 0.8);
}

.content {
    padding-top: 25vh;
}

router-link{
    padding: 0.01vh;
}
</style>
