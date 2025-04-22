<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Header -->
      <header class="transactions-head bg-violet-100 text-center py-4 px-4 relative">
        <button @click="$router.go(-1)" class="text-gray-600 text-3xl">←</button>
        <h2 class="font-semibold text-lg text-gray-700">Transactions</h2>
        <div class="absolute right-4 top-4 relative">
          <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">4</span>
          <button>🔔</button>
        </div>
      </header>
  
      <!-- Transaction List -->
      <div class="p-4 space-y-6 flex-grow">
        <!-- Today -->
        <div>
          <h3 class="font-semibold text-gray-600 mb-3">Today</h3>
          <div class="space-y-3">
            <TransactionItem class="transaction-item" name="Amazon" type="Shopping" logo="https://logo.clearbit.com/amazon.com" amount="- $150" :negative="true" />
            <TransactionItem class="transaction-item" name="Apple" type="Appstore Purchase" logo="https://logo.clearbit.com/apple.com" amount="- $29" :negative="true" />
            <TransactionItem class="transaction-item" name="Alex Ljung" type="Transfer" logo="https://i.pravatar.cc/40?img=10" amount="+ $1,000" :negative="false" />
            <TransactionItem name="Beatriz Brito" type="Transfer" logo="https://i.pravatar.cc/40?img=12" amount="- $186" :negative="true" />
          </div>
        </div>
  
        <!-- Yesterday -->
        <div>
          <h3 class="font-semibold text-gray-600 mb-3 py-3">Yesterday</h3>
          <div class="space-y-3 transaction-item">
            <TransactionItem  name="Amazon" type="Shopping" logo="https://logo.clearbit.com/amazon.com" amount="- $150" :negative="true" />
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



<style scoped>
  .transaction-item {
    margin-bottom: 1rem;
  }

  .transactions-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }
  
</style>