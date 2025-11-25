<script lang="ts" setup>
defineOptions({
  name: 'Home',
})
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '%tabbar.home%',
  },
})

const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite5 + UnoCss + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)
console.log('index/index 首页打印了')

onLoad(() => {
  console.log('测试 uni API 自动引入: onLoad')
})
const current = ref<number>(0)

const swiperList = ref([
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg',
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}
</script>

<template>
  <view class="p-[15px]">
    <view class="border border-[#eeefeb] rounded-[8px] border-solid bg-[#fefffb] py-[10px]">
      <view class="flex items-center justify-between px-[20px]">
        <view class="flex items-center">
          <up-image :width="40" :height="40" round src="/static/images/avatar.jpg" />
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
          <up-image :width="40" :height="40" class="mr-[20px]" src="/static/images/avatar.jpg" />
          <up-image :width="40" :height="40" src="/static/index/tg.png" />
        </view>
      </view>
      <view class="my-[15px] h-[1px] w-full bg-[#eeefeb]" />
      <view class="flex items-center justify-between px-[20px]">
        <view class="flex items-center">
          <up-image :width="40" :height="40" round src="/static/images/avatar.jpg" />
          <view class="ml-[20px]">
            <view class="text-[14px]">
              用户名
            </view>
            <view
              class="mt-[2px] flex items-center justify-start rounded-[8px] bg-[#407e8c] px-[10px] py-[2px] text-[12px] text-white"
            >
              <up-image :width="15" :height="15" round src="/static/index/level_icon.png" class="mr-[5px]" />
              P1
            </view>
          </view>
        </view>
        <up-swiper
          class="w-[150px] !h-[40px] !bg-[transparent]" :list="swiperList" @change="onChange"
          @click="handleClick"
        >
          <template #default="{ item, index }">
            <view class="w-full flex flex-col items-center justify-center text-[14px]">
              <view class="">
                {{ index }}
              </view>
              <view class="text-[#666]">
                算力服务器
              </view>
            </view>
          </template>
        </up-swiper>
      </view>
      <view class="my-[15px] h-[1px] w-full bg-[#eeefeb]" />

      <view class="flex items-center justify-between px-[20px]">
        <view class="w-1/2 flex flex-col items-center justify-center">
          <view class="mt-[2px] flex text-[18px] font-bold">
            <up-count-to bold :start-val="0" :decimals="2" :end-val="10000" :font-size="18" color="#000" />
            <view class="ml-[5px]">
              KDK
            </view>
          </view>
          <view class="text-[14px] text-[#666]">
            算力币余额
          </view>
        </view>
        <view class="w-1/2 flex flex-col items-center justify-center">
          <up-icon name="plus" size="20px" class="h-[25px]" color="#000" />
          <view class="text-[14px] text-[#666]">
            产品中心
          </view>
        </view>
      </view>
    </view>
    <view class="my-[15px]">
      <up-line-progress :percentage="30" active-color="#3f808a" />
    </view>
  </view>
</template>

<style scoped lang="scss">
:deep(.u-swiper__wrapper) {
  height: 40px !important;
}
</style>
