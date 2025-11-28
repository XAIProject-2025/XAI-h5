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
      <view class="bg absolute right-[0px] top-[0px] z-[100] w-[70%] py-[4px] text-center text-[12px] text-[#fff]">
        算力服务器
      </view>
      <u-image src="/static/server/server.png" width="100%" height="173" radius="8px" alt="" />
      <view class="px-[15px] py-[10px] text-[14px]">
        <view class="font-bold">
          01.算力服务器
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          每日 3.2 (KDK)
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          每月 3.2 (KDK)
        </view>
        <view class="mt-[10px] flex items-center justify-center">
          <view class="mr-[8px] text-[18px] text-[#D73A3C] font-bold">
            {{ formatAmount(60) }}
          </view>
          <view class="text-[12px] text-[#94999A]">
            库存 :9999
          </view>
        </view>
      </view>
      <view class="btn-block mx-auto mb-[5px] h-[30px] min-h-[30px] w-[70%]">
        立即购买
      </view>
      <view
        class="flex items-center justify-center rounded-b-[8px] px-[4px] py-[6px] text-center text-[10px] text-[#000]"
      >
        <up-icon name="info-circle" size="12px" color="#000" />
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
.bg {
  background: url('/static/server/card_top_bg.png');
  background-size: 100% 100%;
}
</style>
