<template>
  <div class="page">
    <!-- 聊天区域 -->
    <div ref="chatListRef" class="chat-list">
      <!-- 加载历史提示 -->
      <view v-if="loadingHistory" class="history-loading">
        加载中...
      </view>

      <!-- 消息列表 -->
      <view v-for="(msg, i) in messages" :key="msg.id" class="msg-item">
        <view class="time">
          {{ formatTime(msg.time) }}
        </view>

        <!-- AI 消息 -->
        <view v-if="msg.role === 'assistant'" class="row left">
          <image src="/static/images/avatar.png" class="avatar" />
          <view class="bubble left-b animate-bubble" @longpress="copy(msg.text)">
            <view v-if="msg.folded">
              {{ msg.shortText }}...
              <text class="expand" @tap="expand(msg)">展开</text>
            </view>
            <view v-else>
              {{ msg.text }}
            </view>
          </view>
        </view>

        <!-- 用户消息 -->
        <view v-else class="row right">
          <view class="bubble right-b animate-bubble" @longpress="copy(msg.text)">
            {{ msg.text }}
          </view>
          <image src="/static/images/avatar.png" class="avatar" />
        </view>
      </view>

      <!-- 正在输入提示 -->
      <view v-if="typing" class="typing-animation">
        <view class="dot" />
        <view class="dot" />
        <view class="dot" />
      </view>
    </div>

    <!-- 输入区域 -->
    <view class="px-[20px] text-[14px] text-[#666]">
      <span class="mr-[10px]">发送 5 条消息即可领取奖励</span>
      <span>还剩 3 条消息
      </span>
    </view>
    <view class="input-box">
      <textarea
        v-model="input" class="textarea" auto-height :adjust-position="false" :cursor-spacing="12"
        placeholder="输入内容…" confirm-type="send" @confirm="send"
      />
      <view class="send-btn" @tap="send">
        <view v-if="sending" class="sending-dot" />
        <view v-else class="h-[20px] w-[20px]">
          <image src="/static/index/send.png" class="h-full w-full" alt="" />
          <!-- 发送 -->
        </view>
      </view>
    </view>
  </div>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'

const input = ref('')
const messages = ref([])
const typing = ref(false)
const sending = ref(false)
const loadingHistory = ref(false)
const chatListRef = ref(null)

// 生成随机 id
function uuid() {
  return `msg-${Math.random().toString(36).slice(2)}`
}

// 格式化时间
function formatTime(ts) {
  const d = new Date(ts)
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

// 滚动到底部
function scrollBottom() {
  nextTick(() => {
    const list = chatListRef.value
    if (list)
      list.scrollTop = list.scrollHeight
  })
}

// 加载历史消息
function loadMoreHistory() {
  if (loadingHistory.value)
    return
  loadingHistory.value = true

  setTimeout(() => {
    const old = []
    for (let i = 0; i < 5; i++) {
      old.push({
        id: uuid(),
        role: 'assistant',
        text: `历史消息 ${(Math.random() * 100).toFixed(0)}`,
        time: Date.now() - (i + 1) * 100000,
        folded: false,
      })
    }
    messages.value.unshift(...old)
    loadingHistory.value = false
  }, 600)
}

// 长消息折叠
function handleFold(msg) {
  if (msg.text.length > 120) {
    msg.folded = true
    msg.shortText = msg.text.slice(0, 120)
  }
}

function expand(msg) {
  msg.folded = false
}

// 流式 AI 回复
async function streamReply(fullText) {
  typing.value = true

  const id = uuid()
  const msg = reactive({
    id,
    role: 'assistant',
    text: '',
    time: Date.now(),
    folded: false,
  })
  messages.value.push(msg)
  scrollBottom()

  for (let i = 0; i < fullText.length; i++) {
    await sleep(15)
    msg.text += fullText[i]
    if (i % 5 === 0)
      scrollBottom()
  }

  typing.value = false
  handleFold(msg)
  scrollBottom()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}

// 发送消息
function send() {
  if (!input.value.trim() || sending.value)
    return

  const txt = input.value
  input.value = ''
  sending.value = true

  const msg = {
    id: uuid(),
    role: 'user',
    text: txt,
    time: Date.now(),
  }
  messages.value.push(msg)
  scrollBottom()

  setTimeout(() => {
    sending.value = false
    streamReply(`AI 回复：${txt}`)
  }, 500)
}

// 复制文本
function copy(text) {
  navigator.clipboard.writeText(text).then(() => { })
}

// 初始化聊天
function init() {
  const m = {
    id: uuid(),
    role: 'assistant',
    text: '你好，我是你的聊天助手。',
    time: Date.now(),
    folded: false,
  }
  messages.value.push(m)
  scrollBottom()
}

init()
</script>

<style scoped>
/* 样式保持原样 */
.page {
  display: flex;
  flex-direction: column;
  background: #fff;
}

.chat-list {
  flex: 1;
  padding: 20rpx;
  overflow-y: auto;
  /* 原生滚动 */
  max-height: 50vh;
  min-height: 50vh;
  box-sizing: border-box;
  /* 隐藏滚动条 */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.chat-list::-webkit-scrollbar {
  width: 0px;
  /* Chrome, Safari, Opera */
  background: transparent;
}

.msg-item {
  margin-bottom: 26rpx;
}

.time {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 14rpx;
}

.row {
  display: flex;
  align-items: flex-start;
}

.left {
  justify-content: flex-start;
}

.right {
  justify-content: flex-end;
}

.bubble {
  max-width: 72%;
  padding: 26rpx;
  background: #fff;
  border-radius: 18rpx;
  font-size: 28rpx;
  line-height: 1.6;
  word-break: break-word;
}

.left-b {
  background: #ffffff;
}

.right-b {
  background: #38ff93;
  color: #000;
}

.avatar {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}

.row.right .avatar {
  margin-left: 10rpx;
  margin-right: 0;
}

.expand {
  color: #3f798f;
  font-size: 26rpx;
}

.animate-bubble {
  animation: bubbleIn 0.15s ease-out;
}

@keyframes bubbleIn {
  from {
    transform: scale(0.9);
    opacity: 0.2;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.typing-animation {
  flex-direction: row;
  display: flex;
  padding-left: 20rpx;
  margin: 20rpx 0;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  background: #ccc;
  border-radius: 50%;
  animation: blink 1s infinite;
  margin-right: 10rpx;
}

@keyframes blink {
  0%,
  80% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }
}

.input-box {
  display: flex;
  padding: 20rpx;
  background: #fff;
}

.textarea {
  flex: 1;
  background: #f2f2f2;
  padding: 20rpx;
  border-radius: 16rpx;
  font-size: 28rpx;
}

.send-btn {
  background: #3f798f;
  color: #fff;
  padding: 0 32rpx;
  margin-left: 20rpx;
  border-radius: 14rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sending-dot {
  width: 20rpx;
  height: 20rpx;
  background: #fff;
  border-radius: 50%;
  animation: sending 0.6s infinite alternate;
}

@keyframes sending {
  from {
    opacity: 0.3;
  }

  to {
    opacity: 1;
  }
}

.history-loading {
  text-align: center;
  font-size: 26rpx;
  color: #999;
  padding: 20rpx 0;
}
</style>
