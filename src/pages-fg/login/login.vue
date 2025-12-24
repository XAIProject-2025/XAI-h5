<script lang="ts" setup>
import { touristLogin } from '@/api/login'
import { LOGIN_C_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})
async function handleTouristLogin() {
  // handleToUrl('/pages/index/index')
  const res = await touristLogin()
  const tokenStore = useTokenStore()
  tokenStore._postLogin(res)
  uni.showToast({
    title: '游客模式登录成功',
    icon: 'none',
    duration: 2000,
    complete: () => {
      setTimeout(() => {
        handleToUrl('/pages/index/index')
      }, 1000)
    },
  })
}
</script>

<template>
  <view class="login relative flex flex-col items-center">
    <image
      src="/static/logo_big.png"
      class="mx-auto mt-[140px] h-[130px] w-[130px]"
    />
    <view class="mt-[20px] text-[20px] font-bold">
      X-AI
    </view>
    <view
      class="btn-block absolute bottom-[100px] left-[5%] mx-auto h-[40px] w-[90%]"
      @click="handleTouristLogin"
    >
      <!-- @click="handleToUrl(LOGIN_C_PAGE)" -->
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
