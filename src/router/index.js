import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ScheduleView from "@/views/ScheduleView.vue";
import MovieView from "@/views/MovieView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AddMovieView from "@/views/admin/AddMovieView.vue";
import SeanceView from "@/views/SeanceView.vue";

const routes = [
    {
        path: '/seance/:id',
        name: 'SeanceRoute',
        component: SeanceView,
        props: true
    },
    {
        path: '/admin/add-movie',
        name: 'AddMovieRoute',
        component: AddMovieView
    },

    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/register',
        name: 'registerRoute',
        component: RegisterView
    },
    {
        path: '/movie/:id',
        name: 'MovieRoute',
        component: MovieView,
        props: true
    },
    {
        path: '/',
        name: 'ScheduleRoute',
        component: ScheduleView
    },
    {
        path: '/admin',
        name: 'AdminRoute',
        component: AdminView
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
