// stores/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
  }),


  actions: {
        async signup(name, email, password) {
            try {
            const res = await axios.post('http://localhost:8000/api/register', { name, email, password })
            this.token = res.data.token
            this.user = res.data.user
            this.isAuthenticated = true
            localStorage.setItem('token', this.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            
            } catch (err) {
            console.error(err)
            }
        },

        async login(email, password) {
            try {
                const res = await axios.post('http://localhost:8000/api/login', { email, password })
                this.token = res.data.token
                this.user = res.data.user
                this.isAuthenticated = true
                localStorage.setItem('token', this.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                return true

            } catch (error) {
                console.error(err)
                return false
            }
        
        },

        async logout() {
            axios.post('http://localhost:8000/api/logout')
              .then(() => {
                this.user = null
                this.isAuthenticated = false
                this.token = null
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
            })
              .catch(error => {
                console.error('Logout failed:', error)
                // Still remove local data in case backend fails
                this.user = null
                this.isAuthenticated = false
                this.token = null
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
            })
        }
    }
})
