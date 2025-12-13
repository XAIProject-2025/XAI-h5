<template>
  <view class="chat-input-bar-container" @touchmove.stop.prevent>
    <view class="chat-input-bar">
      <view class="chat-input-container">
        <!-- 必须关闭自动上顶：adjust-position="false" -->
        <input
          v-model="msg" :focus="focus" class="chat-input" :adjust-position="false" type="text" confirm-type="send"
          placeholder="请输入内容" @confirm="sendClick"
        >
      </view>
      <!-- 发送按钮 -->
      <div @click="sendClick">
        <!-- <text class="chat-input-send-text">发送</text> -->
        <up-image src="/static/index/tg.png" width="50" height="50" class="ml-[5px]" alt="" />
      </div>
    </view>
  </view>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '@/store'

/**
 * Props
 */
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
/**
 * Emits
 */
const emit = defineEmits(['send', 'emojiTypeChange'])
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
/**
 * State
 */
const msg = ref('')
const focus = ref(false)
const emojiType = ref('') // "" | "emoji" | "keyboard"

/**
 * Computed
 */
const sendEnabled = computed(() => {
  return !props.disabled && msg.value.length > 0
})

/**
 * Methods
 */

// 键盘高度变更（z-paging 回调）
function updateKeyboardHeightChange(res) {
  if (res.height > 0) {
    emojiType.value = 'emoji'
  }
}

// 用户隐藏键盘
function hidedKeyboard() {
  if (emojiType.value === 'keyboard') {
    emojiType.value = ''
  }
}

// 发送消息
function sendClick() {
  if (!sendEnabled.value)
    return

  emit('send', msg.value)
  msg.value = ''
}

/**
 * 暴露给父组件（chat 页面）
 */
defineExpose({
  updateKeyboardHeightChange,
  hidedKeyboard,
})
</script>

<style scoped>
.chat-input-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: solid 1px #f5f5f5;
  background-color: #f8f8f8;

  padding: 10rpx 20rpx;
}

.chat-input-container {
  flex: 1;
  display: flex;
  padding: 15rpx;
  background-color: white;
  border-radius: 10rpx;
}

.chat-input {
  flex: 1;
  font-size: 28rpx;
}

.emoji-container {
  width: 54rpx;
  height: 54rpx;
  margin: 10rpx 0rpx 10rpx 20rpx;
}

.emoji-img {
  width: 54rpx;
  height: 54rpx;
}

.chat-input-send {
  background-color: #007aff;
  margin: 10rpx 10rpx 10rpx 20rpx;
  border-radius: 10rpx;
  width: 110rpx;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-input-send-disabled {
  background-color: #bbbbbb;
}

.chat-input-send-text {
  color: white;
  font-size: 26rpx;
}

.emoji-panel-container {
  background-color: #f8f8f8;
  overflow: hidden;
  transition-property: height;
  transition-duration: 0.15s;
  will-change: height;
}

.emoji-panel {
  font-size: 30rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: 10rpx;
  padding-left: 15rpx;
  padding-bottom: 10rpx;
}

.emoji-panel-text {
  font-size: 50rpx;
  margin-left: 15rpx;
  margin-top: 20rpx;
}
</style>
