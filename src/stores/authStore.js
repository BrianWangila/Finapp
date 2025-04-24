// stores/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

// Set the base URL for axios
const api = axios.create({
  baseURL: 'https://capitallandinvest.com/api/api',
  // baseURL: 'https://api.capitallandinvest.com/api',
  // baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
})


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
  }),


  actions: {
        async signup(username, email, password) {
            try {
            const res = await api.post('/register', { username, email, password })
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
                const res = await api.post('/login', { email, password })
                this.token = res.data.token
                this.user = res.data.user
                this.isAuthenticated = true
                localStorage.setItem('token', this.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                return true

                // this.router.push('/home') 

            } catch (error) {
                // console.error(err)
                return false
            }
        
        },

        async logout() {
            api.post('/logout')
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
        },

        // async checkAuth() {
        //   if (!this.token) return
        //   try {
        //     api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        //     const response = await api.get('/user')
        //     this.user = response.data
        //     this.isAuthenticated = true
        //   } catch (err) {
        //     this.user = null
        //     this.isAuthenticated = false
        //   }
        // }
    }
})
