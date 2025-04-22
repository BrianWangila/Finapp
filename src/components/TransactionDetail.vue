<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-violet-100 px-4 py-4 flex items-center justify-between">
        <button @click="$router.go(-1)" class="text-gray-600 text-2xl">←</button>
        <h2 class="text-lg font-semibold text-gray-700">Transaction Detail</h2>
        <button class="text-red-500 text-xl">🗑️</button>
      </header>
  
      <!-- Transaction Detail Card -->
      <div class="p-4">
        <div class="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <div class="flex items-center space-x-4">
            <img :src="transaction.logo" alt="logo" class="w-10 h-10 rounded-full" />
            <div>
              <h3 class="text-xl font-semibold text-gray-800">{{ transaction.name }}</h3>
              <p class="text-sm text-gray-500">{{ transaction.type }}</p>
            </div>
          </div>
  
          <div class="text-sm text-gray-600 space-y-2">
            <div>
              <span class="font-semibold">Status:</span> {{ transaction.status }}
            </div>
            <div>
              <span class="font-semibold">To:</span> {{ transaction.to }}
            </div>
            <div>
              <span class="font-semibold">Bank Name:</span> {{ transaction.bankName }}
            </div>
            <div>
              <span class="font-semibold">Category:</span> {{ transaction.category }}
            </div>
            <div>
              <span class="font-semibold">Date:</span> {{ transaction.date }}
            </div>
            <div class="text-lg font-bold" :class="transaction.negative ? 'text-red-500' : 'text-green-500'">
              {{ transaction.amount }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>



<script>
    export default {
    name: 'TransactionDetail',
    props: ['id'],
    data() {
        return {
        transaction: null
        }
    },

    created(){
        this.transaction = transactions.find(t => t.id === parseInt(this.id))
    }
}
</script>



<style scoped>
    header button {
        background: transparent;
    }

</style>
  