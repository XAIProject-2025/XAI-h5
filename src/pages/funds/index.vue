<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import { useCommonStore } from '@/store/common'
import { formatAmount, handleToUrl } from '@/utils/util'
import Record from './components/record.vue'

const commonStore = useCommonStore()

const userStore = useUserStore()
// 使用storeToRefs解构userInfo
const { userInfo } = storeToRefs(userStore)
const { tokenPrice } = storeToRefs(commonStore)
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const tabData = reactive({
  tabs: [
    {
      title: '全部',
      index: -1,
    },
    {
      title: '算力币',
      index: 0,
    },
    {
      title: 'USDT',
      index: 1,
    },
  ],
  currentTab: -1,
})
onMounted(() => {

})
onShow(() => {
  commonStore.fetchTokenPrice()
  userStore.fetchUserInfo()
})
const recordRef = ref(null)
function handleTabClick(item) {
  tabData.currentTab = item.index
  recordRef.value.reload()
}
</script>

<template>
  <view class="p-[15px]">
    <div class="px-[15px] text-[15px] font-bold">
      X-AI支付
    </div>
    <div class="mb-[5px] mt-[5px] px-[15px] text-[12px] text-[#94999A]">
      管理你的算力币与稳定币资产
    </div>
    <div class="bg3 mt-[10px] box-border w-full rounded-[4px] p-[15px]">
      <div class="flex items-center">
        <u-image src="/static/images/coin.png" width="40" height="45" />
        <div class="ml-[15px]">
          <div class="text-[14px] text-[#fff] font-bold">
            Xcoin余额
          </div>
        </div>
      </div>
      <div class="my-[15px] text-[22px] text-[#FFEE00] font-600">
        {{ formatAmount(userInfo?.kdkBalance || 0) }}
      </div>
      <div class="flex items-center justify-between">
        <div class="">
          <div class="text-[10px] text-[#94999A]">
            约等于
          </div>
          <div class="mt-[5px] text-[10px] text-[#94999A]">
            {{ formatAmount(userInfo?.kdkBalance * tokenPrice) }} USDT
          </div>
        </div>
        <div
          class="btn-block h-[30px] w-[100px]"
          @click="handleToUrl('/pages/exchange/index')"
        >
          <u-image
            src="/static/invitation/icon_1.png"
            class="mr-[5px]"
            width="16"
            height="16"
            alt=""
          />
          兑换
        </div>
      </div>
    </div>

    <div class="bg2 mt-[10px] box-border w-full rounded-[4px] p-[15px]">
      <div class="flex items-center">
        <u-image src="/static/images/coin.png" width="40" height="45" />
        <div class="ml-[15px]">
          <div class="text-[14px] text-[#fff] font-bold">
            USDT余额
          </div>
          <div class="text-[10px] text-[#94999A]">
            稳定币 (单位：USDT)
          </div>
        </div>
      </div>
      <div class="my-[15px] text-[22px] text-[#FFEE00] font-600">
        {{ formatAmount(userInfo?.usdtBalance || 0) }}
      </div>
      <div class="flex items-center justify-between">
        <div
          class="btn-block h-[30px] w-[40%]"
          @click="handleToUrl('/pages/withdraw/index')"
        >
          <u-image
            src="/static/invitation/icon_3.png"
            class="mr-[5px]"
            width="16"
            height="16"
            alt=""
          />
          提现
        </div>
        <div
          class="btn-block--white h-[30px] w-[40%]"
          @click="handleToUrl('/pages/topUp/index')"
        >
          <u-image
            src="/static/invitation/icon_2.png"
            class="mr-[5px]"
            width="16"
            height="16"
            alt=""
          />
          充值
        </div>
      </div>
    </div>
    <!-- 详细规则 -->
    <view class="mt-[20px] rounded-[10px] bg-[#f5f5f5] px-[20px] py-[20px]">
      <div class="text-[14px] font-bold">
        余额变动记录
      </div>
      <div class="m-[10px] flex items-center">
        <div
          v-for="item in tabData.tabs"
          :key="item.index"
          class="mr-[15px] border border-[#000] rounded-[10px] border-solid bg-[#fff] px-[10px] py-[5px] text-[12px] text-[#000]"
          :class="{
            '!bg-[#000] !text-[#fff]': item.index === tabData.currentTab,
          }"
          @click="handleTabClick(item)"
        >
          {{ item.title }}
          <!-- reload -->
        </div>
      </div>
      <record
        ref="recordRef"
        :tab="tabData.currentTab"
        :token-price="tokenPrice"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
.bg2 {
  background: url('/static/invitation/card_bg.png');
  background-size: 100% 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
}

.bg3 {
  background: url('/static/training/bg1.png');
  background-size: 100% 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
}
</style>
