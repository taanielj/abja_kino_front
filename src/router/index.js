import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ScheduleView from "@/views/ScheduleView.vue";
import MovieView from "@/views/MovieView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AddMovieView from "@/views/admin/AddMovieView.vue";
import ErrorView from "@/views/ErrorView.vue";
import SeanceView from "@/views/SeanceView.vue";
import AllMoviesView from "@/views/AllMoviesView.vue";

const routes = [


    {
        path: '/',
        name: 'ScheduleRoute',
        component: ScheduleView
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
        path: '/movies',
        name: 'AllMoviesRoute',
        component: AllMoviesView
    },
    {
        path: '/movie/:id',
        name: 'MovieRoute',
        component: MovieView,
        props: true
    },
    {
        path: '/seance/:id',
        name: 'SeanceRoute',
        component: SeanceView,
        props: true
    },
    {
        path: '/admin',
        name: 'AdminRoute',
        component: AdminView
    },
    {
        path: '/admin/add-movie',
        name: 'AddMovieRoute',
        component: AddMovieView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
