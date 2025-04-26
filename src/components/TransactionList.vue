<template>
    <div>
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-bold text-lg text-black py-2">Transactions</h3>
        <router-link to="/transactions" class="text-sm text-violet-600">View All</router-link>
      </div>
  
      <div v-if="transactions.length" class="space-y-4 ">
        <TransactionItem 
          v-for="tx in transactions"
          :key="tx.id"
          class="transaction-item"
          v-bind="tx"
        />
      </div>

      <div v-else class="text-center p-4">
        <p>No recent transactions.</p>
      </div>
    </div>
</template>
  


<script setup>
  import { computed, onMounted } from 'vue';
  import { useTransactionStore } from '../stores/transactionStore';
  import TransactionItem from './TransactionItem.vue';

  const transactionStore = useTransactionStore();

  const transactions = computed(() => transactionStore.allTransactions.slice(0, 3));

  onMounted(() => {
    transactionStore.fetchTransactions();
  });
</script>



<style scoped>
  .transaction-item {
    margin-bottom: 5px;
  }
</style>