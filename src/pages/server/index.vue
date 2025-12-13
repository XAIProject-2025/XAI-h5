<script lang="ts" setup>
import { buyServer, getServerList } from '@/api/server'
import { formatAmount } from '@/utils/util'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const showDetail = ref(false)
const serverList = ref([])
const buttonLoading = ref(false)
onMounted(async () => {
  uni.showLoading({
    title: '加载中...',
  })
  await getServerListData()
  uni.hideLoading()
})
async function getServerListData() {
  const serverListRes = await getServerList()
  serverList.value = serverListRes || []
}
const currentItem = ref({})
// 购买算力服务器
async function buyServerCon(item) {
  console.log('item :>> ', item)
  console.log('uni :>> ', uni)
  if (buttonLoading.value) {
    return
  }
  try {
    buttonLoading.value = true
    const buyRes = await buyServer({
      serverId: item.id,
    })
    uni.showToast({
      title: '购买成功',
      icon: 'success',
      mask: true,
    })
    await getServerListData()
    showDetail.value = false
  }
  catch (error) {
    console.log('error :>> ', error)
    uni.showToast({
      title: error.data.message || '购买失败',
      icon: 'none',

    })
  }
  finally {
    buttonLoading.value = false
  }
  // uni.hideLoading()
}
</script>

<template>
  <view class="flex flex-wrap justify-between p-[15px]">
    <view
      v-for="(item, index) in serverList" :key="index"
      class="relative mb-[20px] w-[48%] border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb]"
    >
      <view class="bg absolute right-[0px] top-[0px] z-[100] w-[70%] py-[4px] text-center text-[12px] text-[#fff]">
        算力服务器
      </view>
      <u-image :src="item.imgUrl" width="100%" height="173" radius="8px" alt="" />
      <view class="px-[15px] py-[10px] text-[14px]">
        <view class="font-bold">
          {{ item.serverName }}
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          每日 {{ item.dayEarnings }} (KDK)
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          每月 {{ item.dayEarnings * 30 }} (KDK)
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          算力值 {{ item.fixedPower }}
        </view>

        <view class="mt-[10px] flex items-center justify-center">
          <view class="mr-[8px] text-[18px] text-[#D73A3C] font-bold">
            {{ formatAmount(item.fixedPrice) }}
          </view>
          <view class="text-[12px] text-[#94999A]">
            库存 :{{ item.stock }}
          </view>
        </view>
      </view>
      <view
        class="btn-block mx-auto mb-[5px] h-[30px] min-h-[30px] w-[70%]"
        @click="currentItem = item; showDetail = true;"
      >
        立即购买
      </view>
      <view
        class="flex items-center justify-center rounded-b-[8px] px-[4px] py-[6px] text-center text-[10px] text-[#000]"
      >
        <up-icon name="info-circle" size="12px" color="#000" />
        <view class="ml-[4px]">
          说明:所有服务器可以提前赎回
        </view>
      </view>
    </view>
    <confirm
      :show="showDetail" :button-loading="buttonLoading" @close="showDetail = false"
      @confirm="buyServerCon(currentItem)"
    >
      <div class="flex flex-col items-center p-[20px]">
        <u-image :src="currentItem.imgUrl" width="170" height="170" radius="8px" alt="" />
        <view class="px-[15px] py-[10px] text-[14px]">
          <view class="text-center font-bold">
            {{ currentItem.serverName }}
          </view>
          <view class="mt-[5px] text-center text-[12px] text-[#94999A]">
            每日 {{ currentItem.dayEarnings }} (KDK)
          </view>
          <view class="mt-[5px] text-center text-[12px] text-[#94999A]">
            每月 {{ currentItem.dayEarnings * 30 }} (KDK)
          </view>
          <view class="mt-[5px] text-center text-[12px] text-[#94999A]">
            算力值 {{ currentItem.fixedPower }}
          </view>

          <view class="mt-[5px] flex items-center justify-center">
            <view class="mr-[8px] text-[18px] text-[#D73A3C] font-bold">
              {{ formatAmount(currentItem.fixedPrice) }}
            </view>
            <view class="text-[12px] text-[#94999A]">
              库存 :{{ currentItem.stock }}
            </view>
          </view>
        </view>
      </div>
    </confirm>
  </view>
</template>

<style lang="scss" scoped>
//
.bg {
  background: url('/static/server/card_top_bg.png');
  background-size: 100% 100%;
}
</style>
