<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getBalanceRate } from '@/api/funds'
import { useUserStore } from '@/store'
import { formatAmount } from '@/utils/util'
import transaction from './components/transaction.vue'
import transactionRecord from './components/transactionRecord.vue'

const userStore = useUserStore()

const { userInfo } = storeToRefs(userStore)
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const tabCurrent = ref(0)
const tokenPrice = ref(0)
onMounted(async () => {
  uni.showLoading({
    title: '加载中...',
  })
  const getBalanceRateRes = await getBalanceRate({
    currencyName: '1',
  })
  tokenPrice.value = getBalanceRateRes?.toUsdt || 0
  uni.hideLoading()
})
</script>

<template>
  <view class="p-[15px]">
    <view class="text-[16px] font-bold">
      闪电兑换中心
    </view>
    <view class="mb-[10px] mt-[5px] text-[14px] text-[#94999A]">
      实时计算能力币市场 & 闪电兑换中心
    </view>
    <view class="bg-default my-[20px] flex items-center justify-between py-[20px]">
      <view class="w-1/2 flex flex-col items-center justify-center">
        <view class="text-[18px] font-bold">
          {{ formatAmount(userInfo.kdkBalance) }}
        </view>
        <view class="mt-[5px] text-[14px] text-[#999]">
          Xcoin
        </view>
      </view>
      <view class="w-1/2 flex flex-col items-center justify-center">
        <view class="text-[18px] font-bold">
          {{ formatAmount(userInfo.usdtBalance) }}
        </view>
        <view class="mt-[5px] text-[14px] text-[#999]">
          USDT
        </view>
      </view>
    </view>
    <view class="clear-both mb-[20px] flex items-center text-[14px] text-[#94999A]">
      <div class="text-[16px] font-bold" :class="{ 'text-[#000]': tabCurrent === 0 }" @click="tabCurrent = 0">
        交易
      </div>
      <div class="ml-[15px] text-[16px] font-bold" :class="{ 'text-[#000]': tabCurrent === 1 }" @click="tabCurrent = 1">
        交易记录
      </div>
    </view>
    <view v-if="tabCurrent === 0" class="mt-[20px]">
      <transaction :token-price="tokenPrice" />
    </view>
    <view v-else class="mt-[20px]">
      <transactionRecord />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
