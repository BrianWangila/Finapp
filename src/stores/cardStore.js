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
        this.cards = res.data

        console.log(this.cards)

      } catch (err) {
        console.error('Error fetching cards:', err)
        this.error = 'Failed to load cards'
      } finally {
        this.loading = false
      }
    }
  },


  async addCard(cardData) {
    try {
      const res = await api.post('/api/cards', cardData)
      this.cards.push(res.data)
      return true
      
    } catch (err) {
      console.error('Add card error:', err)
      return false
    }
  }

})
