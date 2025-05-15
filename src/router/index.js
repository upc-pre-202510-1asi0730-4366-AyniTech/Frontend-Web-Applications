import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/app/iam/components/register/Register.vue';
import Login from '@/app/iam/components/login/Login.vue';
import MainDashboardComponent from "@/app/product-management/components/main-dashboard.component.vue";
import {Profile} from "@iam/components/profile/index.js";

const routes = [
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
        component: MainDashboardComponent

    },
    {
      path: '/profile',
      name: 'Profile',
        component: Profile
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});




export default router;
