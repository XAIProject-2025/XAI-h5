<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { buyServer, getServerList } from '@/api/server'
import { useUserStore } from '@/store'
import { formatAmount } from '@/utils/util'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const showDetail = ref(false)
const serverList = ref([])
const buttonLoading = ref(false)
const dynamicAmount = ref(null)
const dynamicData = reactive({
  amount: null, // 输入金额
  income: null, // 预估收益
  power: null, // 算力
})
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
  if (item.type === 1) {
    await buyType1(item)
  }
  else {
    await buyType2(item)
  }
  // uni.hideLoading()
}
async function buyType1(item) {
  if (buttonLoading.value) {
    return
  }
  if (userInfo.value.kdkBalance < item.fixedPrice) {
    uni.showToast({
      title: '余额不足,请购买算力',
      icon: 'none',
      mask: true,
    })
    return
  }
  if (userInfo.value.roleId === 1) {
    uni.showToast({
      title: '当前用户未激活,请联系客服激活',
      icon: 'none',
      mask: true,
    })
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
    await userStore.fetchUserInfo()
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
}
async function buyType2(item) {
  if (buttonLoading.value) {
    return
  }
  if (userInfo.value.kdkBalance < item.fixedPrice) {
    uni.showToast({
      title: '余额不足,请购买算力',
      icon: 'none',
      mask: true,
    })
    return
  }
  if (userInfo.value.roleId === 1) {
    uni.showToast({
      title: '当前用户未激活,请联系客服激活',
      icon: 'none',
      mask: true,
    })
    return
  }
  if (Number(dynamicData.amount) < item.dynamicMin) {
    uni.showToast({
      title: `动态购买金额不能小于${item.dynamicMin}Xcoin`,
      icon: 'none',
      mask: true,
    })
    return
  }
  if (Number(dynamicData.amount) > item.dynamicMax) {
    uni.showToast({
      title: `动态购买金额不能大于${item.dynamicMax}Xcoin`,
      icon: 'none',
      mask: true,
    })
    return
  }
  try {
    buttonLoading.value = true
    const buyRes = await buyServer({
      serverId: item.id,
      price: dynamicData.amount,
    })
    uni.showToast({
      title: '购买成功',
      icon: 'success',
      mask: true,
    })
    await getServerListData()
    await userStore.fetchUserInfo()
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
}
function changeDynamicIncome(e) {
  console.log('e :>> ', e)
  console.log('object :>> ', currentItem.value)
  console.log('dynamicData.amount :>> ', dynamicData.amount)
  console.log('dynamicData.amount :>> ', currentItem.value.dynamicMin)
  if (Number(e) < Number(currentItem.value.dynamicMin)) {
    dynamicData.income = 0
    dynamicData.power = 0
    return
  }
  dynamicData.income = formatAmount(Number(e) * currentItem.value.priceRate, 2)
  dynamicData.power = formatAmount(Number(e) * currentItem.value.powerRate, 0)
}
</script>

<template>
  <view class="flex flex-wrap justify-between gap-[10px] p-[15px]">
    <view
      v-for="(item, index) in serverList"
      :key="index"
      class="relative mb-[20px] w-[48%] border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb]"
    >
      <div
        class="absolute right-[0px] top-[0px] z-[100] w-[70%] py-[4px] text-center text-[12px] text-[#fff]"
        :class="{ 'bg': item.type === 1, 'status-green': item.type === 2 }"
      >
        {{ item.type === 1 ? "算力服务器" : "动态服务器" }}
      </div>
      <u-image
        :src="item.imgUrl"
        width="100%"
        height="173"
        radius="8px"
        alt=""
      />
      <view v-if="item.type === 1" class="px-[15px] pt-[10px] text-[14px]">
        <view class="font-bold">
          {{ item.serverName }}
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          每日 {{ formatAmount(item.fixedPrice * item.priceRate) }} (Xcoin)
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          每月 {{ formatAmount(item.fixedPrice * item.priceRate * 30) }} (Xcoin)
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          算力值 {{ item.fixedPower }}
        </view>
        <!-- <view class="mt-[5px] text-[12px] text-[#94999A]">
          收利率 {{ item.priceRate * 100 }}%
        </view> -->
        <view class="mb-[12px] mt-[15px] flex flex-col justify-center">
          <view class="text-[16px] text-[#D73A3C] font-bold">
            {{ formatAmount(item.fixedPrice) }} Xcoin
          </view>
          <view class="mt-[5px] text-[12px] text-[#94999A]">
            库存 :{{ item.stock }}
          </view>
        </view>
      </view>

      <view v-if="item.type === 2" class="px-[15px] py-[10px] text-[14px]">
        <view class="font-bold">
          {{ item.serverName }}
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          购买下限 {{ item.dynamicMin }} (Xcoin)
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          购买上限 {{ item.dynamicMax }} (Xcoin)
        </view>

        <view class="mt-[5px] text-[12px] text-[#94999A]">
          算力值 {{ item.fixedPower }}
        </view>
        <view class="mt-[5px]">
          <view class="mr-[8px] text-[12px] text-[#D73A3C] font-bold">
            <div class="">
              购买:{{ item.dynamicMax }} Xcoin
            </div>
            <div class="">
              收益:{{ item.dynamicMax * item.priceRate }} Xcoin
            </div>
          </view>
          <view class="mt-[5px] text-[12px] text-[#94999A]">
            库存 :{{ item.stock }}
          </view>
        </view>
      </view>
      <view
        class="btn-block mx-auto mb-[5px] h-[30px] min-h-[30px] w-[70%]"
        @click="
          currentItem = item;
          showDetail = true;
        "
      >
        立即购买
      </view>
      <view
        class="flex items-end items-center justify-center rounded-b-[8px] px-[4px] py-[6px] text-center text-[10px] text-[#000]"
      >
        <up-icon name="info-circle" size="12px" color="#000" />
        <view class="ml-[4px]">
          说明:所有服务器可以提前赎回
        </view>
      </view>
    </view>
    <confirm
      :show="showDetail"
      :button-loading="buttonLoading"
      :height="currentItem.type === 1 ? '420px' : '530px'"
      @close="showDetail = false"
      @confirm="buyServerCon(currentItem)"
    >
      <div class="flex flex-col items-center p-[20px]">
        <u-image
          :src="currentItem.imgUrl"
          width="170"
          height="170"
          radius="8px"
          alt=""
        />
        <view
          v-if="currentItem.type === 1"
          class="px-[15px] py-[10px] text-[14px]"
        >
          <view class="text-center font-bold">
            {{ currentItem.serverName }}
          </view>
          <view class="mt-[5px] text-center text-[12px] text-[#94999A]">
            每日
            {{ formatAmount(currentItem.fixedPrice * currentItem.priceRate) }}
            (Xcoin)
          </view>
          <view class="mt-[5px] text-center text-[12px] text-[#94999A]">
            每月
            {{
              formatAmount(currentItem.fixedPrice * currentItem.priceRate * 30)
            }}
            (Xcoin)
          </view>
          <view class="mt-[5px] text-center text-[12px] text-[#94999A]">
            算力值 {{ currentItem.fixedPower }}
          </view>
          <view class="mt-[5px] text-center text-[12px] text-[#94999A]">
            库存 :{{ currentItem.stock }}
          </view>

          <view class="mt-[5px] flex items-center justify-center">
            <view class="mr-[8px] text-[18px] text-[#D73A3C] font-bold">
              {{ formatAmount(currentItem.fixedPrice) }} Xcoin
            </view>
          </view>
        </view>

        <view
          v-if="currentItem.type === 2"
          class="w-full py-[10px] text-[14px]"
        >
          <view class="text-center font-bold">
            {{ currentItem.serverName }}
          </view>
          <div class="mt-[10px] flex items-center justify-center">
            <view class="mt-[5px] w-1/2 text-[12px] text-[#94999A]">
              购买下限 {{ currentItem.dynamicMin }} (Xcoin)
            </view>
            <view class="mt-[5px] w-1/2 text-[12px] text-[#94999A]">
              购买上限 {{ currentItem.dynamicMax }} (Xcoin)
            </view>
          </div>
          <div class="mt-[5px] flex items-center justify-center">
            <view class="mt-[5px] w-1/2 text-[12px] text-[#94999A]">
              算力值 {{ currentItem.fixedPower }}
            </view>
            <view class="mt-[5px] w-1/2 text-[12px] text-[#94999A]">
              库存 :{{ currentItem.stock }}
            </view>
          </div>
          <view
            class="mt-[5px] flex items-center text-[12px] text-[#D73A3C] font-bold"
          >
            <view class="mt-[5px] w-1/2 text-[12px]">
              购买:{{ currentItem.dynamicMax }} Xcoin
            </view>
            <view class="mt-[5px] w-1/2 text-[12px]">
              收益:{{ currentItem.dynamicMax * currentItem.priceRate }}
              Xcoin
            </view>
          </view>
          <div class="mt-[10px] text-[12px] text-[#94999A]">
            购买金额
          </div>
          <div class="bg-default mt-[10px]">
            <up-input
              v-model="dynamicData.amount"
              class="!p-[0]"
              placeholder="请输入购买金额"
              border="surround"
              type="number"
              @change="changeDynamicIncome"
            >
              <template #suffix>
                Xcoin
              </template>
            </up-input>
          </div>
          <div class="mt-[20px]">
            <div class="mt-[5px] text-[12px] text-[#94999A]">
              预估收益: {{ dynamicData.income || 0 }} Xcoin
            </div>
          </div>
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
