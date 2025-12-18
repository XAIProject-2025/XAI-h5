<script lang="ts" setup>
import md5 from 'js-md5'
import { LOGIN_PAGE, REGISTER_PAGE } from '@/router/config'
import { useCommonStore } from '@/store/common'
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
  passwordNew: '',
  inviteCode: '',
  isFaceAuth: false,
})
onShow((options) => {
  if (useFaceStore().faceInfo?.success && useFaceStore().faceInfo?.sessionId) {
    userInfo.isFaceAuth = true
  }
})
const tokenStore = useTokenStore()
onMounted(() => {
  if (useCommonStore().inviteCode) {
    userInfo.inviteCode = useCommonStore().inviteCode || ''
  }
})
async function doLogin() {
  if (!userInfo.name) {
    uni.showToast({
      title: '请输入用户名',
      icon: 'none',
    })
    return
  }
  if (!userInfo.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
    })
    return
  }
  if (!userInfo.passwordNew) {
    uni.showToast({
      title: '请输入确认密码',
      icon: 'none',
    })
    return
  }
  if (!userInfo.inviteCode) {
    uni.showToast({
      title: '请输入邀请码',
      icon: 'none',
    })
    return
  }
  if (userInfo.password !== userInfo.passwordNew) {
    uni.showToast({
      title: '两次输入密码不一致',
      icon: 'none',
    })
    return
  }
  try {
    const res = await tokenStore.register({
      name: userInfo.name,
      password: md5(userInfo.password),
      inviteCode: userInfo.inviteCode,
      faceSessionId: useFaceStore().faceInfo?.sessionId || '',
      faceS3Key: useFaceStore().faceInfo?.s3Key || '',
    })
    if (!res) {
      return
    }
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
function handleFaceAuth() {
  useFaceStore().setType(1)
  handleToUrl('/pages/textface/index')
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
    <view class="mt-[20px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        确认密码
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.passwordNew"
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
    <view class="mt-[20px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        邀请码
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.inviteCode"
          placeholder="请输入内容"
          color="#94999A"
        >
          <template #prefix>
            <view class="mr-[10px] flex items-center">
              <image
                src="/static/login/invition_icon.png"
                class="h-[15px] w-[15px]"
              />
            </view>
          </template>
        </up-input>
      </view>
    </view>
    <view
      class="mt-[20px] box-border w-full flex items-center px-[20px]"
      @click="handleFaceAuth"
    >
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        人脸识别
      </view>
      <view
        class="w-[30%] flex items-center border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[9px] py-[6px] shadow-blueGray"
      >
        <image
          v-if="!userInfo.isFaceAuth"
          src="/static/login/face_s.png"
          class="h-[15px] w-[15px]"
          mode="scaleToFill"
        />
        <view
          v-if="!userInfo.isFaceAuth"
          class="ml-[10px] text-[14px] text-[#94999A]"
        >
          未认证
        </view>
        <image
          v-if="userInfo.isFaceAuth"
          src="/static/login/face_s_a.png"
          class="h-[15px] w-[15px]"
          mode="scaleToFill"
        />
        <view v-if="userInfo.isFaceAuth" class="ml-[10px] text-[14px]">
          已认证
        </view>
      </view>
    </view>
    <view
      class="mt-[20px] px-[20px] text-right text-[14px]"
      @click="handleToUrl(LOGIN_PAGE)"
    >
      登录
    </view>
    <view
      class="btn-block absolute bottom-[100px] left-[5%] mx-auto h-[40px] w-[90%]"
      @click="doLogin"
    >
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
