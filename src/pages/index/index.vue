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
      <!-- 聊天记录渲染 -->
      <view v-for="(item, index) in dataList" :key="index" style="position: relative;">
        <view style="transform: scaleY(-1);">
          <chat-item :item="item" />
        </view>
      </view>
      <!-- 底部输入框 -->
      <template #bottom>
        <chat-input-bar ref="inputBar" :disabled="isAnswering" @send="doSend" />
      </template>
    </z-paging>
  </view>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { getChatHistory, getChatLose } from '@/api/index'
import chatInputBar from './components/chat-input-bar.vue'
import chatItem from './components/chat-item.vue'
import indexTop from './components/indexTop.vue'

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

// 聊天记录
const dataList = ref([])
onMounted(async () => {
  uni.showLoading({
    title: '加载中...',
  })
  const chatHistoryRes = await getChatHistory()
  dataList.value = chatHistoryRes.content
  uni.hideLoading()
})
const paging = ref(null)
const inputBar = ref(null)

// 当前用户发送的问题
const askMsg = ref('')

// 是否正在回答中
const isAnswering = ref(false)

// 分页加载（聊天记录翻页用）
function queryList(pageNo, pageSize) {
  // 示例：真实项目应该请求历史聊天记录
  // paging.value.complete([])

  // 示例先返回空
  paging.value.complete([])
}

// 监听键盘高度改变
function keyboardHeightChange(res) {
  inputBar.value?.updateKeyboardHeightChange(res)
}

// 隐藏键盘（如果有表情面板）
function hidedKeyboard() {
  inputBar.value?.hidedKeyboard()
}

// 发送消息
async function doSend(msg) {
  if (isAnswering.value)
    return

  askMsg.value = msg

  paging.value.addChatRecordData({
    time: '',
    icon: '/static/daxiong.jpg',
    name: '大雄',
    content: msg,
    isMe: true,
  })

  doAnswer()
}

// 回复消息（流式）
async function doAnswer() {
  isAnswering.value = true

  // 添加“思考中...”
  paging.value.addChatRecordData({
    time: '',
    icon: '/static/duola.jpg',
    name: '哆啦A梦',
    content: '思考中...',
    isMe: false,
  })

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  const chatLose = await getChatLose({
    message: askMsg.value,
    chatId: '123',
  })
  console.log(chatLose)
  const totalAnswerStr = `你发送了：${askMsg.value}`
  let currentStr = ''

  // 最后一条记录就是“思考中”的那条
  const lastItem = dataList.value[0]

  streamTextAsync(totalAnswerStr, (char) => {
    currentStr += char
    lastItem.content = currentStr

    if (currentStr.length === totalAnswerStr.length) {
      isAnswering.value = false
    }
  })
}

// 模拟流式输出
async function streamTextAsync(text, callback, interval = 150) {
  for (const char of text) {
    callback(char)
    await new Promise(resolve => setTimeout(resolve, interval))
  }
}

// 触底加载更多（微信/APP）
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
