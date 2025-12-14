<template>
  <view class="content">
    <z-paging
      ref="paging" v-model="dataList" use-chat-record-mode safe-area-inset-bottom bottom-bg-color="#f8f8f8"
      empty-view-text="完成任务领取奖励" @query="queryList" @keyboard-height-change="keyboardHeightChange"
      @hided-keyboard="hidedKeyboard"
    >
      <template #top>
        <index-top />
      </template>

      <!-- 聊天记录 -->
      <view v-for="(item, index) in dataList" :key="index">
        <view style="transform: scaleY(-1)">
          <chat-item :item="item" />
        </view>
      </view>

      <template #bottom>
        <chat-input-bar ref="inputBar" :disabled="isAnswering" @send="doSend" />
      </template>
    </z-paging>
  </view>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { getChatHistory } from '@/api/index'
import { useTokenStore } from '@/store/token'
import chatInputBar from './components/chat-input-bar.vue'
import chatItem from './components/chat-item.vue'
import indexTop from './components/indexTop.vue'

defineOptions({ name: 'Home' })

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '%tabbar.home%',
  },
})

/* ================= 配置 ================= */

const STREAM_URL
  = 'https://www.eladmin-test.click/app-api/api/v1/chat/stream'

/* ================= 状态 ================= */

const dataList = ref([])
const paging = ref(null)
const inputBar = ref(null)
const isAnswering = ref(false)
let abortController = null

/* ================= 初始化 ================= */

onMounted(async () => {
  uni.showLoading({ title: '加载中...' })
  const res = await getChatHistory()
  dataList.value = res?.content || []
  uni.hideLoading()
})

/* ================= z-paging ================= */

function queryList() {
  paging.value.complete([])
}

function keyboardHeightChange(res) {
  inputBar.value?.updateKeyboardHeightChange(res)
}

function hidedKeyboard() {
  inputBar.value?.hidedKeyboard()
}

/* ================= 发送 ================= */

function doSend(msg) {
  if (isAnswering.value)
    return

  // 用户消息
  paging.value.addChatRecordData({
    icon: '/static/daxiong.jpg',
    name: '大雄',
    content: msg,
    isMe: true,
  })

  // AI 占位消息
  paging.value.addChatRecordData({
    icon: '/static/duola.jpg',
    name: '哆啦A梦',
    content: '',
    isMe: false,
  })

  nextTick(() => {
    const aiItem = dataList.value.find(
      i => i.isMe === false && i.content === '',
    )
    if (aiItem)
      startStream(aiItem, msg)
  })
}

/* ================= POST 流式 ================= */

async function startStream(aiItem, message) {
  isAnswering.value = true
  abortController = new AbortController()

  try {
    const res = await fetch(STREAM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'Authorization': useTokenStore().validToken,
      },
      body: JSON.stringify({ message, chatId: '123' }),
      signal: abortController.signal,
    })
    console.log('res :>> ', res)
    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')

    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done)
          break

        handleStreamChunk(
          decoder.decode(value, { stream: true }),
          aiItem,
        )
      }
    }
    catch (err) {
      // ✅ 关键：这里吞掉 AbortError
      if (err.name === 'AbortError') {
        console.log('reader 被中断（正常）')
      }
      else {
        throw err
      }
    }
  }
  catch (err) {
    if (err.name === 'AbortError') {
      console.log('fetch 被中断（正常）')
      return
    }
    console.error('流式异常', err)
    aiItem.content += '\n【生成失败】'
  }
  finally {
    stopStream()
  }
}

/* ================= 解析 SSE ================= */

function handleStreamChunk(text, aiItem) {
  if (!text)
    return

  text.split(/\n+/).forEach((line) => {
    if (!line.startsWith('data:'))
      return

    const data = line.slice(5).trim()
    if (!data || data === '[DONE]')
      return

    // 1️⃣ 修改内容
    aiItem.content += data
    console.log('aiItem :>> ', aiItem)
    // 2️⃣ 强制通知 z-paging 更新聊天项（关键）
  })
}

/* ================= 停止 ================= */

function stopStream() {
  abortController = null
  isAnswering.value = false
}
function abortByUser() {
  abortController?.abort()
}
/* ================= 触底 ================= */

onReachBottom(() => {
  paging.value?.doLoadMore()
})
</script>

<style scoped>
.popup {
  position: absolute;
  top: -20px;
  height: 200rpx;
  width: 400rpx;
  background-color: red;
  z-index: 1000;
}
</style>
