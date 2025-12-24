<script lang="ts" setup>
import { storeToRefs } from 'pinia'
// import { t } from '@/locales'
import { t } from '@/locale/index'

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
    title: t('tabbar.home'),
    url: '/pages/index/index',
  },
  {
    icon: 'xl',
    title: t('xun-lian-zhong-xin'),
    url: '/pages/training/index',
  },
  {
    icon: 'sl',
    title: t('suan-li-fu-wu-qi'),
    url: '/pages/server/index',
  },
  {
    icon: 'cp',
    title: t('chan-pin-zhong-xin'),
    url: '/pages/productCenter/index',
  },
  {
    icon: 'dh',
    title: t('dui-huan-zhong-xin'),
    url: '/pages/exchange/index',
  },
  {
    icon: 'yq',
    title: t('yao-qing-hao-you'),
    url: '/pages/invitation/index',
  },
  {
    icon: 'zj',
    title: t('x-zhi-fu'),
    url: '/pages/funds/index',
  },
  {
    icon: 'sz',
    title: t('she-zhi-zhong-xin'),
    url: '/pages/setting/index',
  },
  // {
  //   icon: 'sz',
  //   title: '人脸测试',
  //   url: '/pages/textface/index',
  // },
])
function handleToTab(item) {
  if (userInfo.value.roleId === -1 && item.icon !== 'sy') {
    uni.showToast({
      title: t('dang-qian-you-ke-yong-hu-qing-deng-lu-shi-yong'),
      icon: 'none',
      duration: 2000,
      complete: () => {
        handleClickAlert()
      },
    })
    return
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
        {{ $t("deng-lu") }}
      </div>
    </view>
  </up-popup>
</template>

<style lang="scss" scoped>
//
</style>
