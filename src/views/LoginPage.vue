<template>
  <div class="login-screen min-h-screen flex flex-col justify-between bg-white px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
    <!-- Header -->
    <div class="max-w-md mx-auto w-full">
      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-center text-violet-700 mb-2 sm:mb-3 md:mb-4">Welcome Back</h1>
      <p class="text-xs sm:text-sm md:text-base text-center text-gray-500 mb-6 sm:mb-8 md:mb-10">Please login to your account</p>

      <!-- Email Input -->
      <form @submit.prevent="handleLogin" >
        <div class="inputs mb-3 sm:mb-4 md:mb-6">
          <label class="block text-xs sm:text-sm md:text-base font-medium text-gray-600 mb-1 sm:mb-2" for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="text-black w-full px-3 sm:px-4 py-2 sm:py-3 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password Input -->
        <div class="mb-3 sm:mb-4 md:mb-6">
          <label class="block text-xs sm:text-sm md:text-base font-medium text-gray-600 mb-1 sm:mb-2" for="password">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="text-black w-full px-3 sm:px-4 py-2 sm:py-3 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              <svg v-if="showPassword" class="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              <svg v-else class="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Links -->
        <div class="flex flex-col sm:flex-row justify-between text-xs sm:text-sm md:text-base mt-2 sm:mt-3 md:mt-4 mb-4 sm:mb-6">
          <router-link to="/signup" class="text-violet-600 font-medium mb-2 sm:mb-0">Register</router-link>
          <a href="#" class="text-gray-500 hover:text-violet-600">Forgot Password?</a>
        </div>

        <!-- Login Button -->
            <button
              type="submit"
              class="login-button w-full bg-violet-600 text-white font-bold py-2 sm:py-3 md:py-3 rounded-xl text-sm sm:text-base md:text-lg hover:bg-violet-700 transition duration-200 mb-3 sm:mb-4"
            >
              Login
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
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

// Form state
const email = ref('');
const password = ref('');
const showPassword = ref(false);

// Handle login
const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      router.push('/home');
    } else {
      alert('Invalid email or password, try again.');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('An error occurred during login. Please try again.');
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
      alert('Google login failed. Please try again.');
    }
  } catch (err) {
    console.error('Google login error:', err);
    alert('An error occurred during Google login. Please try again.');
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
        text: 'signin_with',
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

.login-button {
  /* I want to make move down */
  margin-top: 3rem;
}

form input {
  margin-bottom: 1.5rem;
}

form label {
  margin-bottom: 0.5rem;
}


@media (min-width: 1025px) {
  .login-screen {
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
  .login-screen{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}



</style>