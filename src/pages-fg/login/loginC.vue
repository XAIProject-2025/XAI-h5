<script lang="ts" setup>
import md5 from 'js-md5'
import { touristLogin } from '@/api/login'
import Textface from '@/pages/textface/index.vue'
import { REGISTER_PAGE } from '@/router/config'
import { useFaceStore } from '@/store/face'
import { useTokenStore } from '@/store/token'
import { handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})
const userInfo = reactive({
  name: '',
  password: '',
})
const tokenStore = useTokenStore()
async function doLogin() {
  if (!userInfo.name || !userInfo.password) {
    uni.showToast({
      title: '请输入用户名和密码',
      icon: 'none',
    })
    return
  }
  try {
    // 调用登录接口
    await tokenStore.login({
      name: userInfo.name,
      password: md5(userInfo.password),
    })
    handleToUrl('/pages/index/index')
    // uni.navigateBack()
  }
  catch (error) {
    console.log('error :>> ', error)
  }
}

function handleFaceAuth() {
  useFaceStore().setType(3)
  handleToUrl('/pages/textface/index')
}
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
  <view class="login relative">
    <view class="box-border w-full flex items-center px-[20px] pt-[30vh]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        用户名
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.name"
          placeholder="请输入内容"
          color="#94999A"
        >
          <template #prefix>
            <view class="mr-[10px] flex items-center">
              <image
                src="/static/login/pass_icon.png"
                class="h-[15px] w-[15px]"
              />
            </view>
          </template>
        </up-input>
      </view>
    </view>
    <view class="mt-[20px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        密码
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.password"
          placeholder="请输入内容"
          color="#94999A"
          type="password"
        >
          <template #prefix>
            <view class="mr-[10px] flex items-center">
              <image
                src="/static/login/name_icon.png"
                class="h-[15px] w-[15px]"
              />
            </view>
          </template>
        </up-input>
      </view>
    </view>
    <view
      class="mt-[20px] px-[20px] text-right text-[14px]"
      @click="handleToUrl(REGISTER_PAGE)"
    >
      注册
    </view>
    <view
      class="absolute bottom-[220px] w-full flex flex-col items-center justify-center"
      @click="handleFaceAuth"
    >
      <image src="/static/login/face.png" class="mb-[5px] h-[40px] w-[40px]" />
      <view>人脸登录</view>
    </view>
    <view
      class="btn-block absolute bottom-[80px] left-[5%] mx-auto h-[40px] w-[90%]"
      @click="doLogin"
    >
      登录
    </view>
    <view
      class="btn-block--white absolute bottom-[140px] left-[5%] mx-auto h-[40px] w-[90%]"
      @click="handleTouristLogin"
    >
      游客模式
    </view>
    <!-- <textface /> -->
  </view>
</template>

<style lang="scss" scoped>
//
.login {
  width: 100vw;
  height: 100vh;
  background: url('/static/login/login_bg_c.png');
  background-size: 100% 100%;
  // padding: 20px;
}
</style>
