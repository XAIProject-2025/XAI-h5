<script lang="ts" setup>
import { LOGIN_C_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const tokenStore = useTokenStore()
</script>

<template>
  <view class="login relative flex flex-col items-center">
    <image src="/static/logo_big.png" class="mx-auto mt-[140px] h-[130px] w-[130px]" />
    <view class="mt-[20px] text-[20px] font-bold">
      3u Ai
    </view>
    <view class="btn-block absolute bottom-[100px] mx-auto w-[90%]" @click="handleToUrl(LOGIN_C_PAGE)">
      立即开始
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
.login {
  width: 100vw;
  height: 100vh;
  background: url('/static/login/login_bg.png');
  background-size: 100% 100%;

  // padding: 20px;
}
</style>
