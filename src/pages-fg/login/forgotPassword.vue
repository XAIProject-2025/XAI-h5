<script lang="ts" setup>
import md5 from 'js-md5'
import { forgotPassword } from '@/api/index'
import { t } from '@/locale'
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
  isFaceAuth: false,
})
onShow((options) => {
  console.log(' :>> ', useFaceStore().faceInfo)
  if (useFaceStore().type === 4) {
    if (JSON.stringify(useFaceStore().form) !== '{}') {
      userInfo = useFaceStore().form
    }
    if (useFaceStore().faceInfo?.sessionId) {
      console.log('11111 :>> ', 11111)
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
      title: t('qing-shu-ru-xin-mi-ma'),
      icon: 'none',
    })
    return
  }
  if (!userInfo.passwordNew) {
    uni.showToast({
      title: t('qing-shu-ru-que-ren-xin-mi-ma'),
      icon: 'none',
    })
    return
  }
  if (!/^(?=.*[a-z])(?=.*\d).{8,}$/i.test(userInfo.password)) {
    uni.showToast({
      title: t('qing-shu-ru-xin-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi'),
      icon: 'none',
    })
    return
  }
  if (!/^(?=.*[a-z])(?=.*\d).{8,}$/i.test(userInfo.passwordNew)) {
    uni.showToast({
      title: t('qing-shu-ru-que-ren-xin-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi'),
      icon: 'none',
    })
    return
  }
  if (userInfo.password !== userInfo.passwordNew) {
    uni.showToast({
      title: t('liang-ci-shu-ru-mi-ma-bu-yi-zhi'),
      icon: 'none',
    })
    return
  }
  if (!userInfo.isFaceAuth) {
    uni.showToast({
      title: t('qing-yan-zheng-ren-lian'),
      icon: 'none',
    })
    return
  }
  try {
    const res = await forgotPassword({
      password: md5(userInfo.passwordNew),
      faceSessionId: useFaceStore().faceInfo?.sessionId || '',
    })
    uni.showToast({
      title: t('xiu-gai-cheng-gong-qing-zhong-xin-deng-lu'),
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
      title: t('xiu-gai-shi-bai'),
      icon: 'none',
    })
  }
}
function handleFaceAuth() {
  useFaceStore().setType(4)
  useFaceStore().setForm(userInfo)
  handleToUrl('/pages/textface/index')
}
</script>

<template>
  <view class="login relative">
    <div class="mt-[20px] text-center text-[20px] font-bold">
      {{ $t("wang-ji-mi-ma") }}
    </div>
    <view class="mt-[120px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[80px] text-right text-[14px] text-[#151D1F]">
        {{ $t("xin-mi-ma") }}
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.password"
          :placeholder="$t('qing-shu-ru-nei-rong-0')"
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
      <view class="mr-[10px] w-[80px] text-right text-[14px] text-[#151D1F]">
        {{ $t("que-ren-mi-ma") }}
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.passwordNew"
          :placeholder="$t('qing-shu-ru-nei-rong-0')"
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
      <view class="mr-[10px] w-[80px] text-right text-[14px] text-[#151D1F]">
        {{ $t("ren-lian-yan-zheng") }}
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
          {{ $t("wei-ren-zheng") }}
        </view>
        <image
          v-if="userInfo.isFaceAuth"
          src="/static/login/face_s_a.png"
          class="h-[15px] w-[15px]"
          mode="scaleToFill"
        />
        <view v-if="userInfo.isFaceAuth" class="ml-[10px] text-[14px]">
          {{ $t("yi-ren-zheng") }}
        </view>
      </view>
    </view>
    <view
      class="btn-block absolute bottom-[100px] left-[5%] mx-auto h-[40px] w-[90%]"
      @click="doLogin"
    >
      {{ $t("queding") }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
.login {
  width: 100vw;
  height: calc(100vh);
  background: url('/static/login/login_bg_c.png');
  background-size: 100% 100%;
  // padding: 20px;
}
</style>
