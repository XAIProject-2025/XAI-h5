<script lang="ts" setup>
import { ref } from 'vue'
import { formatAmount, handleToUrl } from '@/utils/util'

definePage({
  style: {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
  },
})

const serverList = ref([
  {
    name: 'Free',
    price: 0,
    rentedDate: '2015-02-01',
    isExpired: false,
  },
  {
    name: 'Free',
    price: 0,
    rentedDate: '2015-02-01',
    isExpired: false,
  },
])
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
        <view class="text-[12px] text-[#999]">
          管理你的算力服务器，查看状态与收益
        </view>
      </view>

      <view class="btn-block h-[30px] min-h-[30px] w-[100px]" @click="handleToUrl('/pages/server/index')">
        产品中心
      </view>
    </view>

    <!-- 列表 -->
    <view
      v-for="(item, index) in serverList" :key="index"
      class="mt-[15px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb] p-[15px]"
    >
      <view class="relative flex">
        <view class="bg absolute right-[0px] top-[0px] z-[100] w-[30%] py-[4px] text-center text-[12px] text-[#fff]">
          到期
        </view>
        <view class="h-[40px] min-h-[40px] w-[40px] flex items-center justify-center rounded bg-[#000]">
          <u-image src="/static/productCenter/server.png" width="20" height="20" />
        </view>

        <view class="ml-[20px] flex-1">
          <view class="font-bold">
            {{ item.name }}
          </view>

          <view class="mt-[5px] flex items-center text-[12px] text-[#94999A]">
            <view class="mr-[5px]">
              租用日期
            </view>
            <view>{{ item.rentedDate }}</view>
          </view>

          <view class="mt-[5px] flex items-center text-[12px] text-[#94999A]">
            <view class="mr-[5px]">
              算力值
            </view>
            <view>10/50</view>
          </view>

          <!-- 展开按钮 -->
          <view
            class="w-full flex items-center justify-end text-[12px] text-[#94999A]"
            @click="item.isExpired = !item.isExpired"
          >
            {{ item.isExpired ? '收起' : '展开' }}
            <u-icon
              name="arrow-down" color="#94999A" size="12" class="transition-transform duration-200"
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
                30
              </view>
              <view class="mt-[10px] text-[#94999A]">
                总算力值
              </view>
            </view>

            <view class="bg1 h-[80px] w-[48%]">
              <view class="text-[24px] font-700">
                30
              </view>
              <view class="mt-[10px] text-[12px] text-[#94999A]">
                剩余算力值
              </view>
            </view>
          </view>

          <view class="flex items-end gap-[10px]">
            <view class="bg1 mt-[15px] box-border h-[100px] w-[48%]">
              <view class="text-[24px] font-700">
                1
              </view>
              <view class="mt-[10px] text-[12px] text-[#94999A]">
                每任务消耗
              </view>
            </view>

            <view class="bg1 mt-[15px] h-[80px] w-[48%]">
              <view class="text-[24px] font-700">
                3.1%
              </view>
              <view class="mt-[10px] text-[12px] text-[#94999A]">
                每日返还率
              </view>
            </view>
          </view>

          <view class="flex items-center gap-[10px]">
            <view class="bg1 mt-[15px] box-border h-[100px] w-[48%]">
              <view class="text-[24px] font-700">
                {{ formatAmount(100) }}
              </view>
              <view class="mt-[10px] text-[12px] text-[#94999A]">
                过期后返还
              </view>
            </view>

            <view class="w-[48%]">
              <view class="btn-block h-[35px] min-h-[35px] w-[100%]">
                提前赎回
              </view>
            </view>
          </view>
        </view>
      </transition>
    </view>

    <!-- 注意事项 -->
    <!-- 详细规则 -->
    <view class="mt-[20px] border border-[#eeefeb] rounded-[8px] border-solid bg-[#e7f0ee] px-[20px] py-[20px]">
      <view class="mb-[20px] text-[16px] font-bold">
        费用规则
      </view>
      <view class="flex items-center text-[14px]">
        <up-icon name="checkmark-circle" size="18px" color="#3f808a" />
        <view class="ml-[10px]">
          租赁计算力服务器需支付相应的基础费用，该费用会在租赁期结束后全额退还。
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle" size="18px" color="#3f808a" />
        <view class="ml-[10px]">
          完成每日聊天任务会消耗 1 个算力值；当算力值耗尽时，需重新租赁。
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle" size="18px" color="#3f808a" />
        <view class="ml-[10px]">
          训练师等级决定了可同时运行的服务器数量 —— 等级越高，支持同时运行的服务器数量越多。
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.bg {
  background: url('/static/server/card_top_bg.png');
  background-size: 100% 100%;
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
