<template>
  <nav>
    <router-link to="/">Kava</router-link> |
    <router-link to="//movie/:id">Filmid</router-link> |
    <router-link v-if="userId === null" to="/login">Logi Sisse</router-link>
      <template v-else>
          <router-link to="/tickets">Piletid</router-link>
          |
          <template v-if="roleName === 'admin'">
              <router-link to="/adminRoute">Admin</router-link>
          </template>
          <router-link to="#" @click="handleLogout">Logi välja</router-link>
      </template>

  </nav>
  <router-view @event-update-nav-menu="updateNavMenu"/>

<!--  asdf-->
</template>

<script>
export default {
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
        },
    }

}
</script>

<style>
#app {
    font-family: 'Cinzel', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
