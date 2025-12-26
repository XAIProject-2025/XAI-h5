<script lang="ts" setup>
import md5 from 'js-md5'
import { bindFace } from '@/api/index'
import { t } from '@/locale/index'
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
  inviteCode: '',
  isFaceAuth: false,
})
onShow((options) => {
  console.log('useFaceStore().f :>> ', useFaceStore().faceInfo)

  if (useFaceStore().type === 1) {
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
  if (!userInfo.name) {
    uni.showToast({
      title: t('qing-shu-ru-yong-hu-ming'),
      icon: 'none',
    })
    return
  }
  // 判断是否只包含字母和数字
  const nameRegex = /^[A-Z0-9]+$/i
  if (!nameRegex.test(userInfo.name)) {
    uni.showToast({
      title: t('yong-hu-ming-zhi-neng-bao-han-zi-mu-he-shu-zi'),
      icon: 'none',
    })
    return
  }
  // 8位以上包含字母和数字
  if (!/^(?=.*[a-z])(?=.*\d).{8,}$/i.test(userInfo.password)) {
    uni.showToast({
      title: t('qing-shu-ru-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi'),
      icon: 'none',
    })
    return
  }
  // 8位以上包含字母和数字
  if (!/^(?=.*[a-z])(?=.*\d).{8,}$/i.test(userInfo.passwordNew)) {
    uni.showToast({
      title: t('qing-shu-ru-que-ren-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi'),
      icon: 'none',
    })
    return
  }
  if (!userInfo.inviteCode) {
    uni.showToast({
      title: t('qing-shu-ru-yao-qing-ma'),
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
  if (!useFaceStore().faceInfo?.sessionId) {
    uni.showToast({
      title: t('qing-yan-zheng-ren-lian'),
      icon: 'none',
    })
    return
  }
  try {
    const res = await tokenStore.register({
      name: userInfo.name.trim(),
      password: md5(userInfo.password),
      inviteCode: userInfo.inviteCode,
      faceSessionId: useFaceStore().faceInfo?.sessionId || '',
    })
    if (!res) {
      return
    }
    // const bindFaceRes = await bindFace(useFaceStore().faceInfo)
    uni.showToast({
      title: t('zhu-ce-cheng-gong'),
      icon: 'none',
    })
    setTimeout(() => {
      handleToUrl('/pages/index/index')
      useFaceStore().setFaceInfo({})
      useFaceStore().setType(-1)
      useFaceStore().setForm({})
    }, 1000)
  }
  catch (error) {
    tokenStore.logout()
    console.log('注册失败', error)
    uni.showToast({
      title: t('zhu-ce-shi-bai'),
      icon: 'none',
    })
  }
}
function handleFaceAuth() {
  useFaceStore().setType(1)
  useFaceStore().setForm(userInfo)
  handleToUrl('/pages/textface/index')
}
</script>

<template>
  <view class="login relative">
    <view class="box-border w-full flex items-center px-[20px] pt-[25vh]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        {{ $t("yong-hu-ming") }}
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.name"
          :placeholder="$t('qing-shu-ru-nei-rong-0')"
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
    <div class="ml-[90px] mt-[5px] flex items-center">
      <up-icon name="info-circle" size="14" color="#999" />
      <div class="ml-[5px] text-[12px] text-[#999]">
        {{
          $t(
            "qing-shi-yong-zi-mu-he-shu-zi-zu-he-bu-yun-xu-shi-yong-te-shu-zi-fu-fu-hao",
          )
        }}
        <!-- {{ $t("qing-shu-ru-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi") }} -->
      </div>
    </div>
    <view class="mt-[20px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        {{ $t("mi-ma") }}
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
    <div class="ml-[90px] mt-[5px] flex items-center">
      <up-icon name="info-circle" size="14" color="#999" />
      <div class="ml-[5px] text-[12px] text-[#999]">
        {{ $t("qing-shu-ru-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi") }}
      </div>
    </div>
    <view class="mt-[15px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
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
    <div class="ml-[90px] mt-[5px] flex items-center">
      <up-icon name="info-circle" size="14" color="#999" />
      <div class="ml-[5px] text-[12px] text-[#999]">
        {{ $t("qing-shu-ru-mi-ma-8-wei-yi-shang-bao-han-zi-mu-he-shu-zi") }}
      </div>
    </div>
    <view class="mt-[20px] box-border w-full flex items-center px-[20px]">
      <view class="mr-[10px] w-[60px] text-right text-[14px] text-[#151D1F]">
        {{ $t("yao-qing-ma") }}
      </view>
      <view
        class="flex-1 border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[4px] py-[2px] shadow-blueGray"
      >
        <up-input
          v-model="userInfo.inviteCode"
          :placeholder="t('qing-shu-ru-nei-rong-0')"
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
      class="mt-[20px] px-[20px] text-right text-[14px]"
      @click="handleToUrl(LOGIN_PAGE)"
    >
      {{ $t("deng-lu") }}
    </view>
    <view
      class="btn-block absolute bottom-[100px] left-[5%] mx-auto h-[40px] w-[90%]"
      @click="doLogin"
    >
      {{ $t("zhu-ce") }}
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
