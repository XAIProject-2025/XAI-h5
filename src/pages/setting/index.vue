<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'

const tokenStore = useTokenStore()

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    confirmColor: '#000',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        tokenStore.logout()
        // 执行退出登录逻辑
        uni.showToast({
          title: '退出登录成功',
          icon: 'success',
          success: () => {
            uni.navigateTo({
              url: `${LOGIN_PAGE}`,
            })
          },
        })
      }
    },
  })
}
</script>

<template>
  <view class="p-[15px]">
    <view class="text-[16px] font-bold">
      设置中心
    </view>
    <view class="mb-[10px] mt-[5px] text-[14px] text-[#94999A]">
      管理你的账户信息与偏好
    </view>
    <div class="bg mb-[30px] flex items-center p-[20px]">
      <u-image src="/static/images/avatar_my.png" width="50" height="50" class="rounded-full" />
      <div class="ml-[10px] flex flex-col items-center text-[16px] font-bold">
        <div class="mb-[5px] mr-[10px] text-[#fff]">
          {{ userInfo?.name }}
        </div>
        <level />
      </div>
    </div>
    <div class="bg-default mb-[10px] flex items-center justify-between rounded-[20px] px-[10px] py-[10px]">
      <div class="flex items-center text-[14px]">
        <up-icon name="lock-open" size="20" />
        <div class="ml-[10px]">
          修改密码
        </div>
      </div>
      <up-icon name="arrow-right" />
    </div>
    <div class="bg-default flex items-center justify-between rounded-[20px] px-[10px] py-[10px]">
      <div class="flex items-center text-[14px]">
        <up-icon name="google" size="20" />
        <div class="ml-[10px]">
          关于我们
        </div>
      </div>
      <up-icon name="arrow-right" />
    </div>
    <div
      class="mt-[30px] border border-[#000] rounded-[20px] border-solid bg-[#fff] px-[10px] py-[10px] text-center text-[14px] text-[#000]"
      @click="handleLogout"
    >
      退出登录
    </div>
  </view>
</template>

<style lang="scss" scoped>
//
.bg {
  background: url('/static/setting/card_bg.png');
  background-size: 100% 100%;
}
</style>
