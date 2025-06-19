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
        component: () => import('../app/product-management/components/main-dashboard.component.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
        component: Profile
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('@/app/history/view/history-dashboard.vue')
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: () => import('@/app/inventory/views/inventory.route.vue')

    },
    {    
        path: '/alerts',
        name: 'StockAlert',
        component: () => import('@/app/stock-alert/views/stockAlert.view.vue')
    },
    {
        path: '/kits',
        name: 'KitsProducts',
        component: () => import('../app/kit-products/components/kit-products.component.vue')
    },
    {
        path: '/alertas',
        name: 'Alertas',
        component: () => import('@/app/stock-alert/views/stockAlert.view.vue')
    },
    {
        path: '/buscar',
        name: 'Buscar',
        component: () => import('../app/product-management/components/main-dashboard.component.vue') // Temporalmente redirige al dashboard
    },
    {
        path: '/soporte',
        name: 'Soporte',
        component: () => import('../app/product-management/components/main-dashboard.component.vue') // Temporalmente redirige al dashboard
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;
