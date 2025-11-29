<script lang="ts" setup>
import md5 from 'js-md5'
import { REGISTER_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})
const userInfo = reactive({
  name: 'admin1',
  password: '123456',
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
        <up-input v-model="userInfo.name" placeholder="请输入内容" color="#94999A">
          <template #prefix>
            <view class="mr-[10px] flex items-center">
              <image src="/static/login/pass_icon.png" class="h-[15px] w-[15px]" />
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
        <up-input v-model="userInfo.password" placeholder="请输入内容" color="#94999A" type="password">
          <template #prefix>
            <view class="mr-[10px] flex items-center">
              <image src="/static/login/name_icon.png" class="h-[15px] w-[15px]" />
            </view>
          </template>
        </up-input>
      </view>
    </view>
    <view class="mt-[20px] px-[20px] text-right text-[14px]" @click="handleToUrl(REGISTER_PAGE)">
      注册
    </view>
    <view class="absolute bottom-[160px] w-full flex flex-col items-center justify-center">
      <image src="/static/login/face.png" class="mb-[5px] h-[40px] w-[40px]" />
      <view>人脸登录</view>
    </view>
    <view class="btn-block absolute bottom-[100px] left-[50%] w-[90%] translate-x-[-50%]" @click="doLogin">
      登录
    </view>
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
