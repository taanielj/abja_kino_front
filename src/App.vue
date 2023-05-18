<template id="app">
    <nav class="">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        |
        <router-link to="/login">Logi Sisse</router-link>
        |
        <router-link to="/admin">Admin</router-link>
    </nav>
    <div class="content">
        <router-view/>
    </div>


</template>

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
