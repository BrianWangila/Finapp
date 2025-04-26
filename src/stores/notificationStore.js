import { defineStore } from 'pinia';
import axios from 'axios';
import api from '@/api';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    loading: false,
    error: null,
  }),

  getters: {
    notificationCount: (state) => state.notifications.filter((n) => !n.read).length,
  },

  actions: {
    async fetchNotifications() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/api/notifications');
        this.notifications = response.data;
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        this.loading = false;
      }

    },

    async markAsRead(notificationId) {
      try {
        await api.patch(`/api/notifications/${notificationId}/read`, {});
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.is_read = true;
        }
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Failed to mark notification as read');
      }
    }
  },
});