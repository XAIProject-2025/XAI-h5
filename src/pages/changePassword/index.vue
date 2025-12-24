<script lang="ts" setup>
import md5 from 'js-md5'
import { forgotPassword, updatePassword } from '@/api/index'
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
let userInfo = reactive({
  name: '',
  password: '',
  passwordNew: '',
  passwordNewConfirm: '',
  isFaceAuth: false,
})
onShow((options) => {
  if (useFaceStore().type === 2) {
    if (JSON.stringify(useFaceStore().form) !== '{}') {
      userInfo = useFaceStore().form
    }
    if (useFaceStore().faceInfo?.success && useFaceStore().faceInfo?.sessionId) {
      userInfo.isFaceAuth = true
    }
  }
})
const tokenStore = useTokenStore()
onMounted(() => {
  if (useCommonStore().inviteCode) {
    userInfo.inviteCode = useCommonStore().inviteCode || ''
  }
})
async function doLogin() {
  if (!userInfo.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
    })
    return
  }
  if (!userInfo.passwordNew) {
    uni.showToast({
      title: '请输入新密码',
      icon: 'none',
    })
    return
  }
  if (!userInfo.passwordNewConfirm) {
    uni.showToast({
      title: '请输入确认密码',
      icon: 'none',
    })
    return
  }
  if (!userInfo.isFaceAuth) {
    uni.showToast({
      title: '请先验证人脸',
      icon: 'none',
    })
    return
  }
  if (userInfo.passwordNew !== userInfo.passwordNewConfirm) {
    uni.showToast({
      title: '两次输入密码不一致',
      icon: 'none',
    })
    return
  }
  if (!/^(?=.*[a-z])(?=.*\d).{8,}$/i.test(userInfo.passwordNew)) {
    uni.showToast({
      title: '请输入密码（8位以上包含字母和数字）',
      icon: 'none',
    })
    return
  }
  if (!/^(?=.*[a-z])(?=.*\d).{8,}$/i.test(userInfo.passwordNewConfirm)) {
    uni.showToast({
      title: '请输入密码（8位以上包含字母和数字）',
      icon: 'none',
    })
    return
  }

  try {
    // const res = await updatePassword({
    //   oldPwd: md5(userInfo.password),
    //   newPwd: md5(userInfo.passwordNew),
    //   faceSessionId: useFaceStore().faceInfo?.sessionId || '',
    // })
    const res = await forgotPassword({
      password: md5(userInfo.passwordNew),
      faceSessionId: useFaceStore().faceInfo?.sessionId || '',
    })
    uni.showToast({
      title: '修改成功,请重新登录',
      icon: 'none',
    })
    setTimeout(() => {
      const tokenStore = useTokenStore()
      tokenStore.logout()
      handleToUrl(LOGIN_PAGE)
      useFaceStore().setFaceInfo({})
      useFaceStore().setType(-1)
    }, 1000)
  }
  catch (error) {
    console.log('修改失败', error)
    uni.showToast({
      title: '修改失败',
      icon: 'none',
    })
  }
}
function handleFaceAuth() {
  useFaceStore().setType(2)
  useFaceStore().setForm(userInfo)
  handleToUrl('/pages/textface/index')
}
</script>

<template>
  <view class="login relative">
    <div class="mt-[20px] text-center text-[20px] font-bold">
      修改密码
    </div>
    <view class="mt-[60px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        旧密码
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
        新密码
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
        确认密码
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.passwordNewConfirm"
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
      class="mt-[20px] box-border w-full flex items-center px-[20px]"
      @click="handleFaceAuth"
    >
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        人脸验证
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
      class="btn-block absolute bottom-[100px] left-[5%] mx-auto h-[40px] w-[90%]"
      @click="doLogin"
    >
      确定
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
.login {
  width: 100vw;
  height: calc(100vh - 130px);
  background: url('/static/login/login_bg_c.png');
  background-size: 100% 100%;
  // padding: 20px;
}
</style>
