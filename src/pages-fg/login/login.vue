<script lang="ts" setup>
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const tokenStore = useTokenStore()
async function doLogin() {
  if (tokenStore.hasLogin) {
    uni.navigateBack()
    return
  }
  try {
    // 调用登录接口
    await tokenStore.login({
      username: '菲鸽',
      password: '123456',
    })
    uni.navigateBack()
  }
  catch (error) {
    console.log('登录失败', error)
  }
}
</script>

<template>
  <view class="login">
    <!-- <view class="text-center">
      登录页
    </view>
    <button class="mt-4 w-40 text-center" @click="doLogin">
      点击模拟登录
    </button> -->
  </view>
</template>

<style lang="scss" scoped>
//
.login {
  width: 100vw;
  height: 100vh;
  background: url('@/static/login/login_bg.png') 100% 100% no-repeat;
  // padding: 20px;
}
</style>
