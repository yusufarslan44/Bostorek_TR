import { createApp } from "vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import router from "@/router/index.js";
import '@/assets/style.css'
import { createPinia } from 'pinia'
import { useBookStore } from "@/stores/bookStore";
import { useAuthStore } from "@/stores/authStore";
import App from '@/App.vue';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast()


/* add icons to the library */
library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash)

const pinia = createPinia();


const authStore = useAuthStore(pinia);
authStore.loadToken();
axios.interceptors.response.use(response => response,
    error => {
        if (error.response && error.response.status === 401) {
            toast.error('Your token has expired forwarding login page', {
                position: "top-right",
                timeout: 3000,
                closeButton: "button",
                icon: true,
                rtl: false
            });

            setTimeout(() => {
                authStore.logout();
                router.push('/login')
            }, 3000)
        }
    }
)
const bookStore = useBookStore(pinia)

bookStore.fetchBooks().then(() => {
    const app = createApp(App)
    app
        .use(pinia)
        .use(router)
        .component('font-awesome-icon', FontAwesomeIcon)
        .use(Toast)
        .mount('#app')
})

