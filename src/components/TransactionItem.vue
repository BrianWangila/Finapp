<template>
  <!-- <router-link :to="{ name: 'TransactionDetail', params: { id: transaction.id } }" class="block"> -->
    <div @click="goToDetail" class="cursor-pointer flex items-center bg-white p-3 rounded-xl shadow gap-4">
      <img :src="logo" class="w-12 h-12 rounded-xl" />
      <div class="flex-1">
        <p class="font-bold text-black">{{ name }}</p>
        <p class="text-sm text-gray-500">{{ type }}</p>
      </div>
      <div :class="negative ? 'text-red-500' : 'text-green-500'" class="font-semibold">
        {{ amount }}
      </div>
    </div>
  <!-- </router-link> -->
</template>



<script>
  import { useRouter } from 'vue-router'
  import { useTransactionStore } from '../stores/transactionStore'

  export default {
    name: 'TransactionItem',

    props: {
      logo: String,
      name: String,
      type: String,
      amount: String,
      negative: Boolean,
      transactionData: Object,
    },

    setup(props){
      const router = useRouter()
      const transactionStore = useTransactionStore()

      const goToDetail = () => {
        transactionStore.setTransaction(props.transactionData)
        router.push( '/transaction-detail' )
      }

      return {
        goToDetail
      }
    }
  }
</script>
  