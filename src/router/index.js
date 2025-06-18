import { createRouter, createWebHistory } from "vue-router";
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const InventoryComponent = () => import('../public/pages/inventory.vue');
const LotInventoryComponent = () => import('../inventory/pages/lot-inventory.component.vue');
const ProductComponent = () => import('../inventory/pages/product-inventory.component.vue');
const EditComponent = () => import('../inventory/pages/edit-product.component.vue');
const GenerateLotComponent = () => import('../inventory/pages/generate-lot.component.vue');
const CommentLotComponent = () => import('../inventory/pages/comment-lot.component.vue');

const routes =[
    {
        path: '/inventory',
        name: 'inventory',
        component: InventoryComponent,
        meta: { title: 'inventory' }
    },
    {
        path: '/inventory/product-inventory',
        name: 'product-inventory',
        component: ProductComponent,
        meta: { title: 'product-inventory' }
    },
    {
        path: '/inventory/edit-product/:id',
        name: 'edit-product',
        component: EditComponent,
        meta: { title: 'edit-product' }
    },
    {
        path: '/inventory/comment-lot/:id',
        name: 'comment-lot',
        component: CommentLotComponent,
        meta: { title: 'comment-lot' }
    },
    {
        path: '/inventory/generate-lot',
        name: 'generate-lot',
        component: GenerateLotComponent,
        meta: { title: 'generate-lot' }
    },
    {
        path: '/inventory/lot-inventory',
        name: 'lot-inventory',
        component: LotInventoryComponent,
        meta: { title: 'lot-inventory' }
    },

    {
        path: '/',
        name: 'default',
        redirect: { name: 'inventory' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: PageNotFoundComponent,
        meta: { title: 'Page not found' }
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    const baseTitle = 'inventory';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;