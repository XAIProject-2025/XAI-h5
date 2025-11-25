<script lang="ts" setup>
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
    icon: 'home1',
    title: '首页',
    url: '/pages/index/index',
  },
  {
    icon: 'dong',
    title: '训练中心',
    url: '/pages/user/index',
  },
  {
    icon: 'dong',
    title: '算力服务器',
    url: '/pages/user/index',
  },
  {
    icon: 'dong',
    title: '产品中心',
    url: '/pages/user/index',
  },
  {
    icon: 'dong',
    title: '兑换中心',
    url: '/pages/user/index',
  },
  {
    icon: 'dong',
    title: '邀请好友',
    url: '/pages/user/index',
  },
  {
    icon: 'dong',
    title: '资金管理',
    url: '/pages/user/index',
  },
  {
    icon: 'dong',
    title: '设置中心',
    url: '/pages/user/index',
  },
])
</script>

<template>
  <up-popup :show="show" mode="left" close-on-click-overlay @close="handleClose">
    <view class="w-[50vw] p-[20px]">
      <view>logo</view>
      <view class="mb-[20px] text-center text-[16px] text-[#2d3738] font-bold">
        6v AI
      </view>
      <view v-for="(itme, index) in navList" :key="index" class="flex items-center py-[7px]">
        <!-- <wd-icon :name="itme.icon" size="20px" class="mr-[10px]" /> -->
        <navigator :url="itme.url" class="text-[14px] text-[#2d3738]">
          {{ itme.title }}
        </navigator>
      </view>
    </view>
  </up-popup>
</template>

<style lang="scss" scoped>
//
</style>
