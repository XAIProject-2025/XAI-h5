<script lang="ts" setup>
// 接收外部 props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => { },
  },
  buttonLoading: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '400px',
  },
})

// 抛出事件，供外部关闭弹窗
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
async function handleConfirm() {
  emit('confirm')
}
// 内部关闭方法
function onClose() {
  emit('close')
}
</script>

<template>
  <up-popup
    :show="props.show"
    mode="center"
    close-on-click-overlay
    :z-index="998"
    @close="onClose"
  >
    <view class="bg1" :style="{ height: props.height }">
      <slot />
      <div
        class="absolute bottom-[20px] w-full flex items-center justify-center"
      >
        <!-- <view class="btn-block--white h-[40px] w-[40%]" @click="onClose">
          取消
        </view> -->
        <view class="btn-block ml-[5%] h-[40px] w-[70%]" @click="handleConfirm">
          {{ props.buttonLoading ? $t("que-ren-zhong") : $t("que-ren") }}
          <up-loading-icon
            v-if="props.buttonLoading"
            size="14"
            mode="semicircle"
          />
        </view>
      </div>
      <div
        class="absolute bottom-[-50px] left-[50%] translate-x-[-50%]"
        @click="onClose"
      >
        <img class="h-[30px] w-[30px]" src="/static/server/close.png" alt="">
      </div>
    </view>
  </up-popup>
</template>

<style lang="scss" scoped>
.bg1 {
  background: url('/static/server/pupup_bg.png');
  background-size: 100% 100%;
  width: 80vw;
  position: relative;
}

:deep(.u-popup__content) {
  background-color: transparent;
}
</style>
