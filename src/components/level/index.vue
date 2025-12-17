<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
</script>

<template>
  <view
    class="btn-block h-[20px] min-h-[20px] flex items-center justify-center rounded-[12px] px-[15px] py-[4px]"
  >
    <up-image
      :width="15"
      :height="15"
      round
      src="/static/images/vip.png"
      class="mr-[8px]"
    />
    E{{ userInfo.vipLevel }}
  </view>
</template>

<style lang="scss" scoped>
//
</style>
