import '../../bootstrap';
import { createApp } from 'vue';
import router from '../../router';
import registerApp from "./RegisterApp.vue";

// Главная страница: тут отрисовываются компоненты и router
const app = createApp(registerApp);
app.use(router);
app.mount('#register_app');
