<script lang="ts" setup>
import { getDepositWallets } from '@/api/index'
import { formatAmount, handleCopy } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const depositWallets = ref({})
onMounted(async () => {
  const getDepositWalletsRes = await getDepositWallets()
  depositWallets.value = getDepositWalletsRes[0]
  console.log('depositWallets :>> ', depositWallets)
  // getDepositWallets({
  //   chain: 'TRON',
  // }).then((res) => {
  //   if (res.code === 0) {
  //     console.log(res)
  //   }
  // })
})
</script>

<template>
  <view class="p-[15px]">
    <div class="mb-[10px] text-[13px] font-bold">
      充值币种
    </div>
    <div class="bg-default text-[13px] font-bold">
      USDT
    </div>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      充值网络
    </div>
    <div class="bg-default text-[13px] font-bold">
      TRON
    </div>
    <div class="item-center mt-[20px] flex justify-center">
      <up-qrcode cid="ex2" :size="200" val="uview-plus" />
    </div>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      充值地址
    </div>
    <div
      class="bg-default box-border w-full flex items-center justify-center text-[13px] font-bold"
    >
      <!-- 核心新增：break-all / break-words -->
      <div class="w-[70%] whitespace-normal break-all">
        {{ depositWallets.address }}
      </div>
      <div
        class="flex flex-1 items-center justify-center text-[13px] text-[#19A71D]"
        @click="handleCopy(depositWallets.address)"
      >
        复制
      </div>
    </div>
    <div class="mt-[20px] text-[13px] text-[#94999A]">
      <div class="mb-[10px]">
        *您只能将USDT存入该地址，其他资产将无法到账
      </div>
      <div class="mb-[10px]">
        *请选择与提现平台一致的网络充值，否则充值无法到帐
      </div>
      <div class="mb-[10px]">
        *充值请勿低于最小充值额，否则将不会上账且不可退回
      </div>
    </div>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
