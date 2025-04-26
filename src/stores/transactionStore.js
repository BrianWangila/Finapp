import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api' // Adjust the import based on your project structure


export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    selectedTransaction: null,
    allTransactions: [],
    loading: false,
    error: null
  }),


  actions: {
    async fetchTransactions() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/api/transactions')
        this.allTransactions = res.data
      } catch (error) {
        this.error = err.response?.data?.message || 'Failed to fetch transactions';
      }
      finally {
        this.loading = false
      }
    },

    async sendTransaction(data) {
      try {
        const response = await api.post('/api/transactions/send', data);
        this.allTransactions.unshift(response.data);
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Failed to send money');
      }
    },

    async withdrawToMpesa(data) {
      try {
        const response = await api.post('/api/transactions/withdraw', data);
        this.allTransactions.unshift(response.data);
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Failed to withdraw to MPESA');
      }
    },

    async deposit(data) {
      try {
        const response = await api.post('/api/transactions/deposit', data);
        this.allTransactions.unshift(response.data);
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Failed to deposit');
      }
    },


    // setTransaction(transaction) {
    //   this.selectedTransaction = transaction
    // },

    // clearTransaction() {
    //   this.selectedTransaction = null
    // },


    selectTransaction(transaction) {
      this.selectedTransaction = transaction
    }
  }
})
