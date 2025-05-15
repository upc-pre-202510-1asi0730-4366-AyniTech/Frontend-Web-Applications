import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/app/iam/components/register/Register.vue';
import Login from '@/app/iam/components/login/Login.vue';

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
        path: '/home',
        name: 'Home',

    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../app/product-management/components/main-dashboard.component.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../app/iam/components/profile/Profile.component.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});



export default router;
