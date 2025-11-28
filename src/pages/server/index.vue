<script lang="ts" setup>
import { formatAmount } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const showDetail = ref(false)
</script>

<template>
  <view class="flex flex-wrap justify-between p-[15px]">
    <view
      v-for="(item, index) in 3" :key="index"
      class="relative mb-[20px] w-[48%] border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb]"
    >
      <view
        class="absolute right-[0px] top-[0px] rounded-bl-[8px] rounded-tr-[8px] bg-[#407f89] px-[10px] py-[2px] text-[12px] text-[#fff]"
      >
        算力服务器
      </view>
      <image src="/static/server/server.png" class="h-auto w-full rounded-[8px]" alt="" />
      <view class="px-[15px] py-[10px] text-[14px]">
        <view class="font-bold">
          01.算力服务器
        </view>
        <view class="mt-[5px] text-[12px] text-[#999]">
          每日 3.2 (KDK)
        </view>
        <view class="mt-[5px] text-[12px] text-[#999]">
          每月 3.2 (KDK)
        </view>
        <view class="mt-[10px] flex items-center justify-between">
          <view class="text-[15px] text-[#ea933e] font-bold">
            {{ formatAmount(60) }}
          </view>
          <view class="text-[12px] text-[#999]">
            库存 :9999
          </view>
        </view>
      </view>
      <view
        class="flex items-center justify-center rounded-b-[8px] bg-[#407f89] px-[4px] py-[6px] text-center text-[10px] text-[#fff]"
      >
        <up-icon name="info-circle" size="12px" color="#fff" />
        <view class="ml-[4px]">
          说明:所有服务器可以提前赎回
        </view>
      </view>
    </view>
  </view>
  <up-popup :show="showDetail">
    <view>
      <text>出淤泥而不染，濯清涟而不妖</text>
    </view>
  </up-popup>
</template>

<style lang="scss" scoped>
//
</style>
