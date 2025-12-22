<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getStatistics, getSubordinateList } from '@/api/funds'
import { useUserStore } from '@/store'
import { formatAmount, handleCopy } from '@/utils/util'

import record from './components/record.vue'

const { UNI_PLATFORM } = process.env

const userStore = useUserStore()
// 使用storeToRefs解构userInfo
const { userInfo } = storeToRefs(userStore)
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const recordList = ref([])
const statistics = ref({})
const inviteCodeLink = ref('')
onMounted(async () => {
  uni.showLoading({
    title: '加载中...',
  })
  const getSubordinateListRes = await getSubordinateList()
  const getStatisticsRes = await getStatistics()
  recordList.value = getSubordinateListRes || []
  statistics.value = getStatisticsRes || {}
  uni.hideLoading()
  console.log('UNI_PLATFORM :>> ', UNI_PLATFORM)
  // #ifdef H5
  inviteCodeLink.value = `${window.location.origin}/#/pages-fg/login/login?inviteCode=${userInfo.value.inviteCode}`
  // #endif
  // #ifdef APP-PLUS
  inviteCodeLink.value = userInfo.value.inviteCode
  // #endif
})
</script>

<template>
  <view class="">
    <div class="bg1 box-border h-[170px] w-[100vw] px-[30px] py-[15px]">
      <div class="text-[#fff]">
        邀请好友
      </div>
      <div class="mt-[10px] text-[12px] text-[#94999A]">
        邀请好友加入成为 AI 训练者，双方都能获得奖励
      </div>
    </div>
    <div class="bg2 mx-[15px] mt-[-80px] h-[280px] pt-[20px]">
      <div class="text-center text-[15px] font-bold">
        我的邀请码
      </div>
      <div
        class="bg3 mx-auto mt-[20px] w-[200px] flex items-center justify-between rounded-[20px] px-[20px] py-[10px] text-center text-[14px] font-bold"
      >
        <div class="uppercase">
          {{ userInfo.inviteCode }}
        </div>
        <div
          class="ml-[10px] text-[13px] text-[#19A71D]"
          @click="handleCopy(userInfo.inviteCode)"
        >
          复制
        </div>
      </div>
      <div
        class="btn-block mx-auto mt-[60px] h-[30px] w-[270px]"
        @click="handleCopy(inviteCodeLink)"
      >
        复制邀请链接以邀请好友
      </div>
      <!-- <div class="mx-[20px] mt-[20px] text-center text-[12px] text-[#94999A]">
        当你的好友使用你的邀请码注册并完成新手任务后，双方都可获得 5 个算力币作为奖励
      </div> -->
    </div>
    <!-- <div class="mt-[15px] box-border w-full flex items-center justify-between px-[15px]">
      <div class="btn-block h-[35px] w-[40%]">
        <u-image src="@/static/invitation/icon_5.png" width="14px" height="14px" class="mr-[5px]" />
        分享二维码
      </div>
      <div class="btn-block--white h-[35px] w-[40%]" @click="handleCopy(inviteCodeLink)">
        <u-image src="@/static/invitation/icon_4.png" width="16" height="16" />
        复制链接
      </div>
    </div> -->
    <!-- 详细规则 -->
    <view
      class="bg-desc mx-[20px] mt-[20px] rounded-[10px] px-[15px] py-[20px]"
    >
      <view class="mb-[20px] text-[16px] font-bold">
        邀请奖励
      </view>
      <view class="flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          完成人脸认证并完成一项 AI 训练任务的用户，即为有效用户。
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          邀请 1 位有效用户，将获得 1 个算力值
          <!-- + 3 个幸运点数。 -->
        </view>
      </view>
      <!-- <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          幸运点数越高，赢得奖品的概率就越大。
        </view>
      </view> -->
    </view>
    <!-- <div class="mt-[20px] text-center text-[14px] font-bold">
      无限分销
    </div> -->
    <view
      class="bg-default mx-[20px] mb-[50px] mt-[20px] rounded-[10px] px-[20px] py-[20px]"
    >
      <div class="w-full flex items-center justify-center">
        <div class="w-1/2 flex flex-col items-center justify-center">
          <div class="text-[12px] text-[#94999A]">
            今日佣金收益
          </div>
          <div class="mt-[5px] text-[14px] text-[#b84f32] font-bold">
            {{ formatAmount(statistics.todayCommission) }}
          </div>
        </div>
        <div class="w-1/2 flex flex-col items-center justify-center">
          <div class="text-[12px] text-[#94999A]">
            佣金总收益
          </div>
          <div class="mt-[5px] text-[14px] text-[#b84f32] font-bold">
            {{ formatAmount(statistics.totalCommission) }}
          </div>
        </div>
      </div>
      <div
        class="mt-[20px] flex items-center justify-between text-[14px] font-bold"
      >
        <div class="w-1/4 text-center">
          昵称
        </div>
        <div class="w-1/4 text-center">
          关系类型
        </div>
        <div class="w-1/4 text-center">
          注册时间
        </div>
        <div class="w-1/4 text-center">
          有效用户
        </div>
      </div>
      <template v-if="recordList.length > 0">
        <div
          v-for="(item, index) in recordList"
          :key="index"
          class="mt-[10px] flex items-center justify-between text-[12px] text-[#94999A]"
        >
          <div class="w-1/4 text-center">
            {{ item.name }}
          </div>
          <div class="w-1/4 text-center">
            <span v-if="item.level == 1"> 一级</span>
            <span v-else-if="item.level == 2"> 二级</span>
            <span v-else> 三级</span>
          </div>
          <div class="w-1/4 text-center">
            {{ item.registerTime }}
          </div>
          <div class="w-1/4 text-center">
            <span v-if="item.roleId == 4">无限代理</span>
            <span v-if="item.roleId == 3">普通代理</span>
            <span v-if="item.roleId == 2">激活用户</span>
            <span v-if="item.roleId == 1">未激活</span>
          </div>
        </div>
      </template>
      <up-empty v-else mode="list" margin-top="40" />
      <!-- <record /> -->
    </view>
    <div class="h-[50px] w-full" />
  </view>
</template>

<style lang="scss" scoped>
//
.bg1 {
  background: url('@/static/invitation/top_bg.png');
  background-size: 100% 100%;
}

.bg2 {
  background: url('@/static/invitation/bottom_bg.png');
  background-size: 100% 100%;
}

.bg3 {
  background: #fff;
  border: 1px solid rgba(226, 226, 226, 1);
  box-shadow: 0 3px 6px 1px rgba(148, 153, 154, 0.16);
}
</style>
