<script lang="ts" setup>
import { ref } from 'vue'
import { getPowerOrders, redeemPowerOrder } from '@/api/funds'
import { formatAmount, handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
  },
})
onMounted(async () => {
  await getList()
})
const serverList = ref([])
async function getList() {
  uni.showLoading({
    title: '加载中...',
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
  confirmData.loading = true
  try {
    await redeemPowerOrder({ orderId: item.id })
    uni.showToast({
      title: '赎回成功',
    })
    await getList()
    confirmData.show = false
  }
  catch (error) {
    uni.showToast({
      title: error.data.message || '赎回失败,请重试',
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
          算力服务器
        </view>
        <view class="text-[12px] text-[#94999A]">
          管理你的算力服务器，查看状态与收益
        </view>
      </view>

      <view
        class="btn-block h-[30px] min-h-[30px] w-[100px]"
        @click="handleToUrl('/pages/server/index')"
      >
        产品中心
      </view>
    </view>

    <!-- 列表 -->
    <template v-if="serverList.length > 0">
      <view
        v-for="(item, index) in serverList"
        :key="index"
        class="mt-[15px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb] p-[15px]"
      >
        <view class="relative flex">
          <div
            :class="{
              'status-green':
                item.status === 0 || item.status === 2 || item.status === 3,
              'status-org': item.status === 1,
            }"
            class="absolute right-[0px] top-[0px] z-[100] w-[30%] py-[4px] text-center text-[12px] text-[#fff]"
          >
            <span v-if="item.status === 0">正常</span>
            <span v-if="item.status === 1">可赎回</span>
            <span v-if="item.status === 2 || item.status === 3">完成</span>
            <!-- <span v-if="item.status === 3">已赎回</span> -->
          </div>
          <view
            class="h-[40px] min-h-[40px] w-[40px] flex items-center justify-center rounded bg-[#000]"
          >
            <u-image
              src="/static/productCenter/server.png"
              width="20"
              height="20"
            />
          </view>
          <view class="ml-[20px] flex-1">
            <view class="font-bold">
              {{ item.name }}
            </view>
            <view class="flex items-center text-[10px] text-[#94999A]">
              <view class="mr-[5px]">
                服务器名称: {{ item.serverInfo.serverName }}
              </view>
              <view>{{ item.serverName }}</view>
            </view>
            <view class="mt-[5px] flex items-center text-[10px] text-[#94999A]">
              <view class="mr-[5px]">
                租用日期
              </view>
              <view>{{ item.createTime }}</view>
            </view>

            <view class="mt-[5px] flex items-center text-[10px] text-[#94999A]">
              <view class="mr-[5px]">
                算力值
              </view>
              <view>{{ item.usedPower }}/{{ item.power }}</view>
            </view>

            <!-- 展开按钮 -->
            <view
              class="w-full flex items-center justify-end text-[12px] text-[#94999A]"
              @click="item.isExpired = !item.isExpired"
            >
              {{ item.isExpired ? "收起" : "展开" }}
              <u-icon
                name="arrow-down"
                color="#94999A"
                size="12"
                class="transition-transform duration-200"
                :class="item.isExpired ? 'rotate-180' : 'rotate-0'"
              />
            </view>
          </view>
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
                  总算力值
                </view>
              </view>

              <view class="bg1 h-[80px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ item.power - item.usedPower }}
                </view>
                <view class="mt-[10px] text-[12px] text-[#94999A]">
                  剩余算力值
                </view>
              </view>
            </view>

            <view class="flex items-end gap-[10px]">
              <view class="bg1 mt-[15px] box-border h-[100px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ item.taskSpend }}
                </view>
                <view class="mt-[10px] text-[12px] text-[#94999A]">
                  每任务消耗
                </view>
              </view>

              <view class="bg1 mt-[15px] h-[80px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ item.serverInfo.priceRate }}%
                </view>
                <view class="mt-[10px] text-[12px] text-[#94999A]">
                  每日返还率
                </view>
              </view>
            </view>

            <view class="flex items-center gap-[10px]">
              <view class="bg1 mt-[15px] box-border h-[100px] w-[48%]">
                <view class="text-[24px] font-700">
                  {{ formatAmount(item.payPrice) }}
                </view>
                <view class="mt-[10px] text-[12px] text-[#94999A]">
                  到期后返还
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
                    提前赎回
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
                    赎回
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
        费用规则
      </view>
      <view class="flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          租赁计算力服务器需支付相应的基础费用，该费用会在租赁期结束后全额退还。
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          完成每日聊天任务会消耗算力值；当算力值耗尽时，需重新租赁。
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          VIP等级决定了可同时运行的服务器数量 ——
          等级越高，支持同时运行的服务器数量越多。
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
          提示
        </div>
        <view class="mt-[10px] text-[12px]">
          <span v-if="confirmData.item.usedPower !== confirmData.item.power">
            确定提前赎回算力服务器吗？</span>
          <span v-else> 确定赎回算力服务器吗？</span>
        </view>
        <div class="mt-[5px] text-center text-[12px]">
          注意：提前赎回算力服务器需要扣除手续费(本金{{
            confirmData.item.redeemRate * 100
          }}%)。
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
