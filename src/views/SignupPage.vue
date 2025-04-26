<template>
  <div class="signup-screen min-h-screen flex flex-col justify-between bg-white px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-24 sm:pb-28 md:pb-32">
    <div class="max-w-md mx-auto w-full">
      <h1 class="text-2xl sm:text-3xl font-bold text-center text-violet-700 mb-2">Create Account</h1>
      <p class="text-sm text-center text-gray-500 mb-8 sm:mb-10">Sign up to get started</p>

      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            class="text-black w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl"
            placeholder="Username"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            class="text-black w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl"
            placeholder="Email"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-2">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="text-black w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl"
              placeholder="Password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-1">Re-enter Password</label>
          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="text-black w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl"
              placeholder="Re-enter Password"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <router-link to="/login" class="text-blue-600 text-sm block mb-4">Already have an account? Login</router-link>

        <button
          type="submit"
          class="signup-button w-full bg-violet-600 text-white py-2 sm:py-3 rounded-xl text-base sm:text-lg mb-4"
        >
          Sign Up
        </button>
      </form>

      <!-- Google Sign-In Button -->
      <div id="googleSignInButton" class="w-full google-button"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

// Form state
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Handle signup
const handleSignup = async () => {
  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Please fill all fields');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.');
    return;
  }

  const success = await authStore.signup(username.value, email.value, password.value, confirmPassword.value);

  if (success) {
    alert('Signup successful! Please login.');
    router.push('/login');
  } else {
    alert('Signup failed. Please try again.');
  }
};

// Handle Google Sign-In
const handleGoogleSignIn = async (response) => {
  const idToken = response.credential;
  try {
    const success = await authStore.googleLogin(idToken);
    if (success) {
      router.push('/home');
    } else {
      alert('Google signup/login failed. Please try again.');
    }
  } catch (err) {
    console.error('Google signup/login error:', err);
    alert('An error occurred during Google signup/login. Please try again.');
  }
};

// Load Google Sign-In script and initialize
onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleSignIn,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'signup_with',
      }
    );
  };
  document.head.appendChild(script);
});
</script>



<style scoped>
.google-button {
  /* display: flex; */
  justify-content: center;
  margin-top: 1rem;
}

.login-screen {
  border: 1px solid rgb(238, 130, 238, 0.5);
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  /* Style it at the center of the screen, horizontally */


  
}

.signup-button {
  /* I want to make move down */
  margin-top: 1rem;
}

form input {
  margin-bottom: 1rem;
}

form label {
  margin-bottom: 0.5rem;
}


@media (min-width: 1025px) {
  .signup-screen {
    width: 50%;
    height: 80vh;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    /* Center the login screen */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}



</style>