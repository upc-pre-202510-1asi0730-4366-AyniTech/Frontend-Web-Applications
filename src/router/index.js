import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Kits',
        component: () => import('../app/kit-products/components/kit-products.component.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
