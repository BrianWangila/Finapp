<template>
    <div class="min-h-screen flex flex-col justify-between bg-white px-6 pt-20 pb-32">
      <div>
        <h1 class="text-3xl font-bold text-center text-violet-700 mb-2">Create Account</h1>
        <p class="text-sm text-center text-gray-500 mb-10">Sign up to get started</p>
        
        <form>
            <div class="mb-4">
                <label class="block text-sm text-gray-600 mb-2">Username</label>
                <input v-model="name" type="name" class="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Username" />
            </div>

            <div class="mb-4">
                <label class="block text-sm text-gray-600 mb-2">Email</label>
                <input v-model="email" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Email" />
            </div>
    
            <div>
                <label class="block text-sm text-gray-600 mb-2">Password</label>
                <input v-model="password" type="password" class="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Password" />
            </div>

            <div>
                <label class="block text-sm text-gray-600 mb-1">Re-enter Password</label>
                <input v-model="confirmPassword" type="password" class="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Password" />
            </div>
        </form>

        <router-link to="/" class="text-blue-600 text-sm">Already have an account? Login</router-link>
      </div>
  
      <div class="bg-white px-6 pb-6 pt-3 border-t">
        <button @click="handleSignup" class="w-full bg-violet-600 text-white py-3 rounded-xl text-lg">Sign Up</button>
      </div>
    </div>
</template>



<script>
  import { useAuthStore } from '@/stores/authStore'

  export default {
    name: 'SignUp',

    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },

    methods: {
      handleSignup() {
        if (!this.username || !this.email || !this.password || !this.confirmPassword) {
          alert('Please fill all fields')
          return
        }

        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match.')
          return
        }

        const authStore = useAuthStore()

        authStore.signup(this.username, this.email, this.password)
        this.$router.push('/login')
      }
    }
  }
</script>
  