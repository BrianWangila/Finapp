<template>
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-40 bg-black bg-opacity-40" @click.self="closeDrawer">
        <div class="absolute left-0 top-0 w-72 bg-white h-full p-6 flex flex-col shadow-lg">
          <!-- Profile -->
          <div class="flex items-center gap-4 mb-6">
            <img src="https://i.pravatar.cc/80?img=14" class="w-14 h-14 rounded-full" />
            <div>
              <p class="font-semibold text-lg">John Doe</p>
              <p class="text-sm text-gray-400">#ID 007456</p>
            </div>
          </div>
  
          <!-- Balance -->
          <div class="mb-6 bg-gray-100 p-4 rounded-lg">
            <p class="text-sm text-gray-500">Total Balance</p>
            <p class="text-xl font-bold text-gray-800">$2,562.50</p>
          </div>
  
          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <button class="bg-pink-100 text-pink-500 p-2 rounded-lg text-sm font-medium">Withdraw</button>
            <button class="bg-violet-100 text-violet-600 p-2 rounded-lg text-sm font-medium">Send</button>
            <button class="bg-green-100 text-green-600 p-2 rounded-lg text-sm font-medium col-span-2">Cards</button>
          </div>
  
          <!-- Menu -->
          <nav class="flex-1 space-y-4">
            <div>
              <p class="text-xs uppercase text-gray-400 mb-1">Menu</p>
              <ul class="space-y-2 text-sm">
                <li><a href="#" class="text-gray-700 hover:text-violet-600">Overview</a></li>
                <li><a href="#" class="text-gray-700 hover:text-violet-600">Pages</a></li>
                <li><a href="#" class="text-gray-700 hover:text-violet-600">My Cards</a></li>
              </ul>
            </div>
            <div>
              <p class="text-xs uppercase text-gray-400 mb-1">Others</p>
              <ul class="space-y-2 text-sm">
                <li><a href="#" class="text-gray-700 hover:text-violet-600">Settings</a></li>
                <li><a href="#" class="text-gray-700 hover:text-violet-600">Support</a></li>
                <li><a href="#" class="text-red-500 font-semibold">Log Out</a></li>
              </ul>
            </div>
          </nav>
        </div>
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
  