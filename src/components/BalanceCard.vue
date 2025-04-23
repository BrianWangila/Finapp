<template>
  <div class="bg-white rounded-2xl p-6 shadow-md space-y-4">
    <div>
      <p class="text-gray-500">Total Balance</p>
      <h2 class="text-3xl font-bold text-black">$2,562.50</h2>
    </div>
    <div class="grid grid-cols-4 gap-3 text-center text-yellow-500">
      <div class="space-y-1">
        <button @click="$emit('withdraw')" class="bg-pink-500 text-white p-2 rounded-full text-xl">⬇️</button>
        <p>Withdraw</p>
      </div>
      <div class="space-y-1">
        <button @click="$emit('send')" class="bg-indigo-500 text-white p-2 rounded-full text-xl">➡️</button>
        <p>Send</p>
      </div>
      <div class="space-y-1">
        <button @click="$emit('cards')" class="bg-green-500 text-white p-2 rounded-full text-xl">💳</button>
        <p>Cards</p>
      </div>
      <div class="space-y-1">
        <button @click="$emit('exchange')" class="bg-yellow-400 text-white p-2 rounded-full text-xl">🔁</button>
        <p>Exchange</p>
      </div>
    </div>
  </div>
</template>


  
<script>
  export default {
    name: 'BalanceCard'

  }
</script>
  