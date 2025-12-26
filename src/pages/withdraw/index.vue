<script lang="ts" setup>
import md5 from 'js-md5'
import { storeToRefs } from 'pinia'
import { applyWithdrawal, getVipInfo } from '@/api/index'
import { t } from '@/locale'

import { useUserStore } from '@/store'
import { useFaceStore } from '@/store/face'
import { formatAmount, handleCopy, handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
let form = reactive({
  amount: null,
  address: null,
  payPwd: null,
  isFaceAuth: false,
})
const show = ref(false)
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const vipInfoData = ref({})
onShow((options) => {
  if (useFaceStore().type === 6) {
    console.log('form :>> ', useFaceStore().form)
    if (JSON.stringify(useFaceStore().form) !== '{}') {
      form = useFaceStore().form
    }
    if (useFaceStore().faceInfo?.success && useFaceStore().faceInfo?.sessionId) {
      form.isFaceAuth = true
    }
  }
})
onMounted(async () => {
  // const vipInfoData = ref({})
  const vipInfoRes = await getVipInfo()
  vipInfoData.value = vipInfoRes
})
function isChileTimeInRange() {
  // 获取智利时间
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Santiago' }),
  )

  const hour = now.getHours()
  const minute = now.getMinutes()

  // 9:00 <= time < 21:00
  return hour >= 9 && (hour < 21)
}
async function applyWithdrawalData() {
  // form.amount 必须正整数

  // 判断智利时间9:00到21:00内
  if (!isChileTimeInRange()) {
    // console.log('不在时间范围内')
    return uni.showToast({
      title: t('zhi-xian-jin-hang-zhi-chu-9-00-21-00'),
      icon: 'none',
      duration: 2000,
    })
  }
  else {
    console.log('在智利时间 9:00 - 21:00 内')
  }
  if (userInfo.value.roleId === 1) {
    uni.showToast({
      title: t('dang-qian-yong-hu-wei-ji-huo-qing-lian-xi-ke-fu-ji-huo'),
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (vipInfoData.value.serverNum > 0) {
    if (!form.payPwd) {
      uni.showToast({
        title: t('qing-shu-ru-zhi-fu-mi-ma-wei-she-zhi-qing-qian-wang-ge-ren-zhong-xin-she-zhi'),
        icon: 'none',
        duration: 2000,
      })
      // 校验支付密码六位数字
      if (!/^\d{6}$/.test(form.payPwd)) {
        uni.showToast({
          title: t('zhi-fu-mi-ma-zhi-yao-shi-6-wei-shu-zi'),
          icon: 'none',
          duration: 2000,
        })
        return
      }
      return
    }
  }
  else {
    if (!form.isFaceAuth) {
      uni.showToast({
        title: t('qing-xian-jin-hang-ren-lian-yan-zheng'),
        icon: 'none',
        duration: 2000,
      })
      return
    }
  }
  if (form.amount <= 3) {
    uni.showToast({
      title: t('ti-xian-jinebi-xu-da-yu-3usdt'),
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (!/^\d+$/.test(form.amount)) {
    uni.showToast({
      title: t('ti-xian-jinebi-zhi-yao-shi-zheng-shu'),
      icon: 'none',
      duration: 2000,
    })
    return
  }
  //
  // if (vipInfoData.value.serverNum > 0 && !form.payPwd) {
  //   uni.showToast({
  //     title: '请输入支付密码',
  //     icon: 'none',
  //     duration: 2000,
  //   })
  //   return
  // }
  // if (vipInfoData.value.serverNum === 0 && !form.isFaceAuth) {
  //   uni.showToast({
  //     title: '请先进行人脸验证',
  //     icon: 'none',
  //     duration: 2000,
  //   })
  //   return
  // }
  show.value = true
  return

  // try {

  // }
  // catch (error) {
  //   console.log('error :>> ', error)
  //   uni.hideLoading()
  //   uni.showToast({
  //     title: error.message || '提现申请失败',
  //     icon: 'none',
  //     duration: 2000,
  //   })
  //   return
  // }
}
async function applyWithdrawalDataConfirm() {
  show.value = false
  uni.showLoading({
    title: t('ti-xian-shen-qing-zhong'),
    zIndex: 20000,
  })
  const data = {
    address: form.address,
    amount: form.amount,
  }
  if (vipInfoData.value.serverNum === 0) {
    data.faceSessionId = useFaceStore().faceInfo?.sessionId
  }
  else {
    data.payPwd = md5(form.payPwd)
  }
  try {
    const applyRes = await applyWithdrawal(data)
    uni.showToast({
      title: t('ti-xian-shen-qing-cheng-gong-deng-dai-shen-he'),
      icon: 'none',
      duration: 2000,
    })
    // userStore().fetchUserInfo()
    await userStore.fetchUserInfo()
    form.isFaceAuth = false
    form.address = null
    form.amount = null

    console.log('applyRes :>> ', applyRes)
  }
  catch (error) {
    console.log('error :>> ', error)
    uni.hideLoading()
    uni.showToast({
      title: error.data.message || t('ti-xian-shen-qing-shi-bai'),
      icon: 'none',
      duration: 2000,
    })
    return
  }
  finally {
    uni.hideLoading()
  }
}
async function handleFaceAuth() {
  useFaceStore().setType(6)
  useFaceStore().setForm(form)
  handleToUrl('/pages/textface/index')
}
</script>

<template>
  <view class="p-[15px]">
    <div class="mb-[10px] text-[13px] font-bold">
      {{ $t("ti-xian-bi-zhong") }}
    </div>
    <div class="bg-default text-[13px] font-bold">
      USDT
    </div>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      {{ $t("ti-xian-wang-luo") }}
    </div>
    <div class="bg-default text-[13px] font-bold">
      TRON
    </div>
    <template v-if="vipInfoData.serverNum > 0">
      <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
        {{ $t("zhi-fu-mi-ma-0") }}
      </div>
      <div class="bg-default">
        <up-input
          v-model="form.payPwd"
          class="!p-[0]"
          type="password"
          :placeholder="$t('qing-shu-ru-zhi-fu-mi-ma')"
          border="surround"
        />
      </div>
    </template>
    <template v-else>
      <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
        {{ $t("ren-lian-yan-zheng-0") }}
      </div>
      <div class="bg-default" @click="handleFaceAuth">
        <view
          class="w-[30%] flex items-center border border-[#E2E2E2] rounded-[20px] border-solid bg-[#fff] px-[9px] py-[6px] shadow-blueGray"
        >
          <image
            v-if="!form.isFaceAuth"
            src="/static/login/face_s.png"
            class="h-[15px] w-[15px]"
            mode="scaleToFill"
          />
          <view
            v-if="!form.isFaceAuth"
            class="ml-[10px] text-[14px] text-[#94999A]"
          >
            {{ $t("wei-ren-zheng") }}
          </view>
          <image
            v-if="form.isFaceAuth"
            src="/static/login/face_s_a.png"
            class="h-[15px] w-[15px]"
            mode="scaleToFill"
          />
          <view v-if="form.isFaceAuth" class="ml-[10px] text-[14px]">
            {{ $t("yi-ren-zheng") }}
          </view>
        </view>
      </div>
    </template>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      {{ $t("ti-xian-di-zhi") }}
    </div>
    <div class="bg-default">
      <up-input
        v-model="form.address"
        class="!p-[0]"
        :placeholder="$t('qing-shu-ru-ti-xian-di-zhi')"
        border="surround"
      />
    </div>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      {{ $t("ti-xian-jin-e") }}
    </div>
    <div class="bg-default flex items-center justify-between">
      <up-input
        v-model="form.amount"
        class="!p-[0]"
        :placeholder="$t('zui-xiao-ti-xian-jine3usdt')"
        border="surround"
      >
        <template #suffix>
          USDT
        </template>
      </up-input>
      <!-- <div
        class="ml-[5px] border border-[#000] rounded-[5px] border-solid px-[5px] text-[14px] text-[#19A71D] font-bold"
        @click="form.amount = userInfo.usdtBalance"
      >
        MAX
      </div> -->
    </div>

    <div class="mt-[10px] flex items-center justify-between">
      <div class="text-[12px] text-[#94999A]">
        {{ $t("dang-qian-shou-xu-fei-bi-li") }}
        <span class="text-[#94999A]">
          {{
            Number(
              (vipInfoData.currentPremium - vipInfoData.decayedNum) * 100,
            ).toFixed(2)
          }}%</span>
      </div>
      <div class="text-[12px] text-[#94999A]">
        {{ $t("dang-qian-yue") }}
        <span class="text-[#94999A]">{{ formatAmount(userInfo.usdtBalance) }} USDT</span>
      </div>
    </div>
    <div class="mt-[20px] text-[13px] text-[#94999A]">
      <div class="mb-[10px] color-[#e53e3e]">
        {{ $t("ti-xian-shen-he-shi-jian-zai-9002100-nei") }}
      </div>
      <div class="mb-[10px]">
        {{
          $t(
            "qing-jin-xiang-gai-di-zhi-ti-xian-usdt-qi-ta-zi-chan-jiang-wu-fa-dao-zhang-qie-wu-fa-zhao-hui",
          )
        }}
      </div>
      <div class="mb-[10px]">
        {{
          $t(
            "ti-xian-wang-luo-xu-yu-mu-biao-ping-tai-wan-quan-yi-zhi-trontrc20-fou-ze-zi-chan-jiang-diu-shi",
          )
        }}
      </div>
      <div class="mb-[10px]">
        {{
          $t(
            "ti-xian-jinexu-da-yu-zui-xiao-ti-xianedu-di-yu-gaiedu-de-ti-xian-jiang-bu-hui-chu-li",
          )
        }}
      </div>
      <div class="mb-[10px]">
        {{
          $t(
            "ti-xian-shen-qing-ti-jiao-hou-qing-nai-xin-deng-dai-qu-kuai-lian-que-ren-dao-zhang-shi-jian-yi-wang-luo-qing-kuang-wei-zhun",
          )
        }}
      </div>
    </div>
    <div class="btn-block mt-[40px] h-[40px]" @click="applyWithdrawalData">
      {{ $t("que-ren") }}
    </div>

    <up-modal
      :show="show"
      show-cancel-button
      confirm-color="#000"
      style="z-index: 1000"
      @cancel="show = false"
      @confirm="applyWithdrawalDataConfirm"
    >
      <div class="flex flex-col items-center px-[20px] py-[10px]">
        <!-- 标题 -->
        <div class="mb-[12px] text-[16px] font-bold">
          {{ $t("ti-xian-que-ren") }}
        </div>

        <!-- 内容卡片 -->
        <div class="w-full rounded-[8px] bg-[#f7f7f7] p-[12px] space-y-[8px]">
          <div class="flex justify-between text-[14px]">
            <span class="text-[#666]">{{ $t("ti-xian-jin-e-0") }}</span>
            <span class="text-[#000] font-semibold">
              {{ formatAmount(form.amount) }} USDT
            </span>
          </div>

          <div class="flex justify-between text-[14px]">
            <span class="text-[#666]">{{ $t("dang-qian-shou-xu-fei") }}</span>
            <span class="text-[#e53e3e] font-semibold">
              {{
                formatAmount(
                  form.amount
                    * (vipInfoData.currentPremium - vipInfoData.decayedNum),
                )
              }}
              USDT
            </span>
          </div>

          <div class="flex justify-between text-[13px]">
            <span class="text-[#999]">{{ $t("shou-xu-fei-bi-li") }}</span>
            <span class="text-[#999]">
              {{
                Number(
                  (vipInfoData.currentPremium - vipInfoData.decayedNum) * 100,
                ).toFixed(2)
              }}%
            </span>
          </div>
        </div>

        <!-- 提示文案 -->
        <div
          class="mt-[10px] text-center text-[12px] text-[#999] leading-[18px]"
        >
          {{
            $t(
              "shi-ji-dao-zhang-jinejiang-kou-chu-dui-ying-shou-xu-fei-qing-que-ren-hou-ji-xu-cao-zuo",
            )
          }}
        </div>
      </div>
    </up-modal>
  </view>
</template>

<style lang="scss" scoped>
</style>
