<template>
    <div class="min-h-screen flex flex-col justify-between bg-white px-6 pt-20 pb-32">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-center text-violet-700 mb-2">Welcome Back</h1>
        <p class="text-sm text-center text-gray-500 mb-10">Please login to your account</p>
  
        <!-- Email Input -->
        <form>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-1" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter your email"
            />
          </div>
    
          <!-- Password Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1" for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter your password"
            />
          </div>
        </form>
  
        <!-- Links -->
        <div class="flex justify-between text-sm mt-3">
          <router-link to="/signup" class="text-violet-600 font-medium">Register</router-link>
          <a href="#" class="text-gray-500 hover:text-violet-600">Forgot Password?</a>
        </div>
      </div>
  
      <!-- Login Button (Bottom Fixed) -->
      <div class="bg-white px-6 pb-6 pt-3 border-t border-gray-200">
        <button
          @click="handleLogin"
          class="w-full bg-violet-600 text-white font-bold py-3 rounded-xl text-lg hover:bg-violet-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
</template>
  


<script>
  import { useAuthStore } from '@/stores/authStore'

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      handleLogin() {
        if (!this.email || !this.password) {
          alert('Please enter both email and password.')
          return
        }
        const authStore = useAuthStore()
        const success = authStore.login(this.email, this.password)
        if (success) {
          this.$router.push('/home')
        } else {
          alert('Invalid email or password, try again.')
        }
      },
    },
  }
</script>
  