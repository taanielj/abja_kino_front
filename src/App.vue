<template>
    <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        |
        <router-link to="/login">Logi Sisse</router-link>
        |
        <router-link to="/admin">Admin</router-link>
    </nav>
    <div class="content">

    </div>
    <router-view/><template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login">Logi Sisse</router-link> |
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
        }

        nav {
            padding: 80px;
            background-color: #ffffff;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
        }

        nav a {
            font-weight: bold;
            color: #2c3e50;
        }

        nav a.router-link-exact-active {
            color: #42b983;
        }

    </style>


</template>

<style>
#app {
    font-family: 'Rokkitt', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 80px;
    background-color: #ffffff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}

</style>
<script setup>
</script>
