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
      {{ $t("chong-zhi-bi-zhong") }}
    </div>
    <div class="bg-default text-[13px] font-bold">
      USDT
    </div>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      {{ $t("chong-zhi-wang-luo") }}
    </div>
    <div class="bg-default text-[13px] font-bold">
      TRON
    </div>
    <div class="item-center mt-[20px] flex justify-center">
      <up-qrcode cid="ex2" :size="200" val="uview-plus" />
    </div>
    <div class="mb-[10px] mt-[10px] text-[13px] font-bold">
      {{ $t("chong-zhi-di-zhi") }}
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
        {{ $t("fu-zhi") }}
      </div>
    </div>
    <div class="mt-[20px] text-[13px] text-[#94999A]">
      <div class="mb-[10px]">
        {{
          $t(
            "nin-zhi-neng-jiang-usdt-cun-ru-gai-di-zhi-qi-ta-zi-chan-jiang-wu-fa-dao-zhang",
          )
        }}
      </div>
      <div class="mb-[10px]">
        {{
          $t(
            "qing-xuan-ze-yu-ti-xian-ping-tai-yi-zhi-de-wang-luo-chong-zhi-fou-ze-chong-zhi-wu-fa-dao-zhang",
          )
        }}
      </div>
      <div class="mb-[10px]">
        {{
          $t(
            "chong-zhi-qing-wu-di-yu-zui-xiao-chong-zhie-fou-ze-jiang-bu-hui-shang-zhang-qie-bu-ke-tui-hui",
          )
        }}
      </div>
    </div>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
