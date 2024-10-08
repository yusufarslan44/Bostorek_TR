import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import ContactView from "@/views/ContactView.vue"
import BooksView from "@/views/BooksView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import BookDetailView from "@/components/BookDetailView.vue"
import DashboardView from "@/views/DashboardView.vue"
import { useAuthStore } from "@/stores/authStore"

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: "/",
        name: "home",
        component: HomeView
    },
    {
        path: "/books",
        name: "books",
        component: BooksView
    },
    {
        path: "/books:id",
        name: "book-detail",
        component: BookDetailView
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        meta: { requiresAuth: true }
    },
    {
        path: "/contact",
        name: "contact",
        component: ContactView
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
    },
    ],
    linkActiveClass: 'active-link'
})

router.beforeEach((to, from, next) => {

    const authStore = useAuthStore();
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!authStore.token) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;