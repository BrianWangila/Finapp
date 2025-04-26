<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Header -->
      <header class="transactions-head bg-violet-100 text-center py-4 px-4 relative">
        <button @click="$router.go(-1)" class="text-gray-600 text-3xl">←</button>
        <h2 class="font-semibold text-lg text-gray-700">Transactions</h2>
        <div class="absolute right-4 top-4 relative">
          <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {{ notificationCount }}
          </span>
          <button>🔔</button>
        </div>
      </header>
  
      <!-- Transaction List -->
      <div class="transactions-list p-4 space-y-6 flex-grow">
        <div v-if="transactionStore.loading" class="text-center p-4">
          <p>Loading transactions...</p>
        </div>

        <div v-else-if="transactionStore.error" class="text-center p-4 text-red-500">
          <p>{{ transactionStore.error }}</p>
        </div>

        <div v-else-if="allTransactions.length" class="list-card space-y-3 py-3">
          <TransactionItem
            v-for="transaction in allTransactions"
            :key="transaction.id"
            v-bind="transaction"
          />
        </div>
        <div v-else class="text-center p-4">
          <p>No transactions available.</p>
        </div>
      </div>
  
    </div>
</template>
  


<script setup>
  import { computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTransactionStore } from '../stores/transactionStore';
  import { useNotificationStore } from '../stores/notificationStore';
  import TransactionItem from '../components/TransactionItem.vue';

  const router = useRouter();
  const transactionStore = useTransactionStore();
  const notificationStore = useNotificationStore();

  const allTransactions = computed(() => {
    console.log('allTransactions:', transactionStore.allTransactions);
    return transactionStore.allTransactions
  });
  const notificationCount = computed(() => notificationStore.notificationCount);

  const viewTransactionDetail = (transaction) => {
    transactionStore.selectTransaction(transaction);
    router.push({ name: 'TransactionDetail', params: { id: transaction.id } });
  };

  onMounted(() => {
    transactionStore.fetchTransactions();
    notificationStore.fetchNotifications();
  });
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