<template>
    <div class="cards bg-white min-h-screen">
      
      <header class="transactions-head bg-violet-100 text-center py-4 px-4 relative">
        <button @click="$router.go(-1)" class="text-gray-600 text-3xl">←</button>
        <h2 class="font-semibold text-lg text-gray-700">My Cards</h2>
        <div class="add-card-1 absolute right-4 top-4 relative">
          <button @click="showForm = !showForm" class="add-card cursor-pointer"><i class="fa-solid fa-plus"></i></button>
        </div>
      </header>


      <!-- Add new card form -->
       <transition slide-up>
          <div v-if="showForm" class="popups-modal fixed inset-x-0 z-50 bottom-2 w-full md:w-2/3 lg:w-1/3 h-[35%] bg-white rounded-t-3xl shadow-lg p-4 text-gray-500">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-700">Add New Card</h3>
              <button @click="showForm = false" class="x-button text-sm text-gray-500">x</button>
            </div>
            <form @submit.prevent="handleAddCard">
              <div class="grid grid-cols-2 gap-4 mt-4">
                <input 
                  type="text" 
                  v-model="newCard.number" 
                  placeholder="Card Number" 
                  class="text-black border-b rounded p-2" 
                  required 
                />
                <input 
                  type="text" 
                  v-model="newCard.expiry" 
                  placeholder="Expiry Date (MM/YY)" 
                  pattern="\d{2}/\d{2}" 
                  class="text-black border-b rounded p-2" 
                  required 
                />
                <input 
                  type="text" 
                  v-model="newCard.cvv" 
                  placeholder="CVV (3 digits)" 
                  class="text-black border-b rounded p-2" 
                  required
                />
              </div>
              <div class="py-4">
                <button type="submit" class="bg-blue-500 text-white rounded px-4 py-2 mt-4">Add Card</button>
              </div>
            </form>
          </div>
        </transition>

      <div>
        <!-- Loading state -->
        <div v-if="cardStore.loading" class="text-center p-4">
          <p>Loading your cards...</p>
        </div>

        <!-- Error State -->
        <div v-if="cardStore.error" class="text-center p-4 text-red-500">
          <p>{{ cardStore.error }}</p>
        </div>


        <div v-else-if="cardStore.cards.length" class="cards-list ">
          <div 
            v-for="(card, index) in cardStore.cards" 
            :key="index" 
            class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 min-w-[300px]"
          >
            <div class="py-2">
              <div class="text-sm">Balance</div>
              <div class="text-xl font-bold mb-4">
                {{ formatNumberWithCommas(card.balance) }}
              </div>
            </div>

            <div class="py-2">
              <div class="text-sm">Card Number</div>
              <div class="text-sm tracking-widest">{{ formatCardNumber(card.number) }}</div>
            </div>
              <div class="flex justify-between text-xs mt-2">
              <span>EXP: {{ card.expiry }}</span>
              <span>CVV: {{ card.cvv }}</span>
            </div>
          </div>
        </div>

        <!-- No Cards State -->
        <div v-else class="text-center text-black p-4">
          <p>No cards available. Add a new card to get started!</p>
        </div>
      </div>

    </div>
</template>



<script setup>
  import { useCardStore } from '@/stores/cardStore';
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { formatNumberWithCommas } from '@/formatNumbers';

  const router = useRouter();
  const cardStore = useCardStore();

  const showForm = ref(false);
  const newCard = ref({
    number: '',
    expiry: '',
    cvv: '',
  });

  let isMounted = true

  onMounted(() => {    
    cardStore.fetchCards();
  });

  onUnmounted(() => {
    isMounted = false
  })

  const formatCardNumber = (number) => {
    // Format the card number to be more readable
    return number.replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
  };
  // const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');


  const handleAddCard = async () => {
    try {
      const success = await cardStore.addCard(newCard.value);
      if(isMounted){
      if(success){
          newCard.value = { 
            number: '', 
            expiry: '', 
            cvv: '',
          };
          showForm.value = false;
        } else {
          alert(`Failed to add card: ${cardStore.error}`) // Show specific error
        }
      }

    } catch (err) {
      if(isMounted){
        console.error('Error in handleAddCard:', err)
        alert(`Error adding card: ${err.message}`)
        alert('Failed to add card. Please try again.');
      }
    }
  };
</script>



<style scoped>
    .transactions-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: purple;
    }

    .add-card {
        color: purple;
        font-size: 20px;
        margin-bottom: 10px;

    }

    .cards .bg-gradient-to-r {
        margin-bottom: 20px;
        
    }

    .cards .space-y-4 {
        margin-top: 10px;
        padding: 20px;
    }

    .input {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }

    .popups-modal {
      background-color: white;
      border-radius: 1.5rem;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      width: 75%;
      margin: auto;
    }

  /* Add this to your main CSS */
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.3s ease;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
  .slide-up-enter-to,
  .slide-up-leave-from {
    transform: translateY(0);
    opacity: 1;
  }


  @media (min-width: 1025px) {  
  
    .cards {
      width: 80rem;
      margin: auto;
    }

    .cards-list {
      padding-top: 2rem;
      width: 70rem;
      margin: auto;

    }
  }

</style>