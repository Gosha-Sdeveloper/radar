import { createRouter, createWebHistory } from "vue-router";

// Тут находится vue-router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '', component: () => import('../components/pages/Home.vue'), name: "user.home" }, // Тестовый режим

        // { path: '/home', component: () => import('../components/pages/Home.vue'), name: "user.home" },
        // { path: '/index', component: () => import('../views/Index.vue') },
        // { path: '/page', component: () => import('../views/Page.vue') }
    ],
})

export default router
