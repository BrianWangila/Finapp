import { defineStore } from 'pinia';
import axios from 'axios';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),

  getters: {
    notificationCount: (state) => state.notifications.filter((n) => !n.read).length,
  },

  actions: {
    async fetchNotifications() {
      try {
        const response = await axios.get('/api/notifications', { withCredentials: true });
        this.notifications = response.data;
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    },
  },
});