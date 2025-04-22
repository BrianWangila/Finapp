import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    selectedTransaction: null,
  }),

  actions: {
    setTransaction(transaction) {
      this.selectedTransaction = transaction
    },
    clearTransaction() {
      this.selectedTransaction = null
    },
  }
})
