import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ScheduleView from "@/views/ScheduleView.vue";
import MovieView from "@/views/MovieView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AddMovieView from "@/views/admin/AddMovieView.vue";
import ErrorView from "@/views/ErrorView.vue";
import AllMoviesView from "@/views/AllMoviesView.vue";
import AllTicketsView from "@/views/AllTicketsView.vue";
import AddSeanceView from "@/views/admin/AddSeanceView.vue";
import chooseTicketView from "@/views/ChooseTicketView.vue";
import SelectSeatsView from "@/views/SelectSeatsView.vue";
import PurchaseView from "@/views/PurchaseView.vue";


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
        component: MovieView
    },
    {
        path: '/choose-ticket/:seanceId',
        name: 'ChooseTicketRoute',
        component: chooseTicketView
    },
    {
        path: '/admin',
        name: 'AdminRoute',
        component: AdminView
    },
    {
        path: '/admin/edit-movie/:id',
        name: 'EditMovieRoute',
        component: AddMovieView
    },
    {
        path: '/admin/add-movie/',
        name: 'AddMovieRoute',
        component: AddMovieView
    },
    {
        path: '/admin/add-seance',
        name: 'AddSeanceRoute',
        component: AddSeanceView
    },
    {
        path: '/admin/edit-seance/:id',
        name: 'EditSeanceRoute',
        component: AddSeanceView
    },
    {
        path: '/tickets',
        name: 'TicketRoute',
        component: AllTicketsView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/select-seats/:seanceId',
        name: 'SelectSeatsRoute',
        component: SelectSeatsView
    },
    {
        path: '/confirm-tickets/:seanceId',
        name: 'ConfirmTicketsRoute',
        component: PurchaseView
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
