<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getChatTask } from '@/api'
import { getPowerOrders } from '@/api/funds'
import { t } from '@/locale/index'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'
import { formatAmount, handleToUrl, openExternalUrl } from '@/utils/util'

const emits = defineEmits(['getTask'])
const userStore = useUserStore()
const showLoginModal = ref(false)
const showLoginModalUser1 = ref(false)
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
    notifyTitle.value = t('dang-qian-mei-you-suan-li-fu-wu-qi-qing-qian-wang-zu-lin-hou-wan-cheng-ren-wu-huo-qu-jiang-li')
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
  if (userInfo.value.roleId === 1 && taskData.value.taskCompleted) {
    showLoginModalUser1.value = true
  }
}
const clearComputingPower0Show = ref(false)
async function getPowerOrdersData() {
  const getPowerOrdersRes = await getPowerOrders({
    status: 0,
  })
  getPowerOrdersRes.content.forEach((item) => {
    if (item.type === 4 && (item.power - item.usedPower) == 1) {
      clearComputingPower0Show.value = true
    }
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
    notifyTitle.value = t('ren-wu-kai-shi-zai-ci-zeng-jia-fu-wu-qi-ming-ri-cai-kai-shi-ji-suan-shou-yi')
  }
}
function handleClickAlert() {
  const tokenStore = useTokenStore()
  handleToUrl('/pages-fg/login/loginC')
  tokenStore.logout()
}
function handleClickAlertUser1() {
  // const tokenStore = useTokenStore()
  // handleToUrl('/pages-fg/login/loginC')
  // tokenStore.logout()
}
function openShowLoginModal() {
  showLoginModal.value = true
}
function openShowLoginModalUser1() {
  showLoginModalUser1.value = true
}
defineExpose({
  fetchCountToXcoin,
  openShowLoginModal,
  openShowLoginModalUser1,
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
              {{ $t("ke-fu-ming-cheng") }}
            </view>

            <view class="mt-[2px] text-[12px]">
              {{
                userInfo.roleId === -1
                  ? $t("you-ke-mo-shi")
                  : userInfo.customer.name
              }}
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
        <view class="flex items-center justify-between px-[10px]">
          <view class="w-[45%] flex items-center justify-center">
            <up-image
              :width="50"
              :height="50"
              round
              src="/static/images/avatar.png"
            />
            <view class="ml-[15px]">
              <view class="mb-[5px] text-[14px]">
                <!-- {{ userInfo.name }} -->
                {{
                  userInfo.roleId === -1 ? $t("you-ke-mo-shi") : userInfo.name
                }}
              </view>
              <level />
            </view>
          </view>
          <view
            v-if="powerOrdersData.length > 0"
            class="w-[55%] flex items-center justify-center"
          >
            <up-swiper
              class="w-full !h-[60px] !bg-[transparent]"
              :list="powerOrdersData"
              @change="onChange"
              @click="handleClick"
            >
              <template #default="{ item, index }">
                <view
                  class="w-full flex flex-col items-center justify-center text-[14px]"
                >
                  <view class="">
                    {{
                      userInfo.roleId === -1
                        ? $t("fu-wu-qi")
                        : item.serverInfo.serverName
                    }}
                  </view>
                  <view class="mt-[5px]">
                    <span>{{ $t("sheng-yu") }}</span>:{{ Number(item.power) - Number(item.usedPower) }}
                    <!-- {{ item.usedPower }}/{{ item.power }} -->
                  </view>
                </view>
              </template>
            </up-swiper>
          </view>
          <view v-else class="w-1/2 flex items-center justify-center">
            <view class="text-[14px] text-[#999]">
              {{ $t("mei-you-suan-li-fu-wu-qi") }}
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
              Xcoin <span>{{ $t("yu-e") }}</span>
            </view>
          </view>
          <view class="h-[50px] w-[1px] bg-[#374447]" />
          <view
            class="w-1/2 flex flex-col items-center justify-center"
            @click="handleToUrl('/pages/server/index')"
          >
            <up-icon name="plus" size="20px" class="h-[25px]" color="#fff" />
            <view class="mt-[5px] text-center text-[14px]">
              {{ $t("suan-li-fu-wu-qi") }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view>
      <view class="mb-[10px] flex items-center justify-between text-[12px]">
        <view>
          <span> {{ $t("ai-dui-hua") }}</span>
          {{
            taskData.todayChatCount > taskData.taskTarget
              ? taskData.taskTarget
              : taskData.todayChatCount
          }}/{{ taskData.taskTarget }}
        </view>
        <view>
          <span>{{ $t("jiang-li") }}</span>{{ formatAmount(taskData.rewardAmount) }}Xcoin
        </view>
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
      v-if="clearComputingPower0Show"
      class="mt-[5px]"
      type="warning"
      :description="
        $t(
          'xian-gou-fu-wu-qi-suan-li-zhi-sheng-yu-1-qing-an-shi-wan-cheng-ren-wu-24-xiao-shi-hou-zi-dong-qing-ling-qing-qian-wang-zu-lin-fu-wu-qi-bu-chong-suan-li-zhi',
        )
      "
      font-size="12"
      @click="handleToUrl('/pages/server/index')"
    />
    <up-alert
      v-if="userInfo.roleId === -1"
      class="mt-[5px]"
      type="error"
      :description="
        $t(
          'dang-qian-wei-you-ke-mo-shi-qing-jin-kuai-deng-lu-zhang-hao-jiu-neng-jie-suo-zheng-shi-jiang-lio-dian-ji-deng-lu',
        )
      "
      font-size="12"
      @click="handleClickAlert"
    />
    <up-alert
      v-if="userInfo.roleId === 1"
      class="mt-[5px]"
      type="error"
      :description="
        $t('dang-qian-zhang-hu-wei-ji-huo-qing-jin-kuai-lian-xi-ke-fu-ji-huo')
      "
      font-size="12"
      @click="openExternalUrl(userInfo.customer.link)"
    />
    <!-- @click="handleClickAlert" -->

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
            {{ $t("jiang-li-ti-shi") }}
          </div>
        </div>

        <!-- 内容卡片（优化背景/内边距/文字排版） -->
        <div
          class="mb-[8px] w-full border border-[#FFE8DD] rounded-[12px] bg-[#FFF9F6] p-[16px]"
        >
          <div class="text-[15px] text-[#333333] leading-[1.5]">
            {{
              $t(
                "ni-yi-cheng-gong-ling-qu-ti-yan-jiang-li-la-xian-zai-deng-lu-zhang-hao-jiu-neng-jie-suo-zheng-shi-jiang-lio",
              )
            }}
          </div>
        </div>

        <!-- 小字提示（增加引导性） -->
        <div class="mb-[4px] text-[12px] text-[#999999]">
          {{ $t("deng-lu-hou-hui-you-geng-duo-de-jiang-li-o") }}
        </div>
      </div>
    </up-modal>
    <span />
    <span />
    <up-modal
      :show="showLoginModalUser1"
      show-cancel-button
      :confirm-text="$t('li-ji-lian-xi')"
      :cancel-text="$t('shao-hou-zai-shuo')"
      confirm-color="#FF6738"
      confirm-bg-color="#FF6738"
      cancel-color="#666666"
      cancel-bg-color="#F5F5F5"
      modal-radius="12px"
      button-radius="8px"
      style="z-index: 1000"
      @cancel="showLoginModalUser1 = false"
      @confirm="openExternalUrl(userInfo.customer.link)"
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
            <!-- {{ $t("jiang-li-ti-shi") }} -->
            {{ $t("ti-shi") }}
          </div>
        </div>

        <!-- 内容卡片（优化背景/内边距/文字排版） -->
        <div
          class="mb-[8px] w-full border border-[#FFE8DD] rounded-[12px] bg-[#FFF9F6] p-[16px]"
        >
          <div class="text-[15px] text-[#333333] leading-[1.5]">
            <!-- {{
              $t(
                "ni-yi-cheng-gong-ling-qu-ti-yan-jiang-li-la-xian-zai-deng-lu-zhang-hao-jiu-neng-jie-suo-zheng-shi-jiang-lio",
              )
            }} -->
            {{ $t("dang-qian-zhang-hu-wei-ji-huo-qing-lian-xi-ke-fu-ji-huo") }}
          </div>
        </div>

        <!-- 小字提示（增加引导性） -->
        <div class="mb-[4px] text-[12px] text-[#999999]">
          <!-- {{ $t("deng-lu-hou-hui-you-geng-duo-de-jiang-li-o") }} -->
          {{
            $t(
              "ji-huo-hou-ji-ke-shi-yong-suo-you-gong-neng-he-geng-duo-jiang-li",
            )
          }}
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
