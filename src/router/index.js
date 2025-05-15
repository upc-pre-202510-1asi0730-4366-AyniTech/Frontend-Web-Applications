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

    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});



export default router;