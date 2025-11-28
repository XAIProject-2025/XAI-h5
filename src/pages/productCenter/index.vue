<script lang="ts" setup>
import { formatAmount, handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
  },
})
const serverList = ref([
  {
    name: 'Free',
    price: 0,
    rentedDate: '2015-02-01',
    isExpired: false,
  },
  {
    name: 'Free',
    price: 0,
    rentedDate: '2015-02-01',
    isExpired: false,
  },
])
</script>

<template>
  <view class="p-[15px]">
    <view
      class="flex items-center justify-between border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb] p-[15px]"
    >
      <view class="text-[15px]">
        <view class="mb-[5px] font-bold">
          算力服务器
        </view>
        <view class="text-[12px] text-[#999]">
          管理你的算力服务器，查看状态与收益
        </view>
      </view>
      <view class="btn-block h-[30px] min-h-[30px] w-[100px]" @click="handleToUrl('/pages/server/index')">
        产品中心
      </view>
    </view>
    <view
      v-for="(item, index) in serverList" :key="index"
      class="mt-[15px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb] p-[15px]"
    >
      <view class="relative flex">
        <view class="bg absolute right-[0px] top-[0px] z-[100] w-[30%] py-[4px] text-center text-[12px] text-[#fff]">
          到期
        </view>
        <view class="h-[40px] min-h-[40px] w-[40px] flex items-center justify-center rounded bg-[#000]">
          <u-image src="/static/productCenter/server.png" width="20" height="20" />
        </view>
        <view class="ml-[20px] w-full">
          <view class="font-bold">
            Free
          </view>
          <view class="mt-[5px] flex items-center text-[12px] text-[#94999A]">
            <view class="mr-[5px]">
              租用日期
            </view>
            <view>2015-02-01</view>
          </view>
          <view class="mt-[5px] flex items-center text-[12px] text-[#94999A]">
            <view class="mr-[5px]">
              算力值
            </view>
            <view>10/50</view>
          </view>
          <view class="w-full flex items-center justify-end text-[12px] text-[#94999A]">
            展开
            <u-icon name="arrow-down" color="#94999A" size="12" />
          </view>
        </view>
      </view>
      <view>
        <view class="flex items-end gap-[10px]">
          <view class="bg1 box-border h-[100px] w-[48%]">
            <view class="text-[24px] font-700">
              30
            </view>
            <view class="mt-[10px] text-[#94999A]">
              总算力值
            </view>
          </view>
          <view class="bg1 h-[80px] w-[48%]">
            <view class="text-[24px] font-700">
              30
            </view>
            <view class="mt-[10px] text-[12px] text-[#94999A]">
              剩余算力值
            </view>
          </view>
        </view>
        <view class="flex items-end gap-[10px]">
          <view class="bg1 mt-[15px] box-border h-[100px] w-[48%]">
            <view class="text-[24px] font-700">
              1
            </view>
            <view class="mt-[10px] text-[12px] text-[#94999A]">
              每任务消耗
            </view>
          </view>
          <view class="bg1 mt-[15px] h-[80px] w-[48%]">
            <view class="text-[24px] font-700">
              3.1%
            </view>
            <view class="mt-[10px] text-[12px] text-[#94999A]">
              每日返还率
            </view>
          </view>
        </view>
        <view class="flex items-center gap-[10px]">
          <view class="bg1 mt-[15px] box-border h-[100px] w-[48%]">
            <view class="text-[24px] font-700">
              {{ formatAmount(100) }}
            </view>
            <view class="mt-[10px] text-[12px] text-[#94999A]">
              过期后返还
            </view>
          </view>
          <view class="w-[48%]">
            <view class="btn-block h-[35px] min-h-[35px] w-[100%]">
              提前赎回
            </view>
            <!-- <view></view> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.bg {
  background: url('/static/server/card_top_bg.png');
  background-size: 100% 100%;
}

.bg1 {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  /* 渐变背景 */
  background: linear-gradient(
    135deg,
    /* 渐变方向 */ #ffffff 0%,
    /* 左下白色 */ #e8efff 40%,
    /* 中间淡淡紫蓝 */ #b9daff 100% /* 右上亮蓝 */
  );

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
