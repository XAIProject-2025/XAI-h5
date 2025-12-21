<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'

import { getImage, handleToUrl } from '@/utils/util'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const show = ref(false)
function handleClose() {
  show.value = false
}
function openPopup() {
  console.log('111 :>> ', 111)
  show.value = true
}
// 暴露方法给父组件
defineExpose({
  openPopup,
})
const navList = ref([
  {
    icon: 'sy',
    title: '首页',
    url: '/pages/index/index',
  },
  {
    icon: 'xl',
    title: '训练中心',
    url: '/pages/training/index',
  },
  {
    icon: 'sl',
    title: '算力服务器',
    url: '/pages/server/index',
  },
  {
    icon: 'cp',
    title: '产品中心',
    url: '/pages/productCenter/index',
  },
  {
    icon: 'dh',
    title: '兑换中心',
    url: '/pages/exchange/index',
  },
  {
    icon: 'yq',
    title: '邀请好友',
    url: '/pages/invitation/index',
  },
  {
    icon: 'zj',
    title: 'X支付',
    url: '/pages/funds/index',
  },
  {
    icon: 'sz',
    title: '设置中心',
    url: '/pages/setting/index',
  },
  // {
  //   icon: 'sz',
  //   title: '人脸测试',
  //   url: '/pages/textface/index',
  // },
])
function handleToTab(item) {
  if (userInfo.value.roleId === -1) {
    return uni.showToast({
      title: '当前游客用户,请登录使用',
      icon: 'none',
    })
  }
  handleToUrl(item.url)
  // uni.navigateTo({
  //   url: item.url,
  // })
}

function handleClickAlert() {
  const tokenStore = useTokenStore()
  handleToUrl('/pages-fg/login/loginC')
  tokenStore.logout()
}
</script>

<template>
  <up-popup
    :show="show"
    mode="left"
    close-on-click-overlay
    z-index="998"
    @close="handleClose"
  >
    <view class="w-[50vw] p-[20px]">
      <view class="mt-[20px] flex items-center justify-center">
        <image src="/static/logo.png" class="h-[40px] w-[40px]" alt="" />
      </view>
      <view
        class="mb-[20px] mt-[15px] text-center text-[16px] text-[#2d3738] font-bold"
      >
        X-AI
      </view>
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="flex items-center py-[10px]"
      >
        <image
          :src="`/static/nav/${item.icon}.png`"
          class="mr-[15px] h-[16px] w-[16px]"
          alt=""
        />
        <div class="text-[14px] text-[#2d3738]" @click="handleToTab(item)">
          {{ item.title }}
        </div>
      </view>
      <div
        v-if="userInfo.roleId === -1"
        class="btn-block mt-[20px] h-[30px] flex items-center justify-center"
        @click="handleClickAlert"
      >
        登录
      </div>
    </view>
  </up-popup>
</template>

<style lang="scss" scoped>
//
</style>
