<template>
    <div class="min-h-screen bg-gray-100 flex flex-col font-sans">
      <!-- Header -->
      <header class="bg-violet-100 text-center py-4 px-4 relative flex items-center justify-between">
        <button @click="$router.go(-1)" class="text-gray-600 text-3xl">←</button>
        <h2 class="font-semibold text-lg text-gray-700">Settings</h2>
        <div class="relative">
          <router-link to="/notifications">
            <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {{ notificationCount }}
            </span>
            <button>🔔</button>
          </router-link>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="p-4 space-y-6 flex-grow text-purple-900">
        <!-- Profile Picture (non-interactive) -->
        <div class="flex flex-col items-center">
          <div class="relative">
            <img :src="userAvatar" alt="User Avatar" class="w-24 h-24 rounded-full" />
            <button class="absolute bottom-0 right-0 bg-violet-600 text-white rounded-full p-2">📷</button>
          </div>
          <p class="mt-2 text-gray-700 py-1">ID: {{ userIdNumber }}</p>
        </div>
  
        <!-- Theme Section (non-interactive) -->
        <section>
          <h3 class="text-gray-700 font-semibold mb-2 py-2">Theme</h3>
          <div class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <span>Dark Mode</span>
            <input type="checkbox" disabled />
          </div>
        </section>
  
        <!-- Notifications Section (non-interactive) -->
        <section>
          <h3 class="text-gray-700 font-semibold mb-2 py-2">Notifications</h3>
          <div class="bg-white p-4 rounded-lg shadow space-y-4">
            <div class="flex justify-between items-center py-1">
              <div>
                <p>Payment Alert</p>
                <p class="text-gray-400 text-sm">Send notification when new payment is received</p>
              </div>
              <input type="checkbox" disabled />
            </div>
            <hr class="text-gray-200" />
            <div class="flex justify-between items-center py-1">
              <div>
                <p>Notification Sound</p>
                <p class="text-gray-400 text-sm">Beep</p>
              </div>
              <span class="text-gray-400">➡️</span>
            </div>
          </div>
        </section>
  
        <!-- Profile Settings Section (interactive) -->
        <section>
          <h3 class="text-gray-700 font-semibold mb-2 py-2">Profile Settings</h3>
          <div class="bg-white p-4 rounded-lg shadow space-y-4">
            
            <!-- Change Username -->
            <div class="flex justify-between items-center py-1">
              <span>Change Username</span>
              <button @click="showUsernameModal = true" class="text-violet-600">Edit ➡️</button>
            </div>
            <hr class="text-gray-200" />

            <!-- Update E-mail -->
            <div class="flex justify-between items-center py-1">
              <span>Update E-mail</span>
              <button @click="showEmailModal = true" class="text-violet-600">Edit ➡️</button>
            </div>
            <hr class="text-gray-200" />

            <!-- Update Password -->
            <div class="flex justify-between items-center py-1">
              <span>Update Password</span>
              <button @click="showPasswordModal = true" class="text-violet-600">Edit ➡️</button>
            </div>
            <hr class="text-gray-200" />

            <!-- Private Profile (non-interactive) -->
            <div class="flex justify-between items-center py-1">
              <span>Private Profile</span>
              <input type="checkbox" disabled />
            </div>
          </div>
        </section>
  
        <!-- Security Section (non-interactive except logout) -->
        <section>
          <h3 class="text-gray-700 font-semibold mb-2 py-2">Security</h3>
          <div class="bg-white p-4 rounded-lg shadow space-y-4">
            <!-- Update Password (already handled above) -->
            <!-- 2 Step Verification (non-interactive) -->
            <div class="flex justify-between items-center py-1">
              <span>2 Step Verification</span>
              <input type="checkbox" disabled checked />
            </div>
            <hr class="text-gray-200" />

            <!-- Log out all devices -->
            <div class="flex justify-between items-center py-1">
              <button @click="handleLogout" class="text-red-500">Log out all devices</button>
            </div>
          </div>
        </section>
      </main>
  
      <!-- Modals for Profile Updates -->
      <!-- Username Modal -->
      <transition name="slide-up">
        <div v-if="showUsernameModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg">
          <h2 class="text-xl font-bold">Change Username</h2>
          <hr />
          <button @click="showUsernameModal = false" class="x-button text-sm text-gray-500">x</button>
          <input v-model="form.username" placeholder="New Username" class="w-full p-2 mb-4 border-b rounded" />
          <div class="flex justify-center py-2">
            <button @click="updateUsername" class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Save</button>
          </div>
        </div>
      </transition>
  
      <!-- Email Modal -->
      <transition name="slide-up">
        <div v-if="showEmailModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg">
          <h2 class="text-xl font-bold">Update E-mail</h2>
          <hr />
          <button @click="showEmailModal = false" class="x-button text-sm text-gray-500">x</button>
          <input v-model="form.email" placeholder="New E-mail" type="email" class="w-full p-2 mb-4 border-b rounded" />
          <div class="flex justify-center py-2">
            <button @click="updateEmail" class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Save</button>
          </div>
        </div>
      </transition>
  
      <!-- Password Modal -->
      <transition name="slide-up">
        <div v-if="showPasswordModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg">
          <h2 class="text-xl font-bold">Update Password</h2>
          <hr />
          <button @click="showPasswordModal = false" class="x-button text-sm text-gray-500">x</button>
          <input v-model="form.password" placeholder="New Password" type="password" class="w-full p-2 mb-2 border-b rounded" />
          <input v-model="form.password_confirmation" placeholder="Confirm Password" type="password" class="w-full p-2 mb-4 border-b rounded" />
          <div class="flex justify-center py-2">
            <button @click="updatePassword" class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Save</button>
          </div>
        </div>
      </transition>
    </div>
</template>
  
<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useNotificationStore } from '@/stores/notificationStore';
  import { useAuthStore } from '@/stores/authStore';
  
  const router = useRouter();
  const notificationStore = useNotificationStore();
  const authStore = useAuthStore();
  
  const userAvatar = ref('https://i.pravatar.cc/150'); // Placeholder avatar
  const userIdNumber = ref('007456');

  const form = ref({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const showUsernameModal = ref(false);
  const showEmailModal = ref(false);
  const showPasswordModal = ref(false);
  
  const notificationCount = computed(() => notificationStore.notificationCount);
  
  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user', { withCredentials: true });
      form.value.username = response.data.username;
      form.value.email = response.data.email;
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };
  
  const updateUsername = async () => {
    try {
      await axios.put('/api/profile', { username: form.value.username }, { withCredentials: true });
      showUsernameModal.value = false;
      alert('Username updated successfully');
    } catch (err) {
      alert('Failed to update username: ' + (err.response?.data?.message || err.message));
    }
  };
  
  const updateEmail = async () => {
    try {
      await axios.put('/api/profile', { email: form.value.email }, { withCredentials: true });
      showEmailModal.value = false;
      alert('Email updated successfully');
    } catch (err) {
      alert('Failed to update email: ' + (err.response?.data?.message || err.message));
    }
  };
  
  const updatePassword = async () => {
    try {
      await axios.put('/api/profile', {
        password: form.value.password,
        password_confirmation: form.value.password_confirmation,
      }, { withCredentials: true });
      showPasswordModal.value = false;
      form.value.password = '';
      form.value.password_confirmation = '';
      alert('Password updated successfully');
    } catch (err) {
      alert('Failed to update password: ' + (err.response?.data?.message || err.message));
    }
  };
  
  const handleLogout = async () => {
    try {
      await authStore.logout();
      router.push('/login'); 
    } catch (err) {
      alert('Failed to logout: ' + (err.response?.data?.message || err.message));
    }
  };

  
  onMounted(() => {
    fetchUser();
    notificationStore.fetchNotifications();
  });
  </script>
  
  <style scoped>
  .popups-modal {
    background-color: white;
    border-radius: 1.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 80%;
    margin: auto;
  }
  
  .popups-modal h2 {
    margin-bottom: 1rem;
    text-align: center;
    color: black;
  }
  
  .popups-modal input {
    margin-bottom: 0.5rem;
    color: black;
  }
  
  .x-button {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.3s ease;
  }
  
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
  }
  </style>