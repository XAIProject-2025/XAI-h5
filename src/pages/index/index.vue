<template>
  <view class="content">
    <z-paging
      ref="paging"
      v-model="dataList"
      use-chat-record-mode
      safe-area-inset-bottom
      bottom-bg-color="#f8f8f8"
      empty-view-text="完成任务领取奖励"
      @query="queryList"
      @keyboard-height-change="keyboardHeightChange"
      @hided-keyboard="hidedKeyboard"
    >
      <template #top>
        <index-top ref="indexTopRef" @get-task="getTask" />
      </template>
      <view
        v-for="(item, index) in dataList"
        :key="index"
        style="position: relative"
      >
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
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import { getChatHistory, getChatLose } from '@/api/index'
import { t } from '@/locale/index'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'
import chatInputBar from './components/chat-input-bar.vue'
import chatItem from './components/chat-item.vue'
import indexTop from './components/indexTop.vue'

defineOptions({
  name: 'Home',
})
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
let abortController = null

const STREAM_URL
  = 'https://www.eladmin-test.click/app-api/api/v1/chat/stream'

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
const uNotifyRef = ref(null)
const taskData = ref({})
async function getTask(data) {
  taskData.value = data
}
onMounted(async () => {
  uni.showLoading({
    title: t('jia-zai-zhong'),
  })
  const chatHistoryRes = await getChatHistory()
  dataList.value = chatHistoryRes.content
  uni.hideLoading()
  await userStore.fetchUserInfo()
  // uNotifyRef.value.show({
  //   top: 200,
  //   type: 'error',
  //   color: '#000',
  //   bgColor: '#e8e8e8',
  //   message: 'Hi uview-plus',
  //   duration: 1000 * 3,
  //   fontSize: 20,
  //   safeAreaInsetTop: true,
  // })
})
const paging = ref(null)
const inputBar = ref(null)
const indexTopRef = ref(null)
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
  console.log('userInfo :>> ', userInfo)
  console.log('taskData.value.hasPower :>> ', taskData.value.hasPower)
  if (userInfo.value.roleId === -1 && taskData.value.taskCompleted) {
    indexTopRef.value.openShowLoginModal()
    return
  }

  askMsg.value = msg

  paging.value.addChatRecordData({
    time: '',
    icon: '/static/daxiong.jpg',
    name: '大雄',
    msg,
    role: 'user',

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
    msg: '思考中...',
    role: 'assistant',
    _streamStarted: false, // 👈 关键

  })

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  const totalAnswerStr = `${askMsg.value}`

  // 最后一条记录就是“思考中”的那条
  const lastItem = dataList.value[0]
  startStream(lastItem, totalAnswerStr)
  // streamTextAsync(totalAnswerStr, (char) => {
  //   console.log('lastItem :>> ', lastItem)
  //   currentStr += char
  //   lastItem.msg = currentStr

  //   if (currentStr.length === totalAnswerStr.length) {
  //     isAnswering.value = false
  //   }
  // })
}

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
        indexTopRef.value.fetchCountToXcoin()
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
    aiItem.msg += '\n【生成失败】'
  }
  finally {
    stopStream()
  }
}

function handleStreamChunk(text, aiItem) {
  if (!text)
    return

  text.split(/\n+/).forEach((line) => {
    if (!line.startsWith('data:'))
      return

    const data = line.slice(5).trim()
    if (!data || data === '[DONE]')
      return

    // ✅ 第一次真正收到 AI 内容
    if (!aiItem._streamStarted) {
      aiItem._streamStarted = true
      aiItem.msg = '' // 🔥 清空“思考中...”
    }

    aiItem.msg += data
  })
}

/* ================= 停止 ================= */

function stopStream() {
  abortController = null
  isAnswering.value = false
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
