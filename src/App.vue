<template>
  <router-view />

  <!-- Main Content -->
  <main class="p-4 space-y-6">
    <HomePage />
  </main>



    
</template>



<script>
  import HomePage from './components/HomePage.vue'

export default {
  name: 'App',

  components: {
    HomePage
  },
}
</script>
