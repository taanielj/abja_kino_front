import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ScheduleView from "@/views/ScheduleView.vue";
import MovieView from "@/views/MovieView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AddMovieView from "@/views/admin/AddMovieView.vue";

const routes = [


  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/register',
    name: 'registerRoute',
    component: RegisterView},
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
  },
  {
    path: '/about',
    name: 'about',

    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
