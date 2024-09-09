import { createApp } from "vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import App from '@/App.vue';
import router from "@/router/index.js";
import '@/assets/style.css'
import { createPinia } from 'pinia'
import { useBookStore } from "./stores/bookStore";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faArrowLeft, faThumbsUp)

const pinia = createPinia();
const bookStore = useBookStore(pinia)

bookStore.fetchBooks().then(() => {
    const app = createApp(App)
    app
        .use(pinia)
        .use(router)
        .component('font-awesome-icon', FontAwesomeIcon)
        .mount('#app')
})

