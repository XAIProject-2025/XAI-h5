<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getPowerOrders, redeemPowerOrder } from '@/api/funds'
import { getVipInfo } from '@/api/index'
import { useUserStore } from '@/store'
import { formatAmount, handleToUrl } from '@/utils/util'

import circleProgress from './components/circleProgress.vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const modelVale = ref(50)
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const vipInfoData = ref({})
const serverList = ref([])
onShow(async () => {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })
  await userStore.fetchUserInfo()
  const vipInfoRes = await getVipInfo()
  const getPowerOrdersRes = await getPowerOrders()
  getPowerOrdersRes.content.map((v) => {
    if (v.status == 0) {
      serverList.value.push(v)
    }
  })
  vipInfoData.value = vipInfoRes
  uni.hideLoading()
})
onMounted(async () => {
})
const computedNextTimeDecay = computed(() => {
  if (!vipInfoData.value.currentPremium || !vipInfoData.value.decayedNum || !vipInfoData.value.decayNum) {
    return 0
  }
  let nextTime = (vipInfoData.value.currentPremium
    - vipInfoData.value.decayedNum
    - vipInfoData.value.decayNum) * 100
  if (nextTime < vipInfoData.value.decayMin) {
    nextTime = vipInfoData.value.decayMin
  }

  return Number(nextTime).toFixed(2)
})
</script>

<template>
  <view class="p-[15px]">
    <!-- 顶部区域个人信息 -->
    <view class="bg1 py-[20px] pb-[30px]">
      <view class="flex items-center justify-center">
        <u-image
          src="/static/images/avatar.png"
          width="60"
          height="60"
          alt=""
        />
      </view>
      <view class="mt-[10px] text-center text-[16px] text-[#fff] font-bold">
        {{ userInfo.name }}
      </view>
      <view class="mt-[10px] flex items-center justify-center">
        <level />
        <view
          class="btn-block--white ml-[10px] h-[20px] min-h-[20px] rounded-[12px] px-[15px] py-[4px]"
        >
          <span v-if="userInfo.roleId == 4">无限代理</span>
          <span v-if="userInfo.roleId == 3">普通代理</span>
          <span v-if="userInfo.roleId == 2">激活用户</span>
          <span v-if="userInfo.roleId == 1">未激活</span>
          <span v-if="userInfo.roleId == 0">顶级账号</span>
        </view>
      </view>
      <view
        class="mt-[15px] flex items-center justify-center text-[12px] text-[#94999A]"
      >
        <view>
          <span class="mr-[4px]">算力服务器</span>{{ serverList.length }}
        </view>
        <view class="mx-[10px]">
          |
        </view>
        <view>
          <span class="mr-[4px]">Xcoin余额</span>{{ formatAmount(userInfo.kdkBalance) }} Xcoin
        </view>
      </view>
      <view
        class="mt-[5px] flex items-center justify-center text-[12px] text-[#94999A]"
      >
        <view>
          <span class="mr-[4px]">USDT余额</span>{{ formatAmount(userInfo.usdtBalance) }}
        </view>
        <view class="mx-[10px]">
          |
        </view>
        <view>
          <span class="mr-[4px]">活跃度</span>{{ vipInfoData.currentActivity }}
        </view>
      </view>
      <view
        class="mt-[15px] flex items-center justify-between gap-[20px] px-[20px]"
      >
        <view
          class="btn-block h-[35px] w-1/2"
          @click="handleToUrl('/pages/invitation/index')"
        >
          <image
            src="/static/training/qr_code.png"
            class="mr-[5px] h-[20px] w-[20px]"
            mode="scaleToFill"
            alt=""
          />
          邀请
        </view>
        <view
          class="btn-block--white h-[35px] w-1/2"
          @click="handleToUrl('/pages/withdraw/index')"
        >
          <image
            src="/static/training/withdraw.png"
            class="mr-[5px] h-[20px] w-[20px]"
            mode="scaleToFill"
            alt=""
          />
          提现
        </view>
      </view>
    </view>
    <!-- 升级信息 -->
    <view class="bg-default mt-[20px] px-[20px] py-[20px]">
      <view class="text-[16px] font-bold">
        升级进度
      </view>
      <view class="mt-[20px] flex items-center justify-center">
        <view class="flex flex-col items-center justify-center">
          <u-image
            v-if="vipInfoData.vipLevel == 0"
            src="/static/level/level_0.png"
            width="60"
            height="60"
            alt=""
          />
          <u-image
            v-if="vipInfoData.vipLevel == 1"
            src="/static/level/level_1.png"
            width="60"
            height="60"
            alt=""
          />
          <u-image
            v-if="vipInfoData.vipLevel == 2"
            src="/static/level/level_2.png"
            width="60"
            height="60"
            alt=""
          />
          <u-image
            v-if="vipInfoData.vipLevel == 3"
            src="/static/level/level_3.png"
            width="60"
            height="60"
            alt=""
          />
          <view class="mt-[10px]">
            <view class="text-[14px] text-[#94999A]">
              当前等级
            </view>
            <view class="mt-[5px] text-center text-[#000] font-bold">
              E{{ vipInfoData.vipLevel }}
            </view>
          </view>
        </view>
        <u-image
          src="/static/training/arrow.png"
          width="72"
          height="20"
          class="mx-[30px]"
          alt=""
        />
        <view class="flex flex-col items-center justify-center">
          <u-image
            v-if="vipInfoData.nextVipLevel == 0"
            src="/static/level/level_0.png"
            width="60"
            height="60"
            alt=""
          />
          <u-image
            v-if="vipInfoData.nextVipLevel == 1"
            src="/static/level/level_1.png"
            width="60"
            height="60"
            alt=""
          />
          <u-image
            v-if="vipInfoData.nextVipLevel == 2"
            src="/static/level/level_2.png"
            width="60"
            height="60"
            alt=""
          />
          <u-image
            v-if="vipInfoData.nextVipLevel == 3"
            src="/static/level/level_3.png"
            width="60"
            height="60"
            alt=""
          />
          <view class="mt-[10px]">
            <view class="text-[14px] text-[#94999A]">
              下一等级
            </view>
            <view class="mt-[5px] text-center text-[#000] font-bold">
              E{{ vipInfoData.nextVipLevel }}
            </view>
          </view>
        </view>
      </view>
      <view class="mt-[20px] text-[16px] font-bold">
        升级条件
      </view>
      <view class="mt-[10px]">
        <view
          class="mb-[5px] flex items-center justify-between text-[14px] text-[#94999A]"
        >
          <view>邀请好友</view>
          <view>
            {{ vipInfoData.currentInviteUsers }}/{{
              vipInfoData.nextRequiredInviteUsers
            }}
          </view>
        </view>
        <up-line-progress
          height="12px"
          :percentage="
            formatAmount(
              (vipInfoData.currentInviteUsers
                / vipInfoData.nextRequiredInviteUsers)
                * 100,
            )
          "
          active-color="#000"
        />
      </view>
      <view class="mt-[10px]">
        <view
          class="mb-[5px] flex items-center justify-between text-[14px] text-[#94999A]"
        >
          <view>直接推荐充值</view>
          <view>
            {{ vipInfoData.currentRecharge }}/{{
              vipInfoData.nextRequiredRecharge
            }}
          </view>
        </view>
        <up-line-progress
          height="12px"
          :percentage="
            Number(
              (vipInfoData.currentRecharge / vipInfoData.nextRequiredRecharge)
                * 100,
            ).toFixed(2)
          "
          active-color="#000"
        />
      </view>
      <view class="mt-[10px]">
        <view
          class="mb-[5px] flex items-center justify-between text-[14px] text-[#94999A]"
        >
          <view>活跃度</view>
          <view>
            {{ vipInfoData.currentActivity }}/{{
              vipInfoData.nextRequiredActivity
            }}
          </view>
        </view>
        <up-line-progress
          height="12px"
          :percentage="
            formatAmount(
              (vipInfoData.currentActivity / vipInfoData.nextRequiredActivity)
                * 100,
            )
          "
          active-color="#000"
        />
      </view>
    </view>
    <up-alert
      v-if="vipInfoData.vipLevel === 0"
      class="my-[10px]"
      type="warning"
      description="租赁一台服务器即可立即升级E1"
      font-size="12"
    />

    <!-- 手续费信息 -->
    <view class="bg3 mt-[20px] px-[20px] py-[20px] text-[#fff]">
      <view class="text-[16px] font-bold">
        费用信息
      </view>
      <view class="mt-[20px] text-[16px] font-bold">
        当前费率
        <span
          v-if="vipInfoData.currentPremium"
          class="text-[40px] text-[#FFEE00]"
        >{{
          Number(
            (vipInfoData.currentPremium - vipInfoData.decayedNum) * 100,
          ).toFixed(2)
        }}</span>
        <span v-else>0</span>
        %
      </view>
      <view class="flex items-center gap-[5px] rounded-[6px] p-[10px]">
        <up-icon name="info-circle" color="#94999A" />
        <view class="text-[14px] text-[#94999A]">
          训练师等级越高，初始费率越低
        </view>
      </view>
    </view>
    <!-- 手续费减免 -->
    <view class="bg-default mt-[20px] px-[20px] py-[20px]">
      <view class="mb-[20px] text-[16px] font-bold">
        剩余天数
      </view>
      <view class="flex items-center justify-center">
        <!-- <l-circle :percent="75" size="150px" :stroke-width="8" :trail-width="8" /> -->
        <l-circle
          v-if="vipInfoData.needDays != 0"
          :stroke-width="10"
          size="150px"
          :trail-width="10"
          stroke-color="#000"
          trail-color="#ebedf0"
          :percent="vipInfoData.decayedNum"
          :max="vipInfoData.currentPremium"
        >
          <div
            class="flex flex-col items-center justify-center text-[14px] font-bold"
          >
            <div class="">
              最低手续费
            </div>
            <div>还需{{ vipInfoData.needDays }}天</div>
          </div>
        </l-circle>
        <l-circle
          v-else
          :stroke-width="10"
          size="150px"
          :trail-width="10"
          stroke-color="#000"
          trail-color="#ebedf0"
          :percent="100"
          :max="100"
        >
          <text>当前最低手续费</text>
        </l-circle>
        <!-- <lime-circle v-model:current="modelVale" :percent="100">
          <text>{{ modelVale }}%</text>
        </lime-circle> -->
        <!-- <circle-progress :value="50" :max="100" color="#3f808a" /> -->
      </view>
      <template v-if="vipInfoData.needDays == 0">
        <view class="mt-[10px] text-center text-[12px] text-[#94999A]">
          当前手续费为等级最低{{
            Number(vipInfoData.decayMin * 100).toFixed(2)
          }}%
        </view>
      </template>

      <template v-else>
        <view class="mt-[20px] text-center text-[16px] text-[#000] font-bold">
          下次减免
        </view>
        <view class="mt-[10px] text-center text-[12px] text-[#94999A]">
          <!-- 下次的费用减免，还剩 1 天 -->
          距离
          {{ computedNextTimeDecay }}% 的费用优惠还剩 1 天
        </view>
      </template>
    </view>

    <!-- 详细规则 -->
    <view class="bg-desc mt-[20px] rounded-[10px] px-[20px] py-[20px]">
      <view class="mb-[20px] text-[16px] font-bold">
        费用规则
      </view>
      <view class="flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          未提取的资金：提现手续费每天自动降低
          {{ Number(vipInfoData.decayNum * 100).toFixed(2) }}%
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          提现手续费最低可降至
          {{ Number(vipInfoData.decayMin * 100).toFixed(2) }}%
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          提取后，费用计算将从初始费率重新开始
        </view>
      </view>
      <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          训练师等级越高，初始费率越低
        </view>
      </view>
      <!-- <view class="mt-[10px] flex items-center text-[14px]">
        <up-icon name="checkmark-circle-fill" size="18px" color="#000" />
        <view class="ml-[10px]">
          当前获得的费用折扣：0%
        </view>
      </view> -->
    </view>
    <!-- <up-alert title="升级提示" type="warning" description="升级后，您将获得更高的费用折扣" /> -->
  </view>
</template>

<style lang="scss" scoped>
//
.bg {
  background: rgba(63, 128, 138, 0.1);
}

.bg1 {
  background: url('/static/training/bg.png');
  background-size: 100% 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
}

.bg3 {
  background: url('/static/training/bg1.png');
  background-size: 100% 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
}
</style>
