// stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: localStorage.getItem('auth') === 'true',
  }),

  actions: {
    signup(email, password) {
      // You could expand this with real API logic or localStorage-based mock auth
      const user = { email, password }
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
      this.isAuthenticated = true
      localStorage.setItem('auth', true)
    },

    login(email, password) {
      const savedUser = JSON.parse(localStorage.getItem('user'))
      if (savedUser?.email === email && savedUser?.password === password) {
        this.user = savedUser
        this.isAuthenticated = true
        localStorage.setItem('auth', true)
        return true
      } else {
        return false
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('auth')
    }
  }
})
