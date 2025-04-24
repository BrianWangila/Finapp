import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    selectedTransaction: null,
    // allTransactions: []
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
  }),


  actions: {
    async fetchTransactions() {
      try {
        const response = await axios.get('http://localhost:8000/api/transactions')
        withCredentials: true,
        this.allTransactions = response.data
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    },

    async createTransaction(data) {
      try {
        const res = await axios.post('http://localhost:8000/api/transactions', data)
        this.allTransactions.unshift(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    setTransaction(transaction) {
      this.selectedTransaction = transaction
    },

    clearTransaction() {
      this.selectedTransaction = null
    },

    selectTransaction(transaction) {
      this.selectedTransaction = transaction
    }
  }
})
