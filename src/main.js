import './assets/main.css'
import './assets/tailwind.css'
import { useAuthStore } from './stores/authStore'


import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.use(router)

const authStore = useAuthStore()

authStore.restoreAuthState().then(() => {
  app.mount('#app');
});
