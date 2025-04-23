<template>
    <div>
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-bold text-lg text-black py-2">Transactions</h3>
        <router-link to="/transactions" class="text-sm text-violet-600">View All</router-link>
      </div>
  
      <div class="space-y-4 ">

        <TransactionItem 
          v-for="tx in transactions"
          :key="tx.id"
          class="transaction-item"
          v-bind="tx"

        />
      </div>
    </div>
</template>
  


<script>
  import TransactionItem from './TransactionItem.vue'
  import { useTransactionStore } from '../stores/transactionStore'


  export default {
    name: 'TransactionList',

    components: {
      TransactionItem
    },

    computed: {
      transactions(){
        const store = useTransactionStore()
        return store.allTransactions.slice(0, 3)
      }
    }
  }
</script>



<style scoped>
  .transaction-item {
    margin-bottom: 5px;
  }
</style>