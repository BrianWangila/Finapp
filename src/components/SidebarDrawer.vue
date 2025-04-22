<template>
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-40 bg-opacity-40" @click.self="closeDrawer">
        <div class="w-4/5 max-w-xs bg-white h-full p-6 flex flex-col shadow-lg z-50">
          <!-- Profile -->
          <div class="flex items-center gap-4 mb-6">
            <img src="https://i.pravatar.cc/80?img=14" class="w-14 h-14 rounded-full" />
            <div>
              <div class="flex items-center gap-15">    
                <p class="font-semibold text-lg text-black">John Doe</p>
                <button @click="$emit('close')" class="text-gray-600 text-xl">×</button>
              </div>
              <p class="text-sm text-gray-400">#ID 007456</p>
              
            </div>
          </div>
  
          <!-- Balance -->
          <div class="bg-white rounded-2xl p-6 shadow-md space-y-4">
            <div>
              <p class="text-gray-500">Total Balance</p>
              <h2 class="text-3xl font-bold text-black">$2,562.50</h2>
            </div>
            <div class="grid grid-cols-4 gap-3 text-center text-yellow-500">
              <div class="space-y-1">
                <button class="bg-pink-500 text-white p-2 rounded-full text-xl">⬇️</button>
                <p>Deposit</p>
              </div>
              <div class="space-y-1">
                <button class="bg-indigo-500 text-white p-2 rounded-full text-xl">➡️</button>
                <p>Send</p>
              </div>
              <div class="space-y-1">
                <button class="bg-green-500 text-white p-2 rounded-full text-xl">💳</button>
                <p>Cards</p>
              </div>
              <div class="space-y-1">
                <button class="bg-yellow-400 text-white p-2 rounded-full text-xl">🔁</button>
                <p>Withdraw</p>
              </div>
            </div>
          </div>
  
          <!-- Menu -->
          <nav class="flex-1 space-y-4 py-4">
            <div>
              <p class="text-xs uppercase text-gray-400 mb-1">Menu</p>
              <ul class="space-y-2 text-sm">
                <li><router-link to="/home" class="text-gray-700 hover:text-violet-600">Overview</router-link></li>
                <li><a href="#" class="text-gray-700 hover:text-violet-600">Pages</a></li>
                <li><router-link to="/my-cards" class="text-gray-700 hover:text-violet-600">My Cards</router-link></li>
              </ul>
            </div>
            <div class="py-5">
              <p class="text-xs uppercase text-gray-400">Others</p>
              <ul class="space-y-2 text-sm">
                <li><a href="#" class="text-gray-700 hover:text-violet-600">Settings</a></li>
                <li><a href="#" class="text-gray-700 hover:text-violet-600">Support</a></li>
                <li><button @click="logout" class="text-red-500 font-semibold">Log Out</button></li>
              </ul>
            </div>
          </nav>
        </div>

        <!-- Clickable Backdrop -->
        <div class="flex-1 bg-black bg-opacity-30" @click="$emit('close')"></div>
      </div>
    </transition>
</template>



<script>
    export default {
        name: 'SideDrawer',
        props: ['isOpen'],
        methods: {
            closeDrawer() {
            this.$emit('close')
            }
        },

        methods: {
          logout(){
            localStorage.removeItem('auth')
            this.$router.push('/login')
          }
        }
    }
</script>



<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s ease;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>
  