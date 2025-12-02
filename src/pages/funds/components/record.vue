<template>
  <view>
    <z-paging ref="paging" v-model="dataList" use-page-scroll to-bottom-loading-more-enabled @query="queryList">
      <view v-for="(item, index) in dataList" :key="index">
        <view class="bg-default relative mb-[12px] flex items-end justify-between rounded-[10px]">
          <view class="">
            <view class="text-[14px] font-bold">
              {{ item.amount }} KDK
              <span class="mt-[5px] text-[12px] text-[#94999A]">
                ≈ {{ item.usdtAmount }} USDT
              </span>
            </view>
            <view class="mt-[8px] text-[12px] text-[#94999A]">
              {{ item.time }}
            </view>
          </view>
          <div
            class="absolute right-[0] top-[0] min-w-[120px] text-center text-[14px] text-[#fff]"
            :class="item.type === 1 ? 'bg2' : 'bg1'"
          >
            {{ item.type === 1 ? '买入' : '卖出' }}
          </div>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup>
const paging = ref(null)
// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
const dataList = ref([
])
onReachBottom(() => {
  // console.log('11 :>> ', 11)
  paging.value.doLoadMore()
})
// 暴露出去，方便父组件调用
function doLoadMore() {
}
// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
function queryList(pageNo, pageSize) {
  setTimeout(() => {
    let data = []
    for (let i = 0; i < pageSize; i++) {
      data.push({
        amount: '100',
        usdtAmount: '100',
        time: '2023-01-01 12:00:00',
        type: 1,
      })
    }
    paging.value.complete(data)
  }, 1000)
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
defineExpose({
  doLoadMore,
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
