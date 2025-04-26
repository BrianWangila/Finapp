<template>
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-40 bg-opacity-40" @click.self="closeDrawer">
        <div class="w-4/5 max-w-xs bg-white h-full p-6 flex flex-col shadow-lg z-50">
          <!-- Profile -->
          <div class="flex items-center gap-4 mb-6">
            <img :src="userAvatar" class="w-14 h-14 rounded-full" />
            <div>
              <div class="flex items-center gap-15">    
                <p class="font-semibold text-lg text-black">{{ authStore.user?.username }}</p>
                <button @click="$emit('close')" class="text-gray-600 text-xl">×</button>
              </div>
              <p class="text-sm text-gray-400">#ID {{ authStore.user?.id_number }}</p>
            </div>
          </div>
  
          <!-- Balance -->
          <div class="bg-white rounded-2xl p-6 shadow-md space-y-4">
            <div>
              <p class="text-gray-500">Balance</p>
              <h2 class="text-2xl font-bold text-black">{{ formatNumberWithCommas(totalBalance) }}</h2>
            </div>
            <div class="grid grid-cols-4 gap-3 text-center text-yellow-500 py-3">
              <div class="space-y-1">
                <button @click="$emit('open-deposit')" class="bg-pink-500 text-white p-2 rounded-full text-xl">⬇️</button>
                <p>Deposit</p>
              </div>
              <div class="space-y-1">
                <button @click="$emit('open-send')" class="bg-indigo-500 text-white p-2 rounded-full text-xl">➡️</button>
                <p>Send</p>
              </div>
              <div class="space-y-1">
                <button @click="$emit('open-cards')" class="bg-green-500 text-white p-2 rounded-full text-xl">💳</button>
                <p>Cards</p>
              </div>
              <div class="space-y-1">
                <button @click="$emit('open-withdraw')" class="bg-yellow-400 text-white p-2 rounded-full text-xl">🔁</button>
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
                <li><router-link to="/settings" class="text-gray-700 hover:text-violet-600">Settings</router-link></li>
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



<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore';
  import { useCardStore } from '@/stores/cardStore';
  import axios from 'axios';
  import { formatNumberWithCommas } from '@/formatNumbers';


  const props = defineProps({
    isOpen: Boolean,
  });
  const emit = defineEmits(['close', 'open-send', 'open-withdraw', 'open-deposit', 'open-cards']);
  const router = useRouter();
  const authStore = useAuthStore();
  const cardStore = useCardStore();

  const userAvatar = ref('https://i.pravatar.cc/80?img=14'); // Placeholder avatar
  const username = ref('John Doe');
  const idNumber = ref('007456');

  const totalBalance = computed(() => {
    return cardStore.cards.reduce((sum, card) => sum + parseFloat(card.balance || 0), 0).toFixed(2);
  });

  const closeDrawer = () => {
    emit('close');
  };

  const logout = async () => {
    try {
      await authStore.logout();
      router.push('/login');
      emit('close');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  onMounted(() => {
    cardStore.fetchCards();
  });
</script>



<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s ease;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }

    .space-y-4 li {
        margin-bottom: 0.4rem;
    }
</style>
  