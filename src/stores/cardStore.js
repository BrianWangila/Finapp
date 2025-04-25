import { defineStore } from 'pinia'
import api from '@/api' 


export const useCardStore = defineStore('card', {
  state: () => ({
    cards: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCards() {
      this.loading = true
      this.error = null

      try {
        const res = await api.get('/api/cards')
        console.log('API response for fetchCards:', res)
        this.cards = res.data || []

        console.log('Fetched cards', this.cards)

      } catch (err) {
        console.error('Error fetching cards:', err)
        this.error = 'Failed to load cards: ' + (err.response?.data?.message || err.message)
      } finally {
        this.loading = false
      }
    },
  


    async addCard(cardData) {
      try {
        const res = await api.post('/api/cards', cardData)
        console.log('API response for addCard:', res)
        this.cards.push(res.data)
        this.error = null
        return true
        
      } catch (err) {
        console.error('Add card error:', err)
        this.error = 'Failed to add card: ' + (err.response?.data?.message || err.message)
        return false
      }
    }
  }
})
