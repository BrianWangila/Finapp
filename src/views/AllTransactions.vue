<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Header -->
      <header class="transactions-head bg-violet-100 text-center py-4 px-4 relative">
        <button @click="$router.go(-1)" class="text-gray-600 text-3xl">←</button>
        <h2 class="font-semibold text-lg text-gray-700">Transactions</h2>
        <div class="absolute right-4 top-4 relative">
          <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">4</span>
          <button>🔔</button>
        </div>
      </header>
  
      <!-- Transaction List -->
      <div class="p-4 space-y-6 flex-grow">
        <div>
          <!-- <h3 v-for="(transaction, day) in groupedTransaction" :key="day" class="font-semibold text-gray-600 mb-3">{{ day }}</h3> -->
          <div class="space-y-3">
            <TransactionItem 
              v-for="(transaction, index) in allTransactions"
              :key="index"
              class="transaction-item" 
              :name="transaction.name"
              :type="transaction.type"
              :logo="transaction.logo"
              :amount="transaction.amount"
              :negative="transaction.negative"
              />
          </div>
        </div>
  
      </div>
  
    </div>
</template>
  


<script>
  import TransactionItem from '../components/TransactionItem.vue'
  
  export default {
    name: 'AllTransactions',
    
    components: {
      TransactionItem
    },

    data(){
      return {
        allTransactions: [
          {
            id: 1,
            name: 'Amazon',
            type: 'Shopping',
            logo: 'https://logo.clearbit.com/amazon.com',
            amount: '- $150',
            negative: true,
            date: '2025-04-22',
            status: 'Completed',
            to: 'Amazon Inc.',
            bankName: 'Chase Bank',
            category: 'E-commerce'
          },
          {
            id: 2,
            name: 'Apple',
            type: 'Appstore Purchase',
            logo: 'https://logo.clearbit.com/apple.com',
            amount: '- $29',
            negative: true,
            date: '2025-04-22',
            status: 'Completed',
            to: 'Apple Services',
            bankName: 'Bank of America',
            category: 'Digital Services'
          },
          {
            id: 3,
            name: 'Alex Ljung',
            type: 'Transfer',
            logo: 'https://i.pravatar.cc/40?img=10',
            amount: '+ $1,000',
            negative: false,
            date: '2025-04-22',
            status: 'Pending',
            to: 'Alex Ljung',
            bankName: 'Wells Fargo',
            category: 'Transfer'
          },
          {
            id: 4,
            name: 'Beatriz Brito',
            type: 'Transfer',
            logo: 'https://i.pravatar.cc/40?img=12',
            amount: '- $186',
            negative: true,
            date: '2025-04-22',
            status: 'Failed',
            to: 'Beatriz Brito',
            bankName: 'Citibank',
            category: 'Transfer'
          },
          {
            id: 5,
            name: 'Amazon',
            type: 'Shopping',
            logo: 'https://logo.clearbit.com/amazon.com',
            amount: '- $150',
            negative: true,
            date: '2025-04-21',
            status: 'Completed',
            to: 'Amazon Inc.',
            bankName: 'Chase Bank',
            category: 'E-commerce'
          }
        ]
      }
    },

    computed: {
      groupedTransaction() {
        const today = new Date().toISOString().slice(0, 10)
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
        const grouped = {}
        this.transactions.forEach(tx => {
          let label
          if (tx.date === today) {
            label = 'Today'
          } else if (tx.date === yesterday) {
            label = 'Yesterday'
          } else {
            label = new Date(tx.date).toLocaleDateString()
          }
          if (!grouped[label]) grouped[label] = []
          grouped[label].push(tx)
        })
        return grouped
      }
    },
  }
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