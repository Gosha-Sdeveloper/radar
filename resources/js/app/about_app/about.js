import '../../bootstrap';
import { createApp } from 'vue';
import router from '../../router';
import AboutApp from "./AboutApp.vue";

const app = createApp(AboutApp);
app.use(router);
app.mount('#about_app');
