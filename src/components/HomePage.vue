<template>
    <div class="min-h-screen bg-gray-100 font-sans">
        <!-- Top Bar -->
        <header class="bg-violet-600 text-white p-4 flex items-center justify-between">
            <button @click="drawerOpen = true" class="text-2xl">&#9776;</button>
            <SidebarDrawer :isOpen="drawerOpen" @close="drawerOpen = false" />
            <h1 class="font-bold text-xl">Finapp</h1>
            <div class="flex items-center gap-4">
                <div class="relative">
                <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">4</span>
                <button>🔔</button>
            </div>
            <img src="https://i.pravatar.cc/32" class="rounded-full w-8 h-8" alt="User" />
        </div>
        </header>


      <!-- Main Content -->
      <main class="p-4 space-y-6">
        <BalanceCard />
        <SummaryCards class="py-5"/>
        <TransactionList />

        <div>
            <div class="flex items-center justify-between px-4 mt-6 py-3">
                <h2 class="text-lg font-semibold text-black">Your Cards</h2>
                <router-link to="/my-cards" class="text-blue-600 text-sm">View all</router-link>
            </div>
            <div class="overflow-x-auto px-4 py-2">
                <div class="flex space-x-4">
                <div v-for="(card, index) in cards" :key="index" class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 min-w-[250px]">
                    <div class="text-sm">Balance</div>
                    <div class="text-xl font-bold mb-4">
                    {{ card.balance }}
                    </div>
                    <div class="text-sm tracking-widest">{{ card.number }}</div>
                    <div class="flex justify-between text-xs mt-2">
                    <span>EXP: {{ card.expiry }}</span>
                    <span>CVV: {{ card.cvv }}</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </main>


        <footer class="text-center text-xs text-gray-500 p-4 bg-white">
          ©Finapp 2025. All Rights Reserved.
        </footer>
    </div>
  </template>
  
  
  
  <script>
    import BalanceCard from './BalanceCard.vue'
    import SummaryCards from './SummaryCards.vue'
    import TransactionList from './TransactionList.vue'
    import SidebarDrawer from './SidebarDrawer.vue'
  
  export default {
    name: 'App',
  
    components: {
      BalanceCard,
      SummaryCards,
      TransactionList,
      SidebarDrawer,
    },
  
    data() {
      return {
        drawerOpen: false,
        cards: [
            { balance: '$1,250.00', number: '**** **** **** 1234', expiry: '12/26', cvv: '123' },
            { balance: '$500.00', number: '**** **** **** 5678', expiry: '08/25', cvv: '456' }
        ]
      }
    },
  }
  </script>
  