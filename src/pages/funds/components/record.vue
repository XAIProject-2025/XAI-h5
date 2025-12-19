<template>
  <view>
    <z-paging
      ref="paging"
      v-model="dataList"
      use-page-scroll
      to-bottom-loading-more-enabled
      :refresher-enabled="false"
      @query="queryList"
    >
      <view v-for="(item, index) in dataList" :key="index">
        <view
          class="bg-default relative mb-[12px] flex items-end justify-between rounded-[10px]"
        >
          <view class="">
            <view class="text-[14px] font-bold">
              {{ formatAmount(item.amount) }}
              {{ item.currencyType === 0 ? "Xcoin" : "USDT" }}
              <span
                v-if="item.currencyType === 0"
                class="mt-[5px] text-[12px] text-[#94999A]"
              >
                ≈ {{ formatAmount(Math.abs(item.amountUsdt)) }} USDT
              </span>
            </view>
            <view class="mt-[8px] text-[12px] text-[#94999A]">
              {{ item.createTime }}
            </view>
          </view>
          <div v-if="item.type === 8" class="text-[12px] text-[#94999A]">
            拒绝原因:{{ item.remark }}
          </div>
          <div
            v-if="item.type !== 9"
            :class="{
              'status-green': item.amount > 0,
              'status-red': item.amount <= 0,
            }"
            class="absolute right-[0] top-[0] min-w-[120px] text-center text-[12px] text-[#fff]"
          >
            <!-- :class="item.type === 1 ? 'bg2' : 'bg1'" -->

            {{ getRecordType(item.type).name }}
            <!-- {{ item.type === 1 ? '买入' : '卖出' }} -->
          </div>
          <div
            v-if="item.type === 9"
            class="status-green absolute right-[0] top-[0] min-w-[120px] text-center text-[12px] text-[#fff]"
          >
            <!-- :class="item.type === 1 ? 'bg2' : 'bg1'" -->

            {{ getRecordType(item.type).name }}
            <!-- {{ item.type === 1 ? '买入' : '卖出' }} -->
          </div>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup>
import { getBalanceLogs } from '@/api/funds'
import { formatAmount, getRecordType } from '@/utils/util'

const props = defineProps({
  tab: {
    type: Number,
    default: 0,
  },
  tokenPrice: {
    type: Number,
    default: 0,
  },
})
const paging = ref(null)
// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
const dataList = ref([])
onReachBottom(() => {
  // console.log('11 :>> ', 11)
  paging.value.doLoadMore()
})
// 暴露出去，方便父组件调用
function doLoadMore() {
}
// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
async function queryList(pageNo, pageSize) {
  const data = {
    page: pageNo,
    size: pageSize,
    currencyType: props.tab,
  }
  if (props.tab == -1) {
    delete data.currencyType
  }
  try {
    const getBalanceLogsRes = await getBalanceLogs(data)
    console.log('getBalanceLogsRes :>> ', getBalanceLogsRes)
    paging.value.complete(getBalanceLogsRes.content)
  }
  catch (err) {
    console.log('err :>> ', err)
    paging.value.complete(false)
  }
  // 此处请求仅为演示，请替换为自己项目中的请求
  // request.queryList({ pageNo, pageSize }).then((res) => {
  //   // 将请求结果通过complete传给z-paging处理，同时也代表请求结束，这一行必须调用
  // paging.value.complete(res.data.list)
  // }).catch((res) => {
  //   // 如果请求失败写paging.value.complete(false);
  //   // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
  //   // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
  //   paging.value.complete(false)
  // })
}
// 暴露方法外部调用刷新数据
function reload() {
  // paging.value.reload()
  paging.value.reload()
}
// 暴露方法外部调用刷新数据
defineExpose({
  doLoadMore,
  reload,
})
</script>

<style lang="scss" scoped>
//
.bg {
  background: url('/static/images/status_black.png');
  background-size: 100% 100%;
}

.bg1 {
  background: url('/static/images/status_red.png');
  background-size: 100% 100%;
}

.bg2 {
  background: url('/static/images/status2.png');
  background-size: 100% 100%;
}
</style>
