<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-violet-100 px-4 py-4 flex items-center justify-between">
        <button @click="$router.go(-1)" class="text-gray-600 text-2xl">←</button>
        <h2 class="text-lg font-semibold text-gray-700">Notifications</h2>
        <div></div> <!-- Spacer for alignment -->
      </header>
  
      <!-- Loading State -->
      <div v-if="notificationStore.loading" class="text-center p-4">
        <p>Loading notifications...</p>
      </div>
  
      <!-- Error State -->
      <div v-if="notificationStore.error" class="text-center p-4 text-red-500">
        <p>{{ notificationStore.error }}</p>
      </div>
  
      <!-- Notifications List -->
      <div v-else-if="notifications.length" class="p-4 space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          :class="{ 'opacity-50': notification.is_read }"
        >
          <div>
            <p class="font-semibold text-gray-800">{{ notification.message }}</p>
            <p class="text-sm text-gray-500">{{ formatDate(notification.created_at) }}</p>
          </div>
          <button
            v-if="!notification.is_read"
            @click="markAsRead(notification.id)"
            class="text-blue-500 text-sm"
          >
            Mark as Read
          </button>
        </div>
      </div>
  
      <!-- No Notifications State -->
      <div v-else class="text-center p-4 text-gray-600">
        <p>No notifications available.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useNotificationStore } from '@/stores/notificationStore';
  
  const notificationStore = useNotificationStore();
  
  // Computed property to get notifications
  const notifications = computed(() => notificationStore.notifications);
  
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      await notificationStore.markAsRead(notificationId);
    } catch (err) {
      alert('Failed to mark notification as read: ' + err.message);
    }
  };
  
  // Fetch notifications on mount (already handled in HomePage.vue, but ensure it's up-to-date)
  </script>
  
  <style scoped>
  .opacity-50 {
    opacity: 0.5;
  }
  </style>