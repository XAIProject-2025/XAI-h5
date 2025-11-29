<template>
  <div class="chat-item">
    <!-- 时间 -->
    <text v-if="item.time && item.time.length" class="chat-time">
      {{ item.time }}
    </text>

    <div class="chat-container" :class="{ 'chat-location-me': item.isMe }">
      <!-- 头像 -->
      <div class="chat-icon-container">
        <image v-if="!item.isMe" class="h-[40px] w-[40px]" src="/static/images/avatar.png" mode="scaleToFill" />
        <image v-else class="h-[40px] w-[40px]" src="/static/images/avatar_my.png" mode="scaleToFill" />
        <!-- <image class="chat-icon" :src="item.icon" mode="aspectFill" /> -->
      </div>

      <!-- 内容 -->
      <div class="chat-content-container">
        <!-- <span class="chat-user-name" :class="{ 'chat-location-me': item.isMe }">
          {{ item.name }}
        </span> -->

        <div class="chat-text-container-super" :style="[{ justifyContent: item.isMe ? 'flex-end' : 'flex-start' }]">
          <div class="chat-text-container" :class="{ 'chat-text-container-me': item.isMe }">
            <span class="chat-text" :class="{ 'chat-text-me': item.isMe }">
              {{ item.content }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Props
 */
defineProps({
  item: {
    type: Object,
    default: () => ({
      time: '',
      icon: '',
      name: '',
      content: '',
      isMe: false,
    }),
  },
})
</script>

<style scoped>
.chat-item {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
}

.chat-time {
  padding: 4rpx 0rpx;
  text-align: center;
  font-size: 22rpx;
  color: #aaaaaa;
}

.chat-container {
  display: flex;
  flex-direction: row;
}

.chat-location-me {
  flex-direction: row-reverse;
  text-align: right;
}

.chat-icon-container {
  margin-top: 12rpx;
}

.chat-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #eeeeee;
}

.chat-content-container {
  margin: 0rpx 15rpx;
  display: flex;
  align-items: center;
}

.chat-user-name {
  font-size: 26rpx;
  color: #888888;
}

.chat-text-container {
  text-align: left;
  background-color: #fff;
  box-shadow: 0rpx 3rpx 6rpx rgba(148, 153, 154, 0.16);
  border-radius: 8rpx;
  padding: 10rpx 15rpx;
  margin-top: 10rpx;
  max-width: 500rpx;
}

.chat-text-container-me {
  background-color: #000;
}

.chat-text-container-super {
  display: flex;
  flex-direction: row;
}

.chat-text {
  font-size: 28rpx;
  word-break: break-all;
}

.chat-text-me {
  color: white;
}
</style>
