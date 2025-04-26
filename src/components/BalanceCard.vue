<template>
  <div class="transactions-items bg-white rounded-2xl p-6 shadow-md space-y-4">
    <div class="flex justify-between items-center">
      <div>
        <p class="text-gray-500">Total Balance</p>
        <h2 class="text-2xl font-bold text-black">Ksh. {{ formatNumberWithCommas(totalBalance) }}</h2>
      </div>
      <div class="deposit-button">
        <button @click="$emit('deposit')" class="">&plus;</button>
      </div>
    </div>
    <hr class="border-gray-200" />
    <div class="transaction-buttons grid grid-cols-4 gap-3 text-center text-yellow-500">
      <div class="space-y-1">
        <button @click="$emit('withdraw')" class="bg-pink-500 text-white p-2 rounded text-xl">⬇️</button>
        <p>Withdraw</p>
      </div>
      <div class="space-y-1">
        <button @click="$emit('send')" class="bg-indigo-500 text-white p-2 rounded text-xl">➡️</button>
        <p>Send</p>
      </div>
      <div class="space-y-1">
        <button @click="$emit('cards')" class="bg-green-500 text-white p-2 rounded text-xl">💳</button>
        <p>Cards</p>
      </div>
      <div class="space-y-1">
        <button @click="$emit('exchange')" class="bg-yellow-400 text-white p-2 rounded text-xl">🔁</button>
        <p>Exchange</p>
      </div>
    </div>
  </div>
</template>


  
<script setup>
  import { useCardStore } from '@/stores/cardStore';
  import { computed } from 'vue';
  import { formatNumberWithCommas } from '@/formatNumbers';

  const cardStore = useCardStore();
  const totalBalance = computed(() => {
    return cardStore.cards.reduce((sum, card) => sum + parseFloat(card.balance || 0), 0).toFixed(2);
  });
</script>
  

<style scoped>
  .transactions-items hr {
    margin-top: 1rem;
    margin-bottom: 1rem;

  }

 .transaction-buttons button {
    border-radius: 10px;
    
 }
 
 .deposit-button {
    background-color: rgba(55, 3, 75, 0.226);
    color: white;
    border: none;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 0.8rem;
  }
  
  .deposit-button:hover {
    background-color: rgba(34, 3, 75, 0.774);
  }
  
  .deposit-button button {
    color: rgb(34, 3, 75);
    font-size: 1.5rem;
    font-weight: 600;
  }

  .deposit-button:hover button {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>