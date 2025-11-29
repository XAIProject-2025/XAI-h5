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
  name: '',
  password: '',
  inviteCode: '',
  isFaceAuth: true,
})
const tokenStore = useTokenStore()
async function doLogin() {
  if (!userInfo.name || !userInfo.password || !userInfo.inviteCode) {
    uni.showToast({
      title: '请输入用户名、密码和邀请码',
      icon: 'none',
    })
    return
  }
  try {
    await tokenStore.register({
      name: userInfo.name,
      password: md5(userInfo.password),
      inviteCode: userInfo.inviteCode,
    })
    uni.showToast({
      title: '注册成功',
      icon: 'none',
    })
    setTimeout(() => {
      handleToUrl('/pages/index/index')
    }, 1000)
  }
  catch (error) {
    tokenStore.logout()
    console.log('注册失败', error)
    uni.showToast({
      title: '注册失败',
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="login relative">
    <view class="box-border w-full flex items-center px-[20px] pt-[25vh]">
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
    <view class="mt-[20px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        邀请码
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input v-model="userInfo.inviteCode" placeholder="请输入内容" color="#94999A">
          <template #prefix>
            <view class="mr-[10px] flex items-center">
              <image src="/static/login/invition_icon.png" class="h-[15px] w-[15px]" />
            </view>
          </template>
        </up-input>
      </view>
    </view>
    <view class="mt-[20px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        人脸识别
      </view>
      <view
        class="w-[30%] flex items-center border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[9px] py-[6px] shadow-blueGray"
      >
        <image
          v-if="!userInfo.isFaceAuth" src="/static/login/face_s.png" class="h-[15px] w-[15px]"
          mode="scaleToFill"
        />
        <view v-if="!userInfo.isFaceAuth" class="ml-[10px] text-[14px] text-[#94999A]">
          未认证
        </view>

        <image
          v-if="userInfo.isFaceAuth" src="/static/login/face_s_a.png" class="h-[15px] w-[15px]"
          mode="scaleToFill"
        />
        <view v-if="userInfo.isFaceAuth" class="ml-[10px] text-[14px]">
          已认证
        </view>
      </view>
    </view>
    <view class="btn-block absolute bottom-[100px] left-[50%] w-[90%] translate-x-[-50%]" @click="doLogin">
      注册
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
