<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { applyWithdrawal, getVipInfo } from '@/api/index'
import { useUserStore } from '@/store'
import { formatAmount, handleCopy } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const form = reactive({
  amount: null,
  address: null,
})
const show = ref(false)
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const vipInfoData = ref({})
onMounted(async () => {
  // const vipInfoData = ref({})
  const vipInfoRes = await getVipInfo()
  vipInfoData.value = vipInfoRes
})
async function applyWithdrawalData() {
  if (!form.address || !form.amount) {
    uni.showToast({
      title: '请输入提现地址和金额',
      icon: 'none',
      duration: 2000,
    })
    return
  }
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
    title: '提现申请中',
    zIndex: 20000,
  })
  try {
    const applyRes = await applyWithdrawal(form)
    uni.showToast({
      title: '提现申请成功,等待审核',
      icon: 'none',
      duration: 2000,
    })
    // userStore().fetchUserInfo()
    await userStore.fetchUserInfo()
    form.address = null
    form.amount = null

    console.log('applyRes :>> ', applyRes)
  }
  catch (error) {
    console.log('error :>> ', error)
    uni.hideLoading()
    uni.showToast({
      title: error.data.message || '提现申请失败',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  finally {
    uni.hideLoading()
  }
}
</script>

<template>
  <view class="p-[15px]">
    <div class="mb-[10px] text-[13px] font-bold">
      提现币种
    </div>
    <div class="bg-default text-[13px] font-bold">
      USDT
    </div>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      提现网络
    </div>
    <div class="bg-default text-[13px] font-bold">
      TRON
    </div>

    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      提现地址
    </div>
    <div class="bg-default">
      <up-input
        v-model="form.address"
        class="!p-[0]"
        placeholder="请输入提现地址"
        border="surround"
      />
    </div>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      提现金额
    </div>
    <div class="bg-default flex items-center justify-between">
      <up-input
        v-model="form.amount"
        class="!p-[0]"
        placeholder="请输入提现金额"
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
        当前手续费比例:
        <span class="text-[#94999A]">
          {{
            Number(
              (vipInfoData.currentPremium - vipInfoData.decayedNum) * 100,
            ).toFixed(2)
          }}%</span>
      </div>
      <div class="text-[12px] text-[#94999A]">
        当前余额:
        <span class="text-[#94999A]">{{ formatAmount(userInfo.usdtBalance) }} USDT</span>
      </div>
    </div>
    <div class="mt-[20px] text-[13px] text-[#94999A]">
      <div class="mb-[10px]">
        *请仅向该地址提现 USDT，其他资产将无法到账且无法找回
      </div>
      <div class="mb-[10px]">
        *提现网络需与目标平台完全一致（TRON/TRC20），否则资产将丢失
      </div>
      <div class="mb-[10px]">
        *提现金额需大于最小提现额度，低于该额度的提现将不会处理
      </div>
      <div class="mb-[10px]">
        *提现申请提交后，请耐心等待区块链确认，到账时间以网络情况为准
      </div>
    </div>
    <div class="btn-block mt-[40px] h-[40px]" @click="applyWithdrawalData">
      确认
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
          提现确认
        </div>

        <!-- 内容卡片 -->
        <div class="w-full rounded-[8px] bg-[#f7f7f7] p-[12px] space-y-[8px]">
          <div class="flex justify-between text-[14px]">
            <span class="text-[#666]">提现金额</span>
            <span class="text-[#000] font-semibold">
              {{ formatAmount(form.amount) }} USDT
            </span>
          </div>

          <div class="flex justify-between text-[14px]">
            <span class="text-[#666]">当前手续费</span>
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
            <span class="text-[#999]">手续费比例</span>
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
          实际到账金额将扣除对应手续费，请确认后继续操作
        </div>
      </div>
    </up-modal>
  </view>
</template>

<style lang="scss" scoped>
</style>
