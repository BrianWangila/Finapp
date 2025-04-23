<template>
    <div class="min-h-screen bg-gray-100 font-sans">
        <!-- Top Bar -->
        <header class="bg-violet-600 text-white p-4 flex items-center justify-between">
            <button @click="drawerOpen = true" class="text-2xl">&#9776;</button>
            <SidebarDrawer :isOpen="drawerOpen" @close="drawerOpen = false" />
            <h1 class="font-bold text-xl">Finapp</h1>
            <div class="flex items-center gap-4">
                <div class="relative">
                  <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">4</span>
                  <button>🔔</button>
                </div>
              <img src="https://i.pravatar.cc/32" class="rounded-full w-8 h-8" alt="User" />
            </div>
        </header>


      <!-- Main Content -->
      <main class="p-4 space-y-6">
        <BalanceCard 
            @withdraw="showWithdrawModal = true"
            @send="showSendModal = true"
            @cards="$router.push('/my-cards')"
            @exchange="showExchangeModal = true"
        />
        <SummaryCards class="py-5"/>
        <TransactionList />

        <div class="cards-section">
            <div class="flex items-center justify-between mt-6 py-3">
                <h2 class="text-lg font-semibold text-black">Your Cards</h2>
                <router-link to="/my-cards" class="text-blue-600 text-sm">View all</router-link>
            </div>
            <div class="overflow-x-auto py-2">
                <div class="flex space-x-4">
                    <div v-for="(card, index) in cards" :key="index" class="card bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 min-w-[250px]">
                        <div class="text-sm">Balance</div>
                        <div class="text-xl font-bold mb-4 py-2">
                        {{ card.balance }}
                        </div>
                        <div class="text-sm tracking-widest">**** **** **** {{ card.number.slice(-4) }}</div>
                        <div class="flex justify-between text-xs mt-2 py-2">
                        <span>EXP: {{ card.expiry }}</span>
                        <span>CVV: {{ card.cvv }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Withdraw Modal -->
        <transition name="slide-up">
          <div v-if="showWithdrawModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg">
            <h2 class="text-xl font-bold">Withdraw Money</h2>
            <hr/>
            <button @click="showWithdrawModal = false" class="x-button text-sm text-gray-500">x</button>
            <input placeholder="From Account" class="w-full p-2 mb-2 border-b rounded" />
            <input placeholder="To (IBAN Number)" class="w-full p-2 mb-2 border-b rounded" />
            <input placeholder="Amount" type="number" class="w-full p-2 mb-4 border-b rounded" />
            <div class="flex justify-center py-2">
              <button class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Withdraw</button>
            </div>
          </div>
        </transition>

        <!-- Send Modal -->
        <transition name="slide-up">
          <div v-if="showSendModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg">
            <h2 class="text-xl font-bold">Send Money</h2>
            <hr/>
            <button @click="showSendModal = false" class="x-button text-sm text-gray-500">x</button>
            <input placeholder="From Account" class="w-full p-2 mb-2 border-b rounded" />
            <input placeholder="To (Enter Bank ID)" class="w-full p-2 mb-2 border-b rounded" />
            <input placeholder="Amount" type="number" class="w-full p-2 mb-4 border-b rounded" />
            <div class="flex justify-center py-2">
              <button class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Send</button>
            </div>
          </div>
        </transition>

        <!-- Exchange Modal -->
        <transition name="slide-up">
          <div v-if="showExchangeModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg">
            <h2 class="text-xl font-bold">Exchange Currency</h2>
            <hr/>
            <button @click="showExchangeModal = false" class="x-button text-sm text-gray-500">x</button>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="text-sm text-gray-600 block mb-1">From</label>
                <select v-model="exchangeFrom" class="w-full p-2 border-b text-gray-500 rounded">
                  <option disabled value="">Select</option>
                  <option>USD</option>
                  <option>CAD</option>
                  <option>EURO</option>
                  <option>AUD</option>
                </select>
              </div>
              
              <div>
                <label class="text-sm text-gray-600 block mb-1">To</label>
                <select v-model="exchangeTo" class="w-full p-2 border-b text-gray-500 rounded">
                  <option disabled value="">Select</option>
                  <option>USD</option>
                  <option>CAD</option>
                  <option>EURO</option>
                  <option>AUD</option>
                </select>
              </div>
            </div>
            <div class="mb-4 py-4">
              <label class="text-sm text-gray-600 block mb-1">Amount</label>
              <input v-model="exchangeAmount" type="number" class="w-full p-2 border-b rounded" placeholder="Enter amount" />
            </div>
            <div class="flex justify-center py-2">
              <button class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Exchange</button>
            </div>
          </div>
        </transition>


      </main>


        <footer class="text-center text-xs text-gray-500 p-4 bg-white">
          ©Finapp 2025. All Rights Reserved.
        </footer>
    </div>
  </template>
  
  
  
  <script>
    import BalanceCard from './BalanceCard.vue'
    import SummaryCards from './SummaryCards.vue'
    import TransactionList from './TransactionList.vue'
    import SidebarDrawer from './SidebarDrawer.vue'
    import MyCards from './MyCards.vue'
  
  export default {
    name: 'App',
  
    components: {
      BalanceCard,
      SummaryCards,
      TransactionList,
      SidebarDrawer,
      MyCards
    },
    
    data() {
      return {
        drawerOpen: false,
        showWithdrawModal: false,
        showSendModal: false,
        showExchangeModal: false,
        
      }
    },

    computed: {
        cards() {
            return this.$options.components.MyCards.data().cards;
        }
    },
  }
  </script>
  

  <style scoped>
    .cards-section h2 {
      margin-top: 1rem;
    }

    .cards-section {
      margin-bottom: 1rem;
    }

    .cards-section .card {
      margin-right: 1rem;
    }

    .slide-up-enter-active, .slide-up-leave-active {
      transition: transform 0.3s ease;
    }
    .slide-up-enter-from, .slide-up-leave-to {
      transform: translateY(100%);
    }

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

</style>