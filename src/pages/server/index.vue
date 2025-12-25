<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getVipInfo } from '@/api/index'
import { buyServer, getServerList } from '@/api/server'
import { t } from '@/locale/index'
import { useUserStore } from '@/store'
import { formatAmount } from '@/utils/util'

const vipInfoData = ref({})

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
    title: t('jia-zai-zhong'),
  })
  await getServerListData()
  const vipInfoRes = await getVipInfo()
  vipInfoData.value = vipInfoRes || {}

  uni.hideLoading()
})
async function getServerListData() {
  const serverListRes = await getServerList()
  serverList.value = serverListRes || []
}
const currentItem = ref({})
// 租赁算力服务器
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
      title: t('yuebu-zu-qing-dui-huan-xcoin'),
      icon: 'none',
      mask: true,
    })
    return
  }
  if (userInfo.value.roleId === 1) {
    uni.showToast({
      title: t('dang-qian-yong-hu-wei-ji-huo-qing-lian-xi-ke-fu-ji-huo'),
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
      title: t('zu-lin-cheng-gong'),
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
      title: error.data.message || t('zu-lin-shi-bai'),
      icon: 'none',
    })
  }
  finally {
    buttonLoading.value = false
  }
}
async function buyType2(item) {
  console.log('item1111 :>> ', item)
  if (buttonLoading.value) {
    return
  }
  if (userInfo.value.kdkBalance < dynamicData.amount) {
    uni.showToast({
      title: t('yuebu-zu-qing-dui-huan-xcoin'),
      icon: 'none',
      mask: true,
    })
    return
  }

  if (userInfo.value.roleId === 1 && item.type != 4) {
    uni.showToast({
      title: t('dang-qian-yong-hu-wei-ji-huo-qing-lian-xi-ke-fu-ji-huo'),
      icon: 'none',
      mask: true,
    })
    return
  }
  if (Number(dynamicData.amount) < item.dynamicMin) {
    uni.showToast({
      title: `${t('dong-tai-zu-lin-jinebu-neng-xiao-yu')}${item.dynamicMin}Xcoin`,
      icon: 'none',
      mask: true,
    })
    return
  }
  if (Number(dynamicData.amount) > item.dynamicMax) {
    uni.showToast({
      title: `${t('dong-tai-zu-lin-jinebu-neng-da-yu')}${item.dynamicMax}Xcoin`,
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
      title: t('zu-lin-cheng-gong'),
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
      title: error.data.message || t('zu-lin-shi-bai'),
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
        :class="{
          'bg': item.type % 2 === 1,
          'status-green': item.type % 2 === 0,
        }"
      >
        {{ item.serverName }}
      </div>
      <u-image
        :src="item.imgUrl"
        width="100%"
        height="173"
        radius="8px"
        alt=""
      />
      <view
        v-if="item.type === 1 || item.type === 4"
        class="px-[15px] pt-[10px] text-[14px]"
      >
        <view class="font-bold">
          {{ item.serverName }}
        </view>
        <view
          v-if="item.type === 1"
          class="mt-[5px] text-[12px] text-[#94999A]"
        >
          <span>{{ $t("mei-ri") }}</span>
          {{ formatAmount(item.fixedPrice * item.priceRate) }} (Xcoin)
        </view>
        <view
          v-if="item.type === 4"
          class="mt-[5px] text-[12px] text-[#94999A]"
        >
          <span>{{ $t("mei-ri") }}</span>
          {{ formatAmount(1 * item.priceRate) }} (Xcoin)
        </view>
        <view
          v-if="item.type === 1"
          class="mt-[5px] text-[12px] text-[#94999A]"
        >
          <span>{{ $t("mei-yue") }}</span>
          {{ formatAmount(item.fixedPrice * item.priceRate * 30) }} (Xcoin)
        </view>
        <view
          v-if="item.type === 4"
          class="mt-[5px] text-[12px] text-[#94999A]"
        >
          <span>{{ $t("mei-yue") }}</span>
          {{ formatAmount(1 * item.priceRate * 30) }} (Xcoin)
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          <span>{{ $t("suan-li-zhi") }}</span> {{ item.fixedPower }}
        </view>
        <!-- <view class="mt-[5px] text-[12px] text-[#94999A]">
          收利率 {{ item.priceRate * 100 }}%
        </view> -->
        <view class="mb-[12px] mt-[15px] flex flex-col justify-center">
          <view class="text-[16px] text-[#D73A3C] font-bold">
            {{ formatAmount(item.fixedPrice) }} Xcoin
          </view>
          <view
            v-if="item.type === 1"
            class="mt-[5px] text-[12px] text-[#94999A]"
          >
            <span>{{ $t("ku-cun") }}</span> :{{ item.stock }}
          </view>
          <view
            v-if="item.type === 4"
            class="mt-[5px] text-[12px] text-[#94999A]"
          >
            <span>{{ $t("xian-gou") }}</span> :{{ item.buyLimit }}
          </view>
        </view>
      </view>

      <view v-if="item.type === 2" class="px-[15px] py-[10px] text-[14px]">
        <view class="font-bold">
          {{ item.serverName }}
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          <span>{{ $t("zu-lin-xia-xian") }}</span> {{ item.dynamicMin }} (Xcoin)
        </view>
        <view class="mt-[5px] text-[12px] text-[#94999A]">
          <span>{{ $t("zu-lin-shang-xian") }}</span>
          {{ item.dynamicMax }} (Xcoin)
        </view>

        <view class="mt-[5px] text-[12px] text-[#94999A]">
          <span>{{ $t("suan-li-zhi") }}</span> {{ item.fixedPower }}
        </view>
        <view class="mt-[5px]">
          <view class="mr-[8px] text-[12px] text-[#D73A3C] font-bold">
            <div class="">
              <span>{{ $t("zu-lin") }}</span>:{{ item.dynamicMax }} Xcoin
            </div>
            <div class="">
              <span>{{ $t("shou-yi") }}</span>:{{ item.dynamicMax * item.priceRate }} Xcoin
            </div>
          </view>
          <view
            v-if="item.buyLimit === -1"
            class="mt-[5px] text-[12px] text-[#94999A]"
          >
            <span>{{ $t("ku-cun") }}</span> :{{ item.stock }}
          </view>
          <view
            v-if="item.buyLimit !== -1"
            class="mt-[5px] text-[12px] text-[#94999A]"
          >
            <span>{{ $t("xian-gou") }}</span> :{{ item.buyLimit }}
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
        {{ $t("li-ji-zu-lin") }}
      </view>
      <view
        class="flex items-end items-center justify-center rounded-b-[8px] px-[4px] py-[6px] text-center text-[10px] text-[#000]"
      >
        <up-icon name="info-circle" size="12px" color="#000" />
        <view class="ml-[4px]">
          {{ $t("shuo-ming-suo-you-fu-wu-qi-ke-yi-ti-qian-shu-hui") }}
        </view>
      </view>
    </view>
    <confirm
      :show="showDetail"
      :button-loading="buttonLoading"
      :height="
        currentItem.type === 1 || currentItem.type == 4 ? '420px' : '530px'
      "
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
          v-if="currentItem.type === 1 || currentItem.type === 4"
          class="px-[15px] py-[10px] text-[14px]"
        >
          <view class="text-center font-bold">
            {{ currentItem.serverName }}
          </view>
          <view
            v-if="currentItem.type === 1"
            class="mt-[5px] text-center text-[12px] text-[#94999A]"
          >
            <span>{{ $t("mei-ri") }}</span>
            {{ formatAmount(currentItem.fixedPrice * currentItem.priceRate) }}
            (Xcoin)
          </view>
          <view
            v-if="currentItem.type === 4"
            class="mt-[5px] text-center text-[12px] text-[#94999A]"
          >
            <span>{{ $t("mei-ri") }}</span>
            {{ formatAmount(1 * currentItem.priceRate) }}
            (Xcoin)
          </view>
          <view
            v-if="currentItem.type === 1"
            class="mt-[5px] text-center text-[12px] text-[#94999A]"
          >
            <span>{{ $t("mei-yue") }}</span>
            {{
              formatAmount(currentItem.fixedPrice * currentItem.priceRate * 30)
            }}
            (Xcoin)
          </view>
          <view
            v-if="currentItem.type === 4"
            class="mt-[5px] text-center text-[12px] text-[#94999A]"
          >
            <span>{{ $t("mei-yue") }}</span>
            {{ formatAmount(1 * currentItem.priceRate * 30) }}
            (Xcoin)
          </view>
          <view class="mt-[5px] text-center text-[12px] text-[#94999A]">
            <span>{{ $t("suan-li-zhi") }}</span> {{ currentItem.fixedPower }}
          </view>
          <view
            v-if="currentItem.type === 1"
            class="mt-[5px] text-center text-[12px] text-[#94999A]"
          >
            <span>{{ $t("ku-cun") }}</span> :{{ currentItem.stock }}
          </view>
          <view
            v-if="currentItem.type === 4"
            class="mt-[5px] text-center text-[12px] text-[#94999A]"
          >
            <span>{{ $t("xian-gou") }}</span> :{{ currentItem.buyLimit }}
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
              <span>{{ $t("zu-lin-xia-xian") }}</span>
              {{ currentItem.dynamicMin }} (Xcoin)
            </view>
            <view class="mt-[5px] w-1/2 text-[12px] text-[#94999A]">
              <span>{{ $t("zu-lin-shang-xian") }}</span>
              {{ currentItem.dynamicMax }} (Xcoin)
            </view>
          </div>
          <div class="mt-[5px] flex items-center justify-center">
            <view class="mt-[5px] w-1/2 text-[12px] text-[#94999A]">
              <span>{{ $t("suan-li-zhi") }}</span> {{ currentItem.fixedPower }}
            </view>
            <view
              v-if="currentItem.buyLimit === -1"
              class="mt-[5px] w-1/2 text-[12px] text-[#94999A]"
            >
              <span>{{ $t("ku-cun") }}</span> :{{ currentItem.stock }}
            </view>
            <view
              v-if="currentItem.buyLimit !== -1"
              class="mt-[5px] w-1/2 text-[12px] text-[#94999A]"
            >
              <span>{{ $t("xian-gou") }}</span> :{{ currentItem.buyLimit }}
            </view>
          </div>
          <view
            class="mt-[5px] flex items-center text-[12px] text-[#D73A3C] font-bold"
          >
            <view class="mt-[5px] w-1/2 text-[12px]">
              <span>{{ $t("zu-lin") }}</span>:{{ currentItem.dynamicMax }} Xcoin
            </view>
            <view class="mt-[5px] w-1/2 text-[12px]">
              <span>{{ $t("shou-yi") }}</span>:{{ currentItem.dynamicMax * currentItem.priceRate }}
              Xcoin
            </view>
          </view>
          <div class="mt-[10px] text-[12px] text-[#94999A]">
            {{ $t("zu-lin-jin-e") }}
          </div>
          <div class="bg-default mt-[10px]">
            <up-input
              v-model="dynamicData.amount"
              class="!p-[0]"
              :placeholder="$t('qing-shu-ru-zu-lin-jin-e')"
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
              <span>{{ $t("yu-gu-shou-yi") }}</span>: {{ dynamicData.income || 0 }} Xcoin
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
