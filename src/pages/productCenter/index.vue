<script lang="ts" setup>
import { ref } from 'vue'
import { getChatTask } from '@/api'
import { getPowerOrders, redeemPowerOrder } from '@/api/funds'
import { t } from '@/locale/index'
import { formatAmount, handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
  },
})
onMounted(async () => {
  await getList()
  await getTask()
})
const taskData = ref([])
async function getTask() {
  const getChatTaskRes = await getChatTask()
  taskData.value = getChatTaskRes
}

const serverList = ref([])
async function getList() {
  uni.showLoading({
    title: t('jia-zai-zhong'),
  })
  const getPowerOrdersRes = await getPowerOrders()
  serverList.value = getPowerOrdersRes.content || []
  serverList.value.map((v) => {
    v.isExpired = false
  })
  uni.hideLoading()
}
const confirmData = reactive({
  show: false,
  item: {},
  loading: false,
})
async function redemption(item) {
  console.log('item :>> ', item)
  if (taskData.value.taskCompleted == false) {
    if (taskData.value.todayChatCount !== 0) {
      uni.showToast({
        title: t('dang-qian-ren-wu-yi-jing-kai-shi-qing-xian-wan-cheng-ren-wu'),
        icon: 'none',
      })
      return
    }
  }
  // if (taskData.value.todayChatCount === 1) {
  //   uni.showToast({
  //     title: '当前任务已经开始,请先完成任务',
  //     icon: 'none',
  //   })
  //   return
  // }
  confirmData.loading = true
  try {
    await redeemPowerOrder({ orderId: item.id })
    uni.showToast({
      title: t('shu-hui-cheng-gong'),
    })
    await getList()
    confirmData.show = false
  }
  catch (error) {
    uni.showToast({
      title: error.data.message || t('shu-hui-shi-bai-qing-zhong-shi'),
      icon: 'none',
    })
  }
  finally {
    confirmData.loading = false
  }
}
</script>

<template>
  <view class="p-[15px]">
    <view
      class="flex items-center justify-between border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb] p-[15px]"
    >
      <view class="text-[15px]">
        <view class="mb-[5px] font-bold">
          {{ $t("suan-li-fu-wu-qi") }}
        </view>
        <view class="text-[12px] text-[#94999A]">
          {{
            $t("guan-li-ni-de-suan-li-fu-wu-qi-cha-kan-zhuang-tai-yu-shou-yi")
          }}
        </view>
      </view>

      <view
        class="btn-block h-[30px] min-h-[30px] w-[100px]"
        @click="handleToUrl('/pages/server/index')"
      >
        {{ $t("zu-lin") }}
      </view>
    </view>

    <!-- 列表 -->
    <template v-if="serverList.length > 0">
      <view
        v-for="(item, index) in serverList"
        :key="index"
        class="mt-[15px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb]"
      >
        <view class="relative flex">
          <div
            :class="{
              'status-green': item.status === 2 || item.status === 3,
              'status-org': item.status === 1,
              'status-black': item.status === 0,
            }"
            class="absolute right-[0px] top-[0px] z-[100] w-[30%] py-[4px] text-center text-[12px] text-[#fff]"
          >
            <span v-if="item.status === 0">{{ $t("zheng-chang") }}</span>
            <span v-if="item.status === 1">{{ $t("ke-shu-hui") }}</span>
            <span v-if="item.status === 2 || item.status === 3">{{
              $t("wan-cheng")
            }}</span>
            <!-- <span v-if="item.status === 3">已赎回</span> -->
          </div>
          <div class="w-full flex p-[15px] pt-[30px]">
            <view
              class="h-[40px] min-h-[40px] w-[40px] flex items-center justify-center rounded rounded-[5px] bg-[#000]"
            >
              <u-image
                v-if="item.serverInfo.type == 3"
                src="/static/productCenter/server.png"
                width="20"
                height="20"
              />
              <u-image
                v-else
                :src="item.serverInfo.imgUrl"
                width="100%"
                height="100%"
                rounded="5px"
              />
            </view>
            <view class="ml-[20px] flex-1">
              <view class="font-bold">
                {{ item.name }}
              </view>
              <view class="flex items-center text-[10px] text-[#94999A]">
                <view class="mr-[5px]">
                  <span>{{ $t("fu-wu-qi-ming-cheng") }}</span>: {{ item.serverInfo.serverName }}
                </view>
                <view>{{ item.serverName }}</view>
              </view>
              <view
                class="mt-[5px] flex items-center text-[10px] text-[#94999A]"
              >
                <view class="mr-[5px]">
                  {{ $t("zu-yong-ri-qi") }}
                </view>
                <view>{{ item.createTime }}</view>
              </view>

              <view
                class="mt-[5px] flex items-center text-[10px] text-[#94999A]"
              >
                <view class="mr-[5px]">
                  {{ $t("suan-li-zhi") }}
                </view>
                <view>{{ item.usedPower }}/{{ item.power }}</view>
              </view>

              <!-- 展开按钮 -->
              <view
                class="w-full flex items-center justify-end text-[12px] text-[#94999A]"
                @click="item.isExpired = !item.isExpired"
              >
                {{ item.isExpired ? $t("shou-qi") : $t("zhan-kai") }}
                <u-icon
                  name="arrow-down"
                  color="#94999A"
                  size="12"
                  class="transition-transform duration-200"
                  :class="item.isExpired ? 'rotate-180' : 'rotate-0'"
                />
              </view>
            </view>
          </div>
        </view>

        <!-- 展开动画容器 -->
        <transition name="expand">
          <view v-if="item.isExpired" class="expand-box">
            <view class="flex items-end gap-[10px]">
              <view class="bg1 box-border h-[100px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ item.power }}
                </view>
                <view class="mt-[10px] text-[#94999A]">
                  {{ $t("zong-suan-li-zhi") }}
                </view>
              </view>

              <view class="bg1 h-[80px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ item.power - item.usedPower }}
                </view>
                <view class="mt-[10px] text-[12px] text-[#94999A]">
                  {{ $t("sheng-yu-suan-li-zhi") }}
                </view>
              </view>
            </view>

            <view class="flex items-end gap-[10px]">
              <view class="bg1 mt-[15px] box-border h-[100px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ item.taskSpend }}
                </view>
                <view class="mt-[10px] text-[12px] text-[#94999A]">
                  {{ $t("mei-ren-wu-xiao-hao") }}
                </view>
              </view>

              <view class="bg1 mt-[15px] h-[80px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ item.serverInfo.priceRate }}%
                </view>
                <view class="mt-[10px] text-[12px] text-[#94999A]">
                  {{ $t("mei-ri-fan-huan-shuai") }}
                </view>
              </view>
            </view>

            <view
              v-if="item.serverInfo.type !== 3"
              class="flex items-center gap-[10px]"
            >
              <view class="bg1 mt-[15px] box-border h-[100px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ formatAmount(item.payPrice) }}
                </view>
                <view class="mt-[10px] text-[12px] text-[#94999A]">
                  {{ $t("dao-qi-hou-fan-huan") }}
                </view>
              </view>

              <template
                v-if="
                  item.status !== 2
                    && item.status !== 3
                    && item.serverInfo.type != 3
                "
              >
                <view
                  v-if="item.usedPower !== item.power"
                  class="w-[48%]"
                  @click="
                    confirmData.item = item;
                    confirmData.show = true;
                  "
                >
                  <view class="btn-block h-[35px] min-h-[35px] w-[100%]">
                    {{ $t("ti-qian-shu-hui") }}
                  </view>
                </view>
                <view
                  v-if="item.usedPower === item.power"
                  class="w-[48%]"
                  @click="
                    confirmData.item = item;
                    confirmData.show = true;
                  "
                >
                  <view class="btn-block h-[35px] min-h-[35px] w-[100%]">
                    {{ $t("shu-hui") }}
                  </view>
                </view>
              </template>
            </view>
          </view>
        </transition>
      </view>
    </template>

    <up-empty v-else mode="list" margin-top="40" />

    <!-- 注意事项 -->
    <!-- 详细规则 -->
    <view class="bg-desc mt-[20px] rounded-[10px] px-[20px] py-[20px]">
      <view class="mb-[20px] text-[16px] font-bold">
        {{ $t("fei-yong-gui-ze") }}
      </view>
      <view class="flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          {{
            $t(
              "zu-lin-ji-suan-li-fu-wu-qi-xu-zhi-fu-xiang-ying-de-ji-chu-fei-yong-gai-fei-yong-hui-zai-zu-lin-qi-jie-shu-hou-quanetui-huan",
            )
          }}
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          {{
            $t(
              "wan-cheng-mei-ri-liao-tian-ren-wu-hui-xiao-hao-suan-li-zhi-dang-suan-li-zhi-hao-jin-shi-xu-zhong-xin-zu-lin",
            )
          }}
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          {{
            $t(
              "xun-lian-shi-deng-ji-jue-ding-le-ke-tong-shi-yun-hang-de-fu-wu-qi-shu-liang-deng-ji-yue-gao-zhi-chi-tong-shi-yun-hang-de-fu-wu-qi-shu-liang-yue-duo",
            )
          }}
        </view>
      </view>
    </view>
    <confirm
      :show="confirmData.show"
      :button-loading="confirmData.loading"
      height="200px"
      @close="confirmData.show = false"
      @confirm="redemption(confirmData.item)"
    >
      <div class="flex flex-col items-center justify-center p-[20px]">
        <div class="text-[18px] font-bold">
          {{ $t("ti-shi") }}
        </div>
        <view class="mt-[10px] text-[12px]">
          <span v-if="confirmData.item.usedPower !== confirmData.item.power">
            {{ $t("que-ding-ti-qian-shu-hui-suan-li-fu-wu-qi-ma") }}</span>
          <span v-else> {{ $t("que-ding-shu-hui-suan-li-fu-wu-qi-ma") }}</span>
        </view>
        <div class="mt-[5px] text-center text-[12px]">
          <span>
            {{
              $t(
                "zhu-yi-ti-qian-shu-hui-suan-li-fu-wu-qi-xu-yao-kou-chu-shou-xu-fei-ben-jin",
              )
            }}</span>{{ confirmData.item.redeemRate * 100 }}%)。
        </div>
      </div>
    </confirm>
  </view>
</template>

<style lang="scss" scoped>
.bg {
  background: url('/static/server/card_top_bg.png');
  background-size: 100% 100%;
}

.bg3 {
  background: url('/static/training/bg1.png');
  background-size: 100% 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
}

.bg1 {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  /* 渐变背景 */
  background: linear-gradient(135deg, #ffffff 0%, #e8efff 40%, #b9daff 100%);

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ===== 展开动画样式 ===== */
.expand-box {
  overflow: hidden;
}

.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.35s ease,
    opacity 0.35s ease;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
