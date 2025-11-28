<script lang="ts" setup>
import { formatAmount } from '@/utils/util'
import circleProgress from './components/circleProgress.vue'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
</script>

<template>
  <view class="p-[15px]">
    <!-- 顶部区域个人信息 -->
    <view class="border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb] py-[20px]">
      <view class="flex items-center justify-center">
        <u-image src="/static/images/avatar.png" width="50" height="50" alt="" />
      </view>
      <view class="mt-[10px] text-center text-[16px] font-bold">
        用户名
      </view>
      <view class="mt-[10px] flex items-center justify-center">
        <level />
        <view class="btn-block--white ml-[10px] h-[20px] min-h-[20px] rounded-[12px] px-[15px] py-[4px]">
          无限代理
        </view>
      </view>
      <view class="mt-[15px] flex items-center justify-center text-[12px] text-[#666]">
        <view><span class="mr-[4px]">算力服务器</span>2</view>
        <view class="mx-[10px]">
          |
        </view>
        <view><span class="mr-[4px]">算力币余额</span>2KDK</view>
      </view>
      <view class="mt-[5px] flex items-center justify-center text-[12px] text-[#666]">
        <view><span class="mr-[4px]">稳定币余额</span>2</view>
        <view class="mx-[10px]">
          |
        </view>
        <view><span class="mr-[4px]">活跃度</span>2</view>
      </view>
      <view class="mt-[15px] flex items-center justify-between gap-[20px] px-[20px]">
        <view class="btn-block w-1/2">
          <image src="/static/training/qr_code.png" class="mr-[5px] h-[20px] w-[20px]" mode="scaleToFill" alt="" />
          邀请
        </view>
        <view class="btn-block--white w-1/2">
          <image src="/static/training/withdraw.png" class="mr-[5px] h-[20px] w-[20px]" mode="scaleToFill" alt="" />
          提现
        </view>
      </view>
    </view>
    <!-- 升级信息 -->
    <view class="mt-[20px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb] px-[20px] py-[20px]">
      <view class="text-[16px] font-bold">
        升级进度
      </view>
      <view class="mt-[10px] flex items-center justify-between">
        <view class="flex flex-col items-center justify-center">
          <image src="" alt="">
            <view class="text-[14px] text-[#666]">
              当前等级
            </view>
            <view class="mt-[5px] text-[#407e8c] font-bold">
              P2
            </view>
          </image>
        </view>
        <image src="" alt="">
          <view class="flex flex-col items-center justify-center">
            <image src="" alt="">
              <view class="text-[14px] text-[#666]">
                下一等级
              </view>
              <view class="mt-[5px] text-[#407e8c] font-bold">
                P2
              </view>
            </image>
          </view>
        </image>
      </view>
      <view class="mt-[20px] text-[16px] font-bold">
        升级条件
      </view>
      <view class="mt-[10px]">
        <view class="mb-[5px] flex items-center justify-between text-[14px] text-[#666]">
          <view>A邀请好友</view>
          <view>176/999999</view>
        </view>
        <up-line-progress height="12px" :percentage="30" active-color="#000" />
      </view>
      <view class="mt-[10px]">
        <view class="mb-[5px] flex items-center justify-between text-[14px] text-[#666]">
          <view>直接推荐充值</view>
          <view>176/999999</view>
        </view>
        <up-line-progress height="12px" :percentage="30" active-color="#000" />
      </view>
      <view class="mt-[10px]">
        <view class="mb-[5px] flex items-center justify-between text-[14px] text-[#666]">
          <view>活动等级</view>
          <view>176/999999</view>
        </view>
        <up-line-progress height="12px" :percentage="30" active-color="#000" />
      </view>
    </view>
    <!-- 手续费信息 -->
    <view class="mt-[20px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#e7f0ee] px-[20px] py-[20px]">
      <view class="text-[16px] font-bold">
        费用信息
      </view>
      <view class="mt-[20px] text-[16px] font-bold">
        当前费率 <span class="text-[20px]">60</span>%
      </view>
      <view class="bg my-[20px] flex items-center gap-[5px] rounded-[6px] p-[10px]">
        <up-icon name="info-circle" color="#3f808a" />
        <view class="text-[14px] text-[#3f808a]">
          VIP 等级越高，初始费率越低
        </view>
      </view>
    </view>
    <!-- 手续费减免 -->
    <view class="mt-[20px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#e7f0ee] px-[20px] py-[20px]">
      <view class="mb-[20px] text-[16px] font-bold">
        下次减免
      </view>
      <view class="flex items-center justify-center">
        <circle-progress :value="50" :max="100" color="#3f808a" />
      </view>
      <view class="mt-[20px] text-center text-[16px] text-[#000] font-bold">
        剩余天数
      </view>
      <view class="mt-[10px] text-center text-[12px] text-[#666]">
        下次的费用减免，还剩 1 天
      </view>
    </view>

    <!-- 详细规则 -->
    <view class="mt-[20px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#e7f0ee] px-[20px] py-[20px]">
      <view class="mb-[20px] text-[16px] font-bold">
        费用规则
      </view>
      <view class="flex items-center text-[14px]">
        <up-icon name="checkmark-circle" size="18px" color="#3f808a" />
        <view class="ml-[10px]">
          未提取的资金：费用费率每天自动降低 30%
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle" size="18px" color="#3f808a" />
        <view class="ml-[10px]">
          费用费率最低可降至 5%
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle" size="18px" color="#3f808a" />
        <view class="ml-[10px]">
          提取后，费用计算将从初始费率重新开始
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle" size="18px" color="#3f808a" />
        <view class="ml-[10px]">
          VIP 等级越高，初始费率越低
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle" size="18px" color="#3f808a" />
        <view class="ml-[10px]">
          当前获得的费用折扣：0%
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
.bg {
  background: rgba(63, 128, 138, 0.1);
}
</style>
