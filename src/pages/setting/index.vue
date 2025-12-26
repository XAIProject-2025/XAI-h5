<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { t } from '@/locale/index'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'
import { testI18n } from '@/utils/i18n'
import { handleToUrl, openExternalUrl } from '@/utils/util'

const tokenStore = useTokenStore()

const userStore = useUserStore()
onShow(async () => {
  await userStore.fetchUserInfo()
})
const { userInfo } = storeToRefs(userStore)
const show = ref(false)
const columns = reactive([
  [{
    label: '中文',
    value: 'zh-Hans',
  }, {
    label: '西班牙',
    value: 'es',
  }, {
    label: '英语',
    value: 'en',
  }],
])
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
function handleLogout() {
  uni.showModal({
    title: t('ti-shi'),
    content: t('que-ding-yao-tui-chu-deng-lu-ma'),
    confirmColor: '#000',
    confirmText: t('queding'),
    cancelText: t('quxiao'),
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        tokenStore.logout()
        // 执行退出登录逻辑
        uni.showToast({
          title: t('tui-chu-deng-lu-cheng-gong'),
          icon: 'success',
          success: () => {
            uni.navigateTo({
              url: `${LOGIN_PAGE}`,
            })
          },
        })
      }
    },
  })
}
function confirmLanguage(e) {
  uni.setLocale(e.value[0].value)
  // #ifdef H5
  location.reload()
  // #endif
}
function showToast() {
  openExternalUrl('https://t.me/XAi515x')
}
// 支付密码
function handleToPaymentPassword() {
  if (userInfo.value.serverCount > 0) {
    handleToUrl('/pages/paymentPassword/index')
  }
  else {
    if (userInfo.value.serverCount === 0) {
      uni.showToast({
        title: t('dang-qian-mei-you-fu-wu-qi-bu-neng-she-zhi-zhi-fu-mi-ma'),
        icon: 'none',
      })
    }
  }
}
</script>

<template>
  <view class="p-[15px]">
    <view class="text-[16px] font-bold">
      {{ $t("she-zhi-zhong-xin") }}
    </view>
    <view class="mb-[10px] mt-[5px] text-[14px] text-[#94999A]">
      {{ $t("guan-li-ni-de-zhang-hu-xin-xi-yu-pian-hao") }}
    </view>
    <div class="bg mb-[30px] flex items-center p-[20px]">
      <u-image
        src="/static/images/avatar_my.png"
        width="50"
        height="50"
        class="rounded-full"
      />
      <div class="ml-[10px] flex flex-col items-center text-[16px] font-bold">
        <div class="mb-[5px] mr-[10px] text-[#fff]">
          {{ userInfo?.name }}
        </div>
        <level />
      </div>
    </div>
    <div
      class="bg-default mb-[10px] flex items-center justify-between rounded-[20px] px-[10px] py-[10px]"
      @click="handleToUrl('/pages/changePassword/index')"
    >
      <div class="flex items-center text-[14px]">
        <up-icon name="lock-open" size="20" />
        <div class="ml-[10px]">
          {{ $t("xiu-gai-mi-ma") }}
        </div>
      </div>
      <up-icon name="arrow-right" />
    </div>
    <div
      class="bg-default mb-[10px] flex items-center justify-between rounded-[20px] px-[10px] py-[10px]"
      @click="handleToPaymentPassword"
    >
      <div class="flex items-center text-[14px]">
        <up-icon name="lock-open" size="20" />
        <div class="ml-[10px]">
          {{ $t("zhi-fu-mi-ma") }}
        </div>
      </div>
      <up-icon name="arrow-right" />
    </div>
    <div
      class="bg-default mb-[10px] flex items-center justify-between rounded-[20px] px-[10px] py-[10px]"
      @click="showToast"
    >
      <div class="flex items-center text-[14px]">
        <up-icon name="google" size="20" />
        <div class="ml-[10px]">
          {{ $t("guan-yu-wo-men") }}
        </div>
      </div>
      <up-icon name="arrow-right" />
    </div>
    <div
      class="bg-default flex items-center justify-between rounded-[20px] px-[10px] py-[10px]"
      @click="show = true"
    >
      <div class="flex items-center text-[14px]">
        <up-icon name="google" size="20" />
        <div class="ml-[10px]">
          {{ $t("qie-huan-yu-yan") }}
        </div>
      </div>
      <up-icon name="arrow-right" />
    </div>
    <div
      class="mt-[30px] border border-[#000] rounded-[20px] border-solid bg-[#fff] px-[10px] py-[10px] text-center text-[14px] text-[#000]"
      @click="handleLogout"
    >
      {{ $t("tui-chu-deng-lu") }}
    </div>

    <up-picker
      :show="show"
      :columns="columns"
      :confirm-button-text="$t('queding')"
      :cancel-button-text="$t('quxiao')"
      confirm-color="#000"
      key-name="label"
      value-name="value"
      @confirm="confirmLanguage"
      @cancel="show = false"
    />
  </view>
</template>

<style lang="scss" scoped>
//
.bg {
  background: url('/static/setting/card_bg.png');
  background-size: 100% 100%;
}
</style>
