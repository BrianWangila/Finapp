<template>
  <!-- <router-link :to="{ name: 'TransactionDetail', params: { id: transaction.id } }" class="block"> -->
    <div @click="goToDetail" class="cursor-pointer flex items-center bg-white p-3 rounded-xl shadow gap-4">
      <img :src="logo" class="w-12 h-12 rounded-xl" />
      <div class="flex-1">
        <p class="font-bold text-black">{{ name }}</p>
        <p class="text-sm text-gray-500">{{ type }}</p>
      </div>
      <div :class="negative ? 'text-red-500' : 'text-green-500'" class="font-semibold">
        Ksh. {{ formatNumberWithCommas(amount) }}
      </div>
    </div>
  <!-- </router-link> -->
</template>



<script setup>
  import { useRouter } from 'vue-router'
  import { useTransactionStore } from '../stores/transactionStore'
  import { formatNumberWithCommas } from '@/formatNumbers'


  const props = defineProps ({
    id: Number,
    logo: String,
    name: String,
    type: String,
    amount: [String, Number],
    negative: Boolean,
  });
    
  const router = useRouter();
  const transactionStore = useTransactionStore();

  const goToDetail = () => {
    const transaction = transactionStore.allTransactions.find(t => t.id === props.id);
    if (!transaction) {
      console.error('Transaction not found for ID:', props.id);
      return;
    }
    transactionStore.selectTransaction(transaction);
    router.push({ name: 'TransactionDetail', params: { id: props.id } });
  };
</script>
  

<style scoped>
  .cursor-pointer {
    margin-bottom: 0.8rem;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

</style>