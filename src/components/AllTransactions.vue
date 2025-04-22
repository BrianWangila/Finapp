<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Header -->
      <header class="bg-violet-100 text-center py-4 px-4 relative">
        <h2 class="font-semibold text-lg text-gray-700">Transactions</h2>
        <div class="absolute right-4 top-4 relative">
          <span class="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">4</span>
          <button class="text-violet-600 text-lg">🔔</button>
        </div>
      </header>
  
      <!-- Transaction List -->
      <div class="p-4 space-y-6 flex-grow">
        <!-- Today -->
        <div>
          <h3 class="font-semibold text-gray-600 mb-3">Today</h3>
          <div class="space-y-3">
            <TransactionItem name="Amazon" type="Shopping" logo="https://logo.clearbit.com/amazon.com" amount="- $150" :negative="true" />
            <TransactionItem name="Apple" type="Appstore Purchase" logo="https://logo.clearbit.com/apple.com" amount="- $29" :negative="true" />
            <TransactionItem name="Alex Ljung" type="Transfer" logo="https://i.pravatar.cc/40?img=10" amount="+ $1,000" :negative="false" />
            <TransactionItem name="Beatriz Brito" type="Transfer" logo="https://i.pravatar.cc/40?img=12" amount="- $186" :negative="true" />
          </div>
        </div>
  
        <!-- Yesterday -->
        <div>
          <h3 class="font-semibold text-gray-600 mb-3">Yesterday</h3>
          <div class="space-y-3">
            <TransactionItem name="Amazon" type="Shopping" logo="https://logo.clearbit.com/amazon.com" amount="- $150" :negative="true" />
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import TransactionItem from '../components/TransactionItem.vue'
  
  export default {
    name: 'AllTransactions',
    
    components: {
      TransactionItem
    }
  }
  </script>
  