import { createRouter, createWebHistory } from 'vue-router';
import ProductList from "../app/add-products/components/list-product/list-product.component.vue";
import AddProduct from "../app/add-products/components/add-product/add-product.component.vue";

const routes = [
    {
        path: '/products',
        name: 'ProductList',
        component: ProductList,
        meta: {
            title: 'Productos - StockWise'
        }
    },
    {
        path: '/add-product',
        name: 'AddProduct',
        component: AddProduct,
        meta: {
            title: 'Agregar Producto - StockWise'
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Siempre ir al inicio de la página cuando navegas
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    // Cambiar el título de la página
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router;
