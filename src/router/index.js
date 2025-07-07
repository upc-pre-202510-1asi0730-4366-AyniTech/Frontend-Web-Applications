import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/app/iam/components/register/Register.vue';
import Login from '@/app/iam/components/login/Login.vue';
import MainDashboardComponent from "@/app/product-management/components/main-dashboard.component.vue";
import Profile from "@/app/iam/components/profile/Profile.component.vue";
import stockAlertView from "@/app/stock-alert/views/stockAlert.view.vue";
import { useAuthStore } from '@/app/iam/services/authentication-api.service';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresGuest: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: MainDashboardComponent,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('@/app/history/view/history-dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/inventory',
        name: 'Inventory',
        component: () => import('@/app/inventory/views/inventory.route.vue'),
        meta: { requiresAuth: true }
    },
    {    
        path: '/alerts',
        name: 'StockAlert',
        component: stockAlertView,
        meta: { requiresAuth: true }
    },
    {
        path: '/kits',
        name: 'KitsProducts',
        component: () => import('@/app/kit-products/components/kit-products.component.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/add-product',
        name: 'AddProduct',
        component: () => import('@/app/add-products/components/add-product/add-product.component.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/products',
        name: 'ProductList',
        component: () => import('@/app/add-products/components/list-product/list-product.component.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/seleccionar-plan',
        name: 'PlanSelector',
        component: () => import('@/app/iam/components/register/PlanSelector.vue'),
        meta: { requiresGuest: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
        return;
    }

    // Si la ruta es para invitados (login/register) y el usuario está autenticado
    if (to.meta.requiresGuest && isAuthenticated) {
        next('/dashboard');
        return;
    }

    next();
});

export default router;
