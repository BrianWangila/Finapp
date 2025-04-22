<template>
    <div>
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-bold text-lg">Transactions</h3>
        <a href="#" class="text-sm text-violet-600">View All</a>
      </div>
  
      <div class="space-y-4">
        <TransactionItem
          logo="https://logo.clearbit.com/amazon.com"
          name="Amazon"
          type="Shopping"
          amount="- $150"
          :negative="true"
        />
        <TransactionItem
          logo="https://logo.clearbit.com/apple.com"
          name="Apple"
          type="Appstore Purchase"
          amount="- $29"
          :negative="true"
        />
        <TransactionItem
          logo="https://i.pravatar.cc/32?img=5"
          name="Alex Ljung"
          type="Transfer"
          amount="+ $1,000"
          :negative="false"
        />
      </div>
    </div>
  </template>
  


  <script>
  import TransactionItem from './TransactionItem.vue'
  
  export default {
    name: 'TransactionList',

    components: {
      TransactionItem
    }
  }
  </script>
  