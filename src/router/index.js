import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/app/iam/components/register/Register.vue';
import Login from '@/app/iam/components/login/Login.vue';
import MainDashboardComponent from "@/app/product-management/components/main-dashboard.component.vue";
import {Profile} from "@iam/components/profile/index.js";
import stockAlertView from "@/app/stock-alert/views/stockAlert.view.vue";

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
        component: stockAlertView
    },
    {
        path: '/kits',
        name: 'KitsProducts',
        component: () => import('@/app/kit-products/components/kit-products.component.vue')
    },
    {
        path: '/add-product',
        name: 'AddProduct',
        component: () => import('@/app/add-products/components/add-product/add-product.component.vue')
    },
    {
        path: '/products',
        name: 'ProductList',
        component: () => import('@/app/add-products/components/list-product/list-product.component.vue')
    },
    {
        path: '/seleccionar-plan',
        name: 'PlanSelector',
        component: () => import('@/app/iam/components/register/PlanSelector.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
