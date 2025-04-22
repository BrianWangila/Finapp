<template>
    <div class="bg-white min-h-screen p-4">
      <button @click="$router.go(-1)" class="text-gray-500 text-2xl">←</button>
      <h2 class="text-xl font-semibold mb-4 mt-2">My Cards</h2>
      <div class="space-y-4">
        <div v-for="(card, index) in cards" :key="index" class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4">
          <div class="text-sm">Balance</div>
          <div class="text-xl font-bold mb-4">
            {{ card.balance }}
          </div>
          <div class="text-sm tracking-widest">{{ card.number }}</div>
          <div class="flex justify-between text-xs mt-2">
            <span>EXP: {{ card.expiry }}</span>
            <span>CVV: {{ card.cvv }}</span>
          </div>
        </div>
      </div>
    </div>
</template>



<script>
    export default {
        name: 'MyCards',
        
        data() {
            return {
            cards: [
                { balance: '$1,250.00', number: '**** **** **** 1234', expiry: '12/26', cvv: '123' },
                { balance: '$500.00', number: '**** **** **** 5678', expiry: '08/25', cvv: '456' },
                { balance: '$3,150.00', number: '**** **** **** 9012', expiry: '01/28', cvv: '789' }
            ]
            }
        }
    }
</script>