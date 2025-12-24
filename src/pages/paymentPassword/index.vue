<script lang="ts" setup>
import md5 from 'js-md5'
import { storeToRefs } from 'pinia'
import { forgotPassword, updatePassword } from '@/api/index'
import { updatePayPwd } from '@/api/login'
import { t } from '@/locale/index'
import { LOGIN_PAGE, REGISTER_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useCommonStore } from '@/store/common'
import { useFaceStore } from '@/store/face'
import { useTokenStore } from '@/store/token'
import { handleToUrl } from '@/utils/util'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
definePage({
  style: {
    navigationStyle: 'custom',
  },
})
let userInfoData = reactive({
  name: '',
  password: '',
  passwordNew: '',
  passwordNewConfirm: '',
  isFaceAuth: false,
})
onShow((options) => {
  console.log('options :>> ', options)
  console.log(' :>> ', useFaceStore().faceInfo)
  // if (options?.query?.faceAuth === 'true') {
  //   userInfoData.isFaceAuth = true
  // }
  if (useFaceStore().type === 5) {
    if (JSON.stringify(useFaceStore().form) !== '{}') {
      userInfoData = useFaceStore().form
    }
    if (useFaceStore().faceInfo?.success && useFaceStore().faceInfo?.sessionId) {
      userInfoData.isFaceAuth = true
    }
  }
})
const tokenStore = useTokenStore()
onMounted(() => {
  if (useCommonStore().inviteCode) {
    userInfoData.inviteCode = useCommonStore().inviteCode || ''
  }
})
async function doLogin() {
  if (userInfo.value.payPwd) {
    if (!userInfoData.password) {
      uni.showToast({
        title: t('qing-shu-ru-jiu-mi-ma'),
        icon: 'none',
      })
      return
    }
  }
  if (!userInfoData.passwordNew) {
    uni.showToast({
      title: t('qing-shu-ru-xin-mi-ma'),
      icon: 'none',
    })
    return
  }
  if (!userInfoData.passwordNewConfirm) {
    uni.showToast({
      title: t('qing-shu-ru-que-ren-mi-ma'),
      icon: 'none',
    })
    return
  }
  if (!userInfoData.isFaceAuth) {
    uni.showToast({
      title: t('qing-xian-yan-zheng-ren-lian'),
      icon: 'none',
    })
    return
  }
  if (userInfoData.passwordNew !== userInfoData.passwordNewConfirm) {
    uni.showToast({
      title: t('liang-ci-shu-ru-mi-ma-bu-yi-zhi'),
      icon: 'none',
    })
    return
  }
  if (!/^(?=.*[a-z])(?=.*\d).{8,}$/i.test(userInfoData.passwordNew)) {
    uni.showToast({
      title: t('qing-shu-ru-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi'),
      icon: 'none',
    })
    return
  }
  if (!/^(?=.*[a-z])(?=.*\d).{8,}$/i.test(userInfoData.passwordNewConfirm)) {
    uni.showToast({
      title: t('qing-shu-ru-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi'),
      icon: 'none',
    })
    return
  }
  try {
    const data = {
      newPwd: md5(userInfoData.passwordNew),
      faceSessionId: useFaceStore().faceInfo?.sessionId || '',
    }
    if (userInfo.value.payPwd) {
      data.oldPwd = md5(userInfoData.password)
    }

    const res = await updatePayPwd(data)
    uni.showToast({
      title: t('geng-xin-cheng-gong'),
      icon: 'none',
    })
    setTimeout(() => {
      userInfoData.password = ''
      userInfoData.passwordNew = ''
      userInfoData.passwordNewConfirm = ''
      userInfoData.isFaceAuth = false
      // useFaceStore().setForm(userInfoData)
      useFaceStore().setFaceInfo({})
      useFaceStore().setType(-1)
    }, 1000)
  }
  catch (error) {
    console.log('修改失败', error)
    uni.showToast({
      title: error.data.message || t('geng-xin-shi-bai'),
      icon: 'none',
    })
  }
}
function handleFaceAuth() {
  useFaceStore().setType(5)
  useFaceStore().setForm(userInfoData)
  handleToUrl('/pages/textface/index')
}
</script>

<template>
  <view class="login relative">
    <div class="mt-[20px] text-center text-[20px] font-bold">
      {{
        userInfo.payPwd
          ? $t("xiu-gai-zhi-fu-mi-ma")
          : $t("she-zhi-zhi-fu-mi-ma")
      }}
    </div>
    <view
      v-if="userInfo.payPwd"
      class="mt-[60px] box-border w-full flex items-center px-[20px]"
    >
      <view class="mr-[10px] w-[80px] text-right text-[14px] text-[#151D1F]">
        {{ $t("jiu-mi-ma") }}
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfoData.password"
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
      :class="{ '!mt-[50px]': userInfoData.payPwd }"
    >
      <view class="mr-[10px] w-[80px] text-right text-[14px] text-[#151D1F]">
        {{ $t("xin-mi-ma") }}
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfoData.passwordNew"
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
          v-model="userInfoData.passwordNewConfirm"
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
          v-if="!userInfoData.isFaceAuth"
          src="/static/login/face_s.png"
          class="h-[15px] w-[15px]"
          mode="scaleToFill"
        />
        <view
          v-if="!userInfoData.isFaceAuth"
          class="ml-[10px] text-[14px] text-[#94999A]"
        >
          {{ $t("wei-ren-zheng") }}
        </view>
        <image
          v-if="userInfoData.isFaceAuth"
          src="/static/login/face_s_a.png"
          class="h-[15px] w-[15px]"
          mode="scaleToFill"
        />
        <view v-if="userInfoData.isFaceAuth" class="ml-[10px] text-[14px]">
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
  height: calc(100vh - 130px);
  background: url('/static/login/login_bg_c.png');
  background-size: 100% 100%;
  // padding: 20px;
}
</style>
