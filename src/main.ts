import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import './style.css';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/auth';

const app = createApp(App);

// 1️⃣ Register Pinia
const pinia = createPinia();
app.use(pinia);

// 2️⃣ Initialize auth store
const authStore = useAuthStore();
authStore.initAuth();

// 3️⃣ Register other plugins
app
  .use(router)
  .use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions)
  .use(VueQueryPlugin)
  .mount('#app');
