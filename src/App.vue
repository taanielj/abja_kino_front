<template>
  <nav>
    <router-link to="/">Kava</router-link> |
    <router-link to="/movie/:id">Filmid</router-link> |
    <router-link v-if="userId === null" to="/login">Logi Sisse</router-link>
      <template v-else>
          <router-link to="/tickets">Piletid</router-link>
          |
          <template v-if="roleName === 'admin'">
              <router-link to="/adminRoute">Admin</router-link>
          |
          </template>

          <router-link to="#" @click="handleLogout">Logi välja</router-link>
      </template>
  </nav>
  <LogoutModal ref="logoutModalRef" @event-update-nav-menu="updateNavMenu"/>
  <router-view @event-update-nav-menu="updateNavMenu"/>


</template>

<script>
import LogoutModal from "@/components/modal/LogoutModal.vue";
import Modal from "@/components/modal/Modal.vue";
export default {
    components: {LogoutModal, Modal},
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
    padding: 30px;
    font-size: 40px;
    width: 100%;
    transition: top 0.3s;
    z-index: 9999;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}

.content {
    padding-top: 80px;
}
</style>
<script setup>
</script>
