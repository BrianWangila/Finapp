<template>
    <div class="min-h-screen bg-gray-100 font-sans">
        <!-- Top Bar -->
        <header class="bg-violet-600 text-white p-4 flex items-center justify-between">
            <button @click="openDrawer" class="text-2xl">&#9776;</button>
            <h1 class="font-bold text-xl">Capital Land</h1>
            <div class="flex items-center gap-4">
                <div class="relative">
                  <router-link to="/notifications">
                    <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {{ notificationCount }}
                    </span>
                    <button>🔔</button>
                  </router-link>
                </div>
              <router-link to="/settings"><img src="https://i.pravatar.cc/32" class="rounded-full w-8 h-8" alt="User" /></router-link>
            </div>
        </header>


      <!-- Main Content -->
      <main class="p-4 space-y-6">
        <BalanceCard 
            @withdraw="showWithdrawModal = true"
            @send="showSendModal = true"
            @cards="goToCards"
            @deposit="showDepositModal = true"
            @exchange="showExchangeModal = true"
        />
        <SummaryCards class="py-5"/>
        <TransactionList />

        <SidebarDrawer 
          :is-open="isDrawerOpen" 
          @close="isDrawerOpen = false"
          @open-deposit="showDepositModal = true"
          @open-send="showSendModal = true"
          @open-withdraw="showWithdrawModal = true"
          @open-cards="goToCards"
        />


        <div class="cards-section">
            <div class="flex items-center justify-between mt-6 py-3">
                <h2 class="text-lg font-semibold text-black">Your Cards</h2>
                <router-link to="/my-cards" class="text-blue-600 text-sm">View all</router-link>
            </div>
            <div class="overflow-x-auto py-2">
              <div v-if="cardStore.loading" class="text-center p-4">
                <p>Loading cards...</p>
              </div>

              <div v-else-if="cardStore.error" class="text-center p-4 text-red-500">
                <p>{{ cardStore.error }}</p>
              </div>

              <div v-else-if="cardStore.cards && cardStore.cards.length" class="flex space-x-4">
                <div 
                  v-for="(card, index) in cardStore.cards" 
                  :key="index" 
                  class="card bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 min-w-[250px]"
                >
                  <div class="text-sm">Balance</div>
                  <div class="text-xl font-bold mb-4 py-2">
                    {{ formatNumberWithCommas(card.balance) }}
                  </div>
                  <div class="text-sm tracking-widest">**** **** **** {{ card.number.slice(-4) }}</div>
                  <div class="flex justify-between text-xs mt-2 py-2">
                    <span>EXP: {{ card.expiry }}</span>
                    <span>CVV: {{ card.cvv }}</span>
                  </div>
                </div>
              </div>

              <div v-else class="text-center text-black p-4">
                <p>No cards available. Add a card in My Cards!</p>
              </div>
            </div>
        </div>

        <!-- Withdraw Modal -->
        <transition name="slide-up">
          <div v-if="showWithdrawModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg text-gray-500">
            <h2 class="text-xl font-bold">Withdraw to MPESA</h2>
            <hr />
            <button @click="showWithdrawModal = false" class="x-button text-sm text-gray-500">x</button>
            <select v-model="withdrawForm.card_id" class="w-full p-2 mb-2 border-b rounded">
              <option class="text-gray-700" value="" disabled>Select Card</option>
              <option v-for="card in cardStore.cards" :key="card.id" :value="card.id">
                {{ card.number }} (Balance: ${{ card.balance }})
              </option>
            </select>
            <input v-model="withdrawForm.phone_number" placeholder="Phone Number (+254...)" class="w-full p-2 mb-2 border-b rounded" />
            <input v-model="withdrawForm.amount" placeholder="Amount" type="number" step="0.01" class="w-full p-2 mb-4 border-b rounded" />
            <div class="flex justify-center py-2">
              <button @click="handleWithdraw" class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Withdraw</button>
            </div>
          </div>
        </transition>

        <!-- Send Modal -->
        <transition name="slide-up">
          <div v-if="showSendModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg text-gray-500">
            <h2 class="text-xl font-bold">Send Money</h2>
            <hr/>
            <button @click="showSendModal = false" class="x-button text-sm text-gray-500">x</button>
            
            <select v-model="sendForm.card_id" class="w-full p-2 mb-2 border-b rounded">
              <option class="text-gray-700" value="" disabled>Select Card</option>
              <option v-for="card in cardStore.cards" :key="card.id" :value="card.id">
                {{ card.number }} (Balance: ${{ card.balance }})
              </option>
            </select>
            <input v-model="sendForm.to_account" placeholder="Recipient Account" class="w-full p-2 mb-2 border-b rounded" />
            <input v-model="sendForm.amount" placeholder="Amount" type="number" step="0.01" class="w-full p-2 mb-4 border-b rounded" />
            <div class="flex justify-center py-2">
              <button @click="handleSend" class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Send</button>
            </div>
          </div>
        </transition>

        <!-- Exchange Modal -->
        <transition name="slide-up">
          <div v-if="showExchangeModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg text-gray-500">
            <h2 class="text-xl font-bold">Exchange Currency</h2>
            <hr/>
            <button @click="showExchangeModal = false" class="x-button text-sm text-gray-500">x</button>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="text-sm text-gray-600 block mb-1">From</label>
                <select v-model="exchangeFrom" class="w-full p-2 border-b text-gray-500 rounded">
                  <option class="text-gray-700" disabled value="">Select Currency</option>
                  <option>USD</option>
                  <option>CAD</option>
                  <option>EURO</option>
                  <option>AUD</option>
                </select>
              </div>
              
              <div>
                <label class="text-sm text-gray-600 block mb-1">To</label>
                <select v-model="exchangeTo" class="w-full p-2 border-b text-gray-500 rounded">
                  <option class="text-gray-700"  disabled value="">Select Currency</option>
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


        <!-- Deposit Modal -->
        <transition name="slide-up">
          <div v-if="showDepositModal" class="popups-modal fixed bottom-2 h-1/3 z-50 bg-white rounded-t-3xl shadow-lg text-gray-500">
            <h2 class="text-xl font-bold">Deposit Money</h2>
            <hr />
            <button @click="showDepositModal = false" class="x-button text-sm text-gray-500">x</button>
            <select v-model="depositForm.card_id" class="w-full p-2 mb-2 border-b rounded">
              <option class="text-gray-700" value="" disabled>Select Card to Deposit To</option>
              <option v-for="card in cardStore.cards" :key="card.id" :value="card.id">
                {{ card.number }} (Balance: ${{ card.balance }})
              </option>
            </select>
            <select v-model="depositForm.source_type" class="w-full p-2 mb-2 border-b rounded">
              <option value="" disabled>Select Source</option>
              <option value="mpesa">MPESA</option>
              <option value="card">Another Card</option>
            </select>
            <input v-model="depositForm.from_account" :placeholder="depositForm.source_type === 'mpesa' ? 'Phone Number (+254...)' : 'Card Number'" class="w-full p-2 mb-2 border-b rounded" />
            <input v-model="depositForm.amount" placeholder="Amount" type="number" step="0.01" class="w-full p-2 mb-4 border-b rounded" />
            <div class="flex justify-center py-2">
              <button @click="handleDeposit" class="text-sm bg-violet-600 text-white px-4 py-1 rounded">Deposit</button>
            </div>
          </div>
        </transition>


      </main>


        <footer class="text-center text-xs text-gray-500 p-4 bg-white">
          ©Capital Land Investments 2025. All Rights Reserved.
        </footer>
    </div>
  </template>
  
  
  
<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router';
  import { useCardStore } from '@/stores/cardStore';
  import { useTransactionStore } from '@/stores/transactionStore';
  import { useNotificationStore } from '@/stores/notificationStore';
  import BalanceCard from './BalanceCard.vue'
  import SummaryCards from './SummaryCards.vue'
  import TransactionList from './TransactionList.vue'
  import SidebarDrawer from './SidebarDrawer.vue'
  import { formatNumberWithCommas } from '@/formatNumbers';


  const router = useRouter();
  const cardStore = useCardStore();
  const transactionStore = useTransactionStore();
  const notificationStore = useNotificationStore();

  const isDrawerOpen = ref(false)
  const showWithdrawModal = ref(false)
  const showSendModal = ref(false)
  const showExchangeModal = ref(false)
  const showDepositModal = ref(false)

  const sendForm = ref({
    card_id: '',
    to_account: '',
    amount: '',
  });

  const withdrawForm = ref({
    card_id: '',
    phone_number: '',
    amount: '',
  });

  const depositForm = ref({
    card_id: '',
    source_type: '',
    from_account: '',
    amount: '',
  });

  const exchange = ref({
    exchangeFrom: ref(''),
    exchangeTo: ref(''),
    exchangeAmount: ref('')
  });

  const notificationCount = computed(() => notificationStore.notificationCount);

  const openDrawer = () => {
    isDrawerOpen.value = true;
  };

  const goToCards = () => {
    router.push('/my-cards');
  };

  const handleSend = async () => {
    try {
      await transactionStore.sendTransaction(sendForm.value);
      showSendModal.value = false;
      sendForm.value = { card_id: '', to_account: '', amount: '' };
      cardStore.fetchCards(); // Refresh card balances
      alert('Money sent successfully');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleWithdraw = async () => {
    try {
      await transactionStore.withdrawToMpesa(withdrawForm.value);
      showWithdrawModal.value = false;
      withdrawForm.value = { card_id: '', phone_number: '', amount: '' };
      cardStore.fetchCards(); // Refresh card balances
      alert('Withdrawal to MPESA successful');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeposit = async () => {
    try {
      await transactionStore.deposit(depositForm.value);
      showDepositModal.value = false;
      depositForm.value = { card_id: '', source_type: '', from_account: '', amount: '' };
      cardStore.fetchCards(); // Refresh card balances
      alert('Deposit successful');
    } catch (err) {
      alert(err.message);
    }
  };

  onMounted(() => {
    cardStore.fetchCards()
    transactionStore.fetchTransactions();
    notificationStore.fetchNotifications().then(() => {
      console.log('Notifications on HomePage:', notificationStore.notifications);
    });
  })

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

    .popups-modal input 
    .popups-modal select{
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