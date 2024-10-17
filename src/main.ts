import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.use(Toast, {
  maxToasts: 5,
  position: 'bottom-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 1,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  filterBeforeCreate: (toast: any, toasts: any) => {
    if (toasts.filter((t: any) => t.type === toast.type).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  },
});

app.mount('#app');
