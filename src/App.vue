<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <!-- Top Bar -->
    <header class="bg-violet-600 text-white p-4 flex items-center justify-between">
      <button class="text-2xl">&#9776;</button>
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
    </main>



    <footer class="text-center text-xs text-gray-500 p-4 bg-white">
      ©Finapp 2025. All Rights Reserved.
    </footer>
  </div>
</template>



<script>
  import BalanceCard from './components/BalanceCard.vue'
  import SummaryCards from './components/SummaryCards.vue'
  import TransactionList from './components/TransactionList.vue'

export default {
  name: 'App',

  components: {
    BalanceCard,
    SummaryCards,
    TransactionList
  }
}
</script>
