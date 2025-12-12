<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { exchange } from '@/api/exchange'
import { getBalanceRate } from '@/api/funds'
import { useUserStore } from '@/store'
import { formatAmount } from '@/utils/util'

const props = defineProps({
  tokenPrice: {
    type: Number,
    default: 0,
  },
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const dateRange = ref(
  {
    current: 1,
    list: [
      { key: 1, name: '1D' },
      { key: 2, name: '7D' },
      { key: 3, name: '30D' },
    ],
  },
)

const typeRange = ref(
  {
    current: 1,
    list: [
      { key: 1, name: '买入' },
      { key: 2, name: '卖出' },
    ],
  },
)
const straightOption = ref({
  title: {
    textStyle: {
      fontSize: 16,
      color: '#333',
    },
  },
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月', '五月', '六月'],
    axisLabel: {
      rotate: 45,
    },
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      show: true,
    },
  },
  series: [
    {
      type: 'line',
      data: [120, 132, 101, 134, 90, 230],
      color: '#000',
      smooth: true, // 直线模式
      lineStyle: {
        width: 2,
      },
      label: {
        show: true, // 显示标签
        color: '#666',
        position: 'top', // 标签的位置，可以是 'top', 'bottom', 'left', 'right' 等
      },
    },
  ],
})
const form = reactive({
  amount: '',
  amountPay: null,
})
function change(e) {
  if (typeRange.value.current == 1) {
    form.amountPay = Number(e) * props.tokenPrice
  }
  else {
    form.amountPay = Number(e) * props.tokenPrice
  }
}
async function handleBuy(type) {
  console.log('userInfo :>> ', userInfo)
  if (type == 1) {
    if (Number(form.amount) > Number(userInfo.value.usdtBalance)) {
      uni.showToast({
        title: 'USDT余额不足',
        icon: 'none',
      })
      return
    }
  }
  if (type == 2) {
    if (Number(form.amount) > Number(userInfo.value.kdkBalance)) {
      uni.showToast({
        title: 'KDK余额不足',
        icon: 'none',
      })
      return
    }
  }
  if (!form.amount) {
    uni.showToast({
      title: '请输入金额',
      icon: 'none',
    })
    return
  }
  const { confirm } = await uni.showModal({
    title: '提示',
    content: '确认兑换吗?',
    confirmColor: '#000',
  })
  if (!confirm) {
    return
  }
  uni.showLoading()
  const exchangeRes = await exchange({
    exchangeType: type,
    amount: type == 1 ? form.amountPay : form.amount,
  })

  form.amount = ''
  form.amountPay = null
  await userStore.fetchUserInfo()
  uni.showToast({
    title: '兑换成功',
    icon: 'none',
  })
}
onMounted(async () => {

})
</script>

<template>
  <view>
    <view class="bg-default">
      <!-- 11 -->
      <view class="flex items-center justify-center text-[16px] font-bold">
        算力币价格趋势
      </view>
      <view class="mb-[20px] mt-[20px] flex items-center">
        <div
          v-for="item in dateRange.list" :key="item.key" :class="{
            'btn-block': item.key === dateRange.current,
            'btn-block--white': item.key !== dateRange.current,
          }" class="ml-[10px] h-[20px] min-h-[20px] rounded-[5px] px-[8px] text-center"
          @click="dateRange.current = item.key"
        >
          {{ item.name }}
        </div>
      </view>

      <ly-charts-line ref="straightChart" :option="straightOption" width="100%" height="260px" />
      <view class="mt-[20px] flex items-center justify-between">
        <view class="w-1/4 flex flex-col items-center justify-center">
          <view class="text-[18px] font-bold">
            {{ formatAmount(tokenPrice) }}
          </view>
          <view class="mt-[5px] text-[14px] text-[#999]">
            当前价格
          </view>
        </view>
        <view class="w-1/4 flex flex-col items-center justify-center">
          <view class="text-[18px] font-bold">
            {{ formatAmount(10000) }}
          </view>
          <view class="mt-[5px] text-[14px] text-[#999]">
            24小时涨幅
          </view>
        </view>
        <view class="w-1/4 flex flex-col items-center justify-center">
          <view class="text-[18px] font-bold">
            {{ formatAmount(10000) }}
          </view>
          <view class="mt-[5px] text-[14px] text-[#999]">
            24小时最高
          </view>
        </view>
        <view class="w-1/4 flex flex-col items-center justify-center">
          <view class="text-[18px] font-bold">
            {{ formatAmount(10000) }}
          </view>
          <view class="mt-[5px] text-[14px] text-[#999]">
            24小时最低
          </view>
        </view>
      </view>
    </view>
    <view class="bg-default mt-[20px]">
      <view class="mb-[10px] flex items-center">
        <div
          v-for="item in typeRange.list" :key="item.key" :class="{
            'btn-block': item.key === typeRange.current,
            'btn-block--white': item.key !== typeRange.current,
          }" class="ml-[10px] h-[25px] min-h-[25px] rounded-[5px] px-[20px] text-center"
          @click="typeRange.current = item.key"
        >
          {{ item.name }}
        </div>
      </view>
      <view class="mt-[15px]">
        <view class="text-[14px] text-[#94999A]">
          价格
        </view>
        <view class="mt-[10px] rounded-[5px] bg-[#f1f1f1] px-[10px] py-[10px]">
          {{ formatAmount(tokenPrice) }}
        </view>
      </view>
      <view class="mt-[15px]">
        <view class="text-[14px] text-[#94999A]">
          数量(算力币)
        </view>
        <view class="mt-[10px] rounded-[5px] bg-[#f1f1f1] px-[10px] py-[10px]">
          <up-input v-model="form.amount" class="!p-[0]" placeholder="请输入数量" border="surround" @change="change" />
        </view>
      </view>
      <view class="mt-[15px]">
        <view class="text-[14px] text-[#94999A]">
          <span v-if="typeRange.current === 1">支付金额(USD)</span>
          <span v-else>接收金额(USDT)</span>
        </view>
        <view class="mt-[10px] rounded-[5px] bg-[#f1f1f1] px-[10px] py-[10px]">
          {{ formatAmount(form.amountPay) }}
        </view>
      </view>
      <view class="btn-block mt-[20px] h-[40px]">
        <span v-if="typeRange.current === 1" @click="handleBuy(1)">买入算力币</span>
        <span v-else @click="handleBuy(2)">卖出算力币</span>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
