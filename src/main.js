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

// authStore.checkAuth()

// if (localStorage.getItem('auth') === 'true') {
//     axios.get('/api/user')
//       .then(res => {
//         auth.user = res.data
//         auth.isAuthenticated = true
//       })
//       .catch(() => {
//         auth.logout()
//       })
//   }
  

authStore.restoreAuthState().then(() => {
  app.mount('#app');
});
