<template>
  <view class="container">
    <button @click="openCamera">
      打开摄像头
    </button>
    <button @click="takePhoto">
      拍照
    </button>
    <web-view id="faceWebview" :src="iframeUrl" class="webview" />
    <image v-if="snapshot" :src="snapshot" class="snapshot" />
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const snapshot = ref('')
// iframe 页面地址，可放在 /static/face.html 或线上 HTTPS
const iframeUrl = 'https://chenshiqi.mynatapp.cc?apiUrl=https://chenshiqi.mynatapp.cc'

let webview = null

onMounted(() => {
  console.log('process.env.PLATFORM  :>> ', process.env.PLATFORM)
  if (process.env.PLATFORM === 'app-plus') {
    console.log('111 :>> ', 111)
    // App-Plus: 获取 WebView 对象
    webview = plus.webview.getWebviewById('faceWebview') || plus.webview.create(iframeUrl, 'faceWebview', {
      hardwareAccelerated: true,
      allowFileAccess: true,
      mediaPlaybackRequiresUserGesture: false,
    })
    webview.show()
  }
  else {
    console.log('111 :>> ', 111)
    // H5: 不需要处理
    webview = document.getElementById('faceWebview')
  }

  // 监听 iframe / webview 回传消息
  window.addEventListener('message', (e) => {
    const data = e.data
    if (data.status === 'camera_started') {
      console.log('摄像头已启动')
    }
    else if (data.status === 'photo') {
      snapshot.value = data.base64
    }
    else if (data.status === 'camera_failed') {
      console.error('摄像头启动失败', data.error)
      uni.showToast({ title: '摄像头启动失败', icon: 'none' })
    }
  })
})

// 打开摄像头
function openCamera() {
  if (process.env.PLATFORM === 'h5') {
    webview.contentWindow.postMessage({ action: 'startCamera' }, '*')
  }
  else {
    // App-Plus
    webview.evalJS(`window.postMessage({action:'startCamera'}, '*')`)
  }
}

// 拍照
function takePhoto() {
  if (process.env.PLATFORM === 'h5') {
    webview.contentWindow.postMessage({ action: 'takePhoto' }, '*')
  }
  else {
    webview.evalJS(`window.postMessage({action:'takePhoto'}, '*')`)
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px 0;
}

.webview {
  width: 100%;
  max-width: 400px;
  height: 300px;
  border-radius: 10px;
}

.snapshot {
  margin-top: 20px;
  width: 200px;
  border-radius: 10px;
}
</style>
