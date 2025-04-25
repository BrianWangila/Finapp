// stores/authStore.js
import { defineStore } from 'pinia'
import api from '../api' 


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
  }),


  actions: {
        async signup(username, email, password, confirmPassword) {
          try {
            // await api.get('/sanctum/csrf-cookie') // CSRF protection
            const res = await api.post('/api/register', {
              username, 
              email, 
              password, 
              password_confirmation: confirmPassword
            })
            this.user = res.data.user
            console.log('User data:', this.user)
            this.token = res.data.token
            console.log('User token:', this.token)
            this.isAuthenticated = true
            localStorage.setItem('token', this.token)
            return true

          } catch (err) {
            console.error('Signup error', err)
            return false
          }
        },

        async login(email, password) {
            try {
                // await api.get('/sanctum/csrf-cookie') 
                const res = await api.post('/api/login', { 
                  email, 
                  password })
                this.user = res.data.user
                console.log('User data:', this.user)
                this.token = res.data.token
                this.isAuthenticated = true
                localStorage.setItem('token', this.token)
                return true

            } catch (err) {
                console.error('Login error', err)
                return false
            }
        },

        async logout() {
            try {
              await api.post('/api/logout')
              this.user = null
              this.token = null
              this.isAuthenticated = false
              localStorage.removeItem('token')

            } catch (err) {
              console.error('Logout error', err)
            }
        },

        async fetchUser() {
          try {
            const res = await api.get('/api/user')
            this.user = res.data
            this.isAuthenticated = true

          } catch (err) {
            this.user = null
            this.token = null
            this.isAuthenticated = false
            localStorage.removeItem('token')
          }
        }
    }
})
