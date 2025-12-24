<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getChatTask } from '@/api'
import { getPowerOrders } from '@/api/funds'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'

import { formatAmount, handleToUrl, openExternalUrl } from '@/utils/util'

const emits = defineEmits(['getTask'])
const userStore = useUserStore()
const showLoginModal = ref(false)
const { userInfo } = storeToRefs(userStore)
const { UNI_PLATFORM } = process.env
const systemInfo = uni.getSystemInfoSync()
console.log('systemInfo :>> ', systemInfo)
const swiperList = ref([
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg',
])
function handleClick(e) {
}
function onChange(e) {
}
const taskData = ref({})
const powerOrdersData = ref([])
const upCountToXcoin = ref(null)
const notifyTitle = ref('')
const conuntToXcoin = ref(0)
onMounted(async () => {
  await getTask()
  await getPowerOrdersData()
  conuntToXcoin.value = userInfo.value.kdkBalance
  if (powerOrdersData.value.length === 0) {
    notifyTitle.value = '当前没有算力服务器,请前往租赁后完成任务获取奖励'
  }
})
// // 监听userinfo roleid 变化
// watch(() => userInfo.value.roleId, async (newVal, oldVal) => {
//   console.log('newVal :>> ', newVal)
//   // if (newVal !== oldVal) {
//   //   await getTask()
//   //   await getPowerOrdersData()
//   // }
// })
// 暴露方法
async function getTask() {
  const getChatTaskRes = await getChatTask()
  taskData.value = getChatTaskRes
  // console.log('getChatTaskRes :>> ', getChatTaskRes)
  emits('getTask', taskData.value)
  if (taskData.value.taskCompleted && userInfo.value.roleId === -1) {
    showLoginModal.value = true
  }
}
async function getPowerOrdersData() {
  const getPowerOrdersRes = await getPowerOrders({
    status: 0,
  })
  powerOrdersData.value = getPowerOrdersRes.content
}
async function fetchCountToXcoin() {
  const userStore = useUserStore()
  await userStore.fetchUserInfo()
  conuntToXcoin.value = userInfo.value.kdkBalance
  upCountToXcoin.value.reStart()
  // if (taskData.value.taskTarget === taskData.value.todayChatCount) {
  await getPowerOrdersData()
  // }
  await getTask()
  if (taskData.value.usedPower > 0) {
    notifyTitle.value = '任务开始,再次增加服务器明日才开始计算收益'
  }
}
function handleClickAlert() {
  const tokenStore = useTokenStore()
  handleToUrl('/pages-fg/login/loginC')
  tokenStore.logout()
}
function openShowLoginModal() {
  showLoginModal.value = true
}
defineExpose({
  fetchCountToXcoin,
  openShowLoginModal,
})
</script>

<template>
  <view
    class="p-[15px] pt-[100px]"
    :class="systemInfo.uniPlatform === 'web' ? 'pt-[60px]' : 'pt-[100px]'"
  >
    <view>
      <view
        v-if="JSON.stringify(userInfo.customer) !== '{}'"
        class="flex items-center justify-between px-[20px]"
      >
        <view class="flex items-center">
          <up-image
            :width="40"
            :height="40"
            radius="100%"
            :src="userInfo.customer.avatar"
          />
          <view class="ml-[20px]">
            <view class="text-[14px] text-[#666]">
              客服名称
            </view>
            <view class="mt-[2px] text-[12px]">
              {{ userInfo.roleId === -1 ? "游客模式" : userInfo.customer.name }}
            </view>
          </view>
        </view>
        <view class="flex items-center">
          <up-image
            v-if="userInfo.roleId === 2"
            :width="40"
            :height="50"
            class="mr-[10px]"
            src="/static/level/type_1.gif"
          />
          <up-image
            v-if="userInfo.roleId === 1"
            :width="40"
            :height="50"
            class="mr-[10px]"
            src="/static/level/type_2.gif"
          />
          <up-image
            v-if="userInfo.roleId === 3"
            :width="40"
            :height="50"
            class="mr-[10px]"
            src="/static/level/type_3.gif"
          />
          <up-image
            v-if="
              userInfo.roleId === 4
                || userInfo.roleId === 0
                || userInfo.roleId === -1
            "
            :width="40"
            :height="50"
            class="mr-[10px]"
            src="/static/level/type_4.gif"
          />
          <!-- <up-image :width="40" :height="40" class="mr-[20px]" src="/static/images/avatar.png" /> -->
          <up-image
            :width="50"
            :height="50"
            src="/static/index/tg.png"
            @click="openExternalUrl(userInfo.customer.link)"
          />
        </view>
      </view>
      <!-- <view class="my-[15px] h-[1px] w-full bg-[transparent]" /> -->
      <view class="bg mb-[10px] mt-[10px] py-[25px] text-[#fff]">
        <view class="flex items-center justify-between px-[20px]">
          <view class="w-1/2 flex items-center justify-center">
            <up-image
              :width="60"
              :height="60"
              round
              src="/static/images/avatar.png"
            />
            <view class="ml-[15px]">
              <view class="mb-[5px] text-[14px]">
                <!-- {{ userInfo.name }} -->
                {{ userInfo.roleId === -1 ? "游客模式" : userInfo.name }}
              </view>
              <level />
            </view>
          </view>
          <view
            v-if="powerOrdersData.length > 0"
            class="w-1/2 flex items-center justify-center"
          >
            <up-swiper
              class="w-[150px] !h-[50px] !bg-[transparent]"
              :list="powerOrdersData"
              @change="onChange"
              @click="handleClick"
            >
              <template #default="{ item, index }">
                <view
                  class="w-full flex flex-col items-center justify-center text-[14px]"
                >
                  <view class="">
                    {{ item.serverInfo.serverName }}
                  </view>
                  <view class="mt-[5px]">
                    剩余:{{ Number(item.power) - Number(item.usedPower) }}
                    <!-- {{ item.usedPower }}/{{ item.power }} -->
                  </view>
                </view>
              </template>
            </up-swiper>
          </view>
          <view v-else class="w-1/2 flex items-center justify-center">
            <view class="text-[14px] text-[#999]">
              没有算力服务器
            </view>
          </view>
        </view>
        <view class="mx-auto my-[12px] h-[1px] w-[90%] bg-[#374447]" />

        <view class="flex items-center justify-between px-[20px]">
          <view class="w-1/2 flex flex-col items-center justify-center">
            <view class="mt-[2px] flex text-[18px] font-bold">
              <up-count-to
                ref="upCountToXcoin"
                bold
                :start-val="0"
                :decimals="4"
                :end-val="conuntToXcoin"
                :font-size="18"
                color="#fff"
              />
              <view class="ml-[5px]">
                Xcoin
              </view>
            </view>
            <view class="mt-[5px] text-[14px]">
              Xcoin余额
            </view>
          </view>
          <view class="h-[50px] w-[1px] bg-[#374447]" />
          <view
            class="w-1/2 flex flex-col items-center justify-center"
            @click="handleToUrl('/pages/server/index')"
          >
            <up-icon name="plus" size="20px" class="h-[25px]" color="#fff" />
            <view class="mt-[5px] text-[14px]">
              算力服务器
            </view>
          </view>
        </view>
      </view>
    </view>
    <view>
      <view class="mb-[10px] flex items-center justify-between text-[12px]">
        <view>
          AI对话
          {{
            taskData.todayChatCount > taskData.taskTarget
              ? taskData.taskTarget
              : taskData.todayChatCount
          }}/{{ taskData.taskTarget }}
        </view>
        <view>奖励{{ formatAmount(taskData.rewardAmount) }}Xcoin</view>
      </view>
      <up-line-progress
        height="16px"
        :percentage="
          ((taskData.todayChatCount / taskData.taskTarget) * 100).toFixed(2)
        "
        active-color="#000"
      />
    </view>
    <up-alert
      v-if="notifyTitle && userInfo.roleId !== -1"
      class="mt-[5px]"
      type="warning"
      :description="notifyTitle"
      font-size="12"
      closable
    />
    <up-alert
      v-if="userInfo.roleId === -1"
      class="mt-[5px]"
      type="error"
      description="当前为游客模式,请尽快登录账号，就能解锁正式奖励哦(点击登录)"
      font-size="12"
      @click="handleClickAlert"
    />

    <up-modal
      :show="showLoginModal"
      show-cancel-button
      confirm-text="立即登录"
      cancel-text="稍后再说"
      confirm-color="#FF6738"
      confirm-bg-color="#FF6738"
      cancel-color="#666666"
      cancel-bg-color="#F5F5F5"
      modal-radius="12px"
      button-radius="8px"
      style="z-index: 1000"
      @cancel="showLoginModal = false"
      @confirm="handleClickAlert"
    >
      <div class="flex flex-col items-center px-[24px] py-[16px]">
        <!-- 标题区域（带图标更生动） -->
        <div class="mb-[16px] flex items-center">
          <svg
            class="mr-[8px] h-[20px] w-[20px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L4 8V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8L12 2Z"
              stroke="#FF6738"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="#FF6738"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="text-[18px] text-[#333333] font-bold">
            奖励提示
          </div>
        </div>

        <!-- 内容卡片（优化背景/内边距/文字排版） -->
        <div
          class="mb-[8px] w-full border border-[#FFE8DD] rounded-[12px] bg-[#FFF9F6] p-[16px]"
        >
          <div class="text-[15px] text-[#333333] leading-[1.5]">
            你已成功领取体验奖励啦～ 现在登录账号，就能解锁正式奖励哦！
          </div>
        </div>

        <!-- 小字提示（增加引导性） -->
        <div class="mb-[4px] text-[12px] text-[#999999]">
          登录后会有更多的奖励哦
        </div>
      </div>
    </up-modal>
  </view>
</template>

<style scoped lang="scss">
:deep(.u-swiper__wrapper) {
  height: 50px !important;
}

:deep(.u-line-progress__text) {
  font-size: 13px;
}

.bg {
  background: url('/static/index/index_card_bg.png');
  background-size: 100% 100%;
}
</style>
