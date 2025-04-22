<template>
    <div class="cards bg-white min-h-screen">
      
        <header class="transactions-head bg-violet-100 text-center py-4 px-4 relative">
        <button @click="$router.go(-1)" class="text-gray-600 text-3xl">←</button>
        <h2 class="font-semibold text-lg text-gray-700">My Cards</h2>
        <div class="absolute right-4 top-4 relative">
          <button class="add-card">+</button>
        </div>
        </header>

      <div class="space-y-4">
        <div v-for="(card, index) in cards" :key="index" class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4">
          <div class="text-sm">Balance</div>
          <div class="text-xl font-bold mb-4 py-2">
            {{ card.balance }}
          </div>
          <div class="text-sm tracking-widest py-2">{{ card.number }}</div>
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
                { balance: '$1,250.00', number: '1234 1234 1234 1234', expiry: '12/26', cvv: '123' },
                { balance: '$500.00', number: '5678 5678 5678 5678', expiry: '08/25', cvv: '456' },
                { balance: '$3,150.00', number: '9012 9012 9012 9012', expiry: '01/28', cvv: '789' }
            ]
            }
        }
    }
</script>



<style scoped>
    .transactions-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: purple;
    }

    .add-card {
        color: purple;
        font-size: 20px;

    }

    .cards .bg-gradient-to-r {
        margin-bottom: 20px;
    }

    .cards .space-y-4 {
        margin-top: 10px;
        padding: 20px;
    }

</style>