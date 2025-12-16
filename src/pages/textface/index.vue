<template>
  <view class="container">
    <web-view
      id="faceWebview"
      :src="iframeUrl"
      class="webview"
      allow="camera; microphone; autoplay"
      allowfullscreen
      style="height: 100%"
    />
    <image v-if="snapshot" :src="snapshot" class="snapshot" />
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const snapshot = ref('')
// iframe 页面地址
const iframeUrl = 'https://face.eladmin-test.click/?type=0'

let webview = null

onMounted(() => {
  if (process.env.PLATFORM === 'app-plus') {
    // App-Plus: 使用 plus.webview
    webview = plus.webview.getWebviewById('faceWebview') || plus.webview.create(iframeUrl, 'faceWebview', {
      hardwareAccelerated: true,
      allowFileAccess: true,
      mediaPlaybackRequiresUserGesture: false,
    })
    webview.show()
  }
  else {
    // H5: 获取 iframe DOM
    webview = document.getElementById('faceWebview')
  }

  // 接收 iframe 回传消息
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
