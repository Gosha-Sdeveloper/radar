import '../../bootstrap';
import { createApp } from 'vue';
import router from '../../router';
import App from "./App.vue";

// Главная страница: тут отрисовываются компоненты и router
const app = createApp(App);
app.use(router);
app.mount('#app');
