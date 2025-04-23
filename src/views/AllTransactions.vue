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
        <div>
          <div class="space-y-3">
            <TransactionItem 
              v-for="(transaction, index) in allTransactions"
              :key="index"
              class="transaction-item" 
              :name="transaction.name"
              :type="transaction.type"
              :logo="transaction.logo"
              :amount="transaction.amount"
              :negative="transaction.negative"
              @click="viewTransactionDetail(transaction)"
              
              />
          </div>
        </div>
  
      </div>
  
    </div>
</template>
  


<script>
  import TransactionItem from '../components/TransactionItem.vue'
  import { useTransactionStore } from '../stores/transactionStore'
  import { mapState } from 'pinia'
  
  export default {
    name: 'AllTransactions',
    
    components: {
      TransactionItem
    },

    setup() {
      const store = useTransactionStore()
      const viewTransactionDetail = (transaction) => {
        store.selectTransaction(transaction)
        window.location.href = `/transaction-detail/${transaction.id}`
      }

      return {
        allTransactions: store.allTransactions,
        viewTransactionDetail
      }
    },

    computed: {
      ...mapState(useTransactionStore, ['allTransactions']),
     
    },

    methods: {
      viewTransactionDetail(transaction) {
        this.$router.push({ name: 'TransactionDetail', params: { id: transaction.id } })
      }
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