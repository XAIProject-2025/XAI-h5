<script lang="ts" setup>
import { getImage } from '@/utils/util'

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
    title: '资金管理',
    url: '/pages/funds/index',
  },
  {
    icon: 'sz',
    title: '设置中心',
    url: '/pages/setting/index',
  },
  {
    icon: 'sz',
    title: '人脸测试',
    url: '/pages/textface/index',
  },
])
</script>

<template>
  <up-popup :show="show" mode="left" close-on-click-overlay @close="handleClose">
    <view class="w-[50vw] p-[20px]">
      <view class="mt-[20px] flex items-center justify-center">
        <image src="/static/logo.png" class="h-[40px] w-[40px]" alt="" />
      </view>
      <view class="mb-[20px] mt-[15px] text-center text-[16px] text-[#2d3738] font-bold">
        3u AI
      </view>
      <view v-for="(item, index) in navList" :key="index" class="flex items-center py-[10px]">
        <image :src="`/static/nav/${item.icon}.png`" class="mr-[15px] h-[16px] w-[16px]" alt="" />
        <navigator :url="item.url" class="text-[14px] text-[#2d3738]">
          {{ item.title }}
        </navigator>
      </view>
    </view>
  </up-popup>
</template>

<style lang="scss" scoped>
//
</style>
