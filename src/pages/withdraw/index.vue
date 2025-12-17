<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getVipInfo } from '@/api/index'
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

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const vipInfoData = ref({})
onMounted(async () => {
  // const vipInfoData = ref({})
  const vipInfoRes = await getVipInfo()
  vipInfoData.value = vipInfoRes
})
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
        <span class="text-[#94999A]">{{ vipInfoData.currentPremium }}</span>
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
    <div class="btn-block mt-[40px] h-[40px]">
      确认
    </div>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
