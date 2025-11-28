<script setup lang="ts">
import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { currRoute } from './utils'

const tokenStore = useTokenStore()

onShow(() => {
  const { path } = currRoute()
  // “蜡笔小开心”提到本地是 '/pages/index/index'，线上是 '/' 导致线上 tabbar 不见了
})
const navigationRef = ref(null)

const exposeRef = ref('this is form app.Ku.vue')

defineExpose({
  exposeRef,
})
</script>

<template>
  <view>
    <up-navbar v-if="tokenStore.hasLogin" placeholder class="bg-shadow" height="52px">
      <template #left>
        <image
          src="/static/images/burgerButton.png" class="mt-[5px] h-[40px] w-[40px]"
          @click="navigationRef.openPopup()"
        />
      </template>
    </up-navbar>
    <!-- 这个先隐藏了，知道这样用就行 -->
    <!-- <view class="hidden text-center">
      {{ helloKuRoot }}，这里可以配置全局的东西
    </view> -->

    <KuRootView />
    <navigation ref="navigationRef" />
    <!-- <FgTabbar v-if="isCurrentPageTabbar" /> -->
  </view>
</template>
