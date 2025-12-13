<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getChatTask } from '@/api'
import { useUserStore } from '@/store'
import { formatAmount, handleToUrl, openExternalUrl } from '@/utils/util'

const userStore = useUserStore()
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
onMounted(async () => {
  const getChatTaskRes = await getChatTask()
  taskData.value = getChatTaskRes
})
</script>

<template>
  <view class="p-[15px] pt-[100px]" :class="systemInfo.uniPlatform === 'web' ? 'pt-[60px]' : 'pt-[100px]'">
    <view>
      <view class="flex items-center justify-between px-[20px]">
        <view class="flex items-center">
          <up-image :width="40" :height="40" round src="/static/images/ai_logo.png" />
          <view class="ml-[20px]">
            <view class="text-[14px] text-[#666]">
              客服代码
            </view>
            <view class="mt-[2px] text-[12px]">
              6VAI005
            </view>
          </view>
        </view>
        <view class="flex items-center">
          <up-image
            v-if="userInfo.roleId === 2" :width="40" :height="50" class="mr-[10px]"
            src="/static/level/type_1.gif"
          />
          <up-image
            v-if="userInfo.roleId === 1" :width="40" :height="50" class="mr-[10px]"
            src="/static/level/type_2.gif"
          />
          <up-image
            v-if="userInfo.roleId === 3" :width="40" :height="50" class="mr-[10px]"
            src="/static/level/type_3.gif"
          />
          <up-image
            v-if="userInfo.roleId === 4" :width="40" :height="50" class="mr-[10px]"
            src="/static/level/type_4.gif"
          />
          <!-- <up-image :width="40" :height="40" class="mr-[20px]" src="/static/images/avatar.png" /> -->
          <up-image
            :width="50" :height="50" src="/static/index/tg.png"
            @click="openExternalUrl(userInfo.tgCustomerLink)"
          />
        </view>
      </view>
      <!-- <view class="my-[15px] h-[1px] w-full bg-[transparent]" /> -->
      <view class="bg mb-[10px] mt-[10px] py-[25px] text-[#fff]">
        <view class="flex items-center justify-between px-[20px]">
          <view class="w-1/2 flex items-center justify-center">
            <up-image :width="60" :height="60" round src="/static/images/avatar.png" />
            <view class="ml-[15px]">
              <view class="mb-[5px] text-[14px]">
                {{ userInfo.name }}
              </view>
              <level />
            </view>
          </view>
          <view class="w-1/2 flex items-center justify-center">
            <up-swiper
              class="w-[150px] !h-[40px] !bg-[transparent]" :list="swiperList" @change="onChange"
              @click="handleClick"
            >
              <template #default="{ item, index }">
                <view class="w-full flex flex-col items-center justify-center text-[14px]">
                  <view class="">
                    {{ index }}
                  </view>
                  <view class="mt-[5px]">
                    算力服务器
                  </view>
                </view>
              </template>
            </up-swiper>
          </view>
        </view>
        <view class="mx-auto my-[12px] h-[1px] w-[90%] bg-[#374447]" />

        <view class="flex items-center justify-between px-[20px]">
          <view class="w-1/2 flex flex-col items-center justify-center">
            <view class="mt-[2px] flex text-[18px] font-bold">
              <up-count-to
                bold :start-val="0" :decimals="2" :end-val="userInfo.kdkBalance" :font-size="18"
                color="#fff"
              />
              <view class="ml-[5px]">
                KDK
              </view>
            </view>
            <view class="mt-[5px] text-[14px]">
              算力币余额
            </view>
          </view>
          <view class="h-[50px] w-[1px] bg-[#374447]" />
          <view class="w-1/2 flex flex-col items-center justify-center" @click="handleToUrl('/pages/server/index')">
            <up-icon name="plus" size="20px" class="h-[25px]" color="#fff" />
            <view class="mt-[5px] text-[14px]">
              产品中心
            </view>
          </view>
        </view>
      </view>
    </view>
    <view>
      <view class="mb-[10px] flex items-center justify-between text-[12px]">
        <view>AI对话 {{ taskData.todayChatCount }}/{{ taskData.taskTarget }}</view>
        <view>奖励{{ formatAmount(taskData.rewardAmount) }}KDK</view>
      </view>
      <up-line-progress
        height="16px" :percentage="(taskData.todayChatCount / taskData.taskTarget * 100).toFixed(2)"
        active-color="#000"
      />
    </view>
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
