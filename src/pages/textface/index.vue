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
import { useFaceStore } from '@/store/face'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})
const snapshot = ref('')
// iframe 页面地址
const iframeUrl = ref(null)

let webview = null

onMounted(() => {
  const tokenStore = useTokenStore()
  const token = tokenStore.validToken

  if (useFaceStore().type === 1) {
    iframeUrl.value = `${import.meta.env.VITE_FACE_BASEURL}?type=0`
  }
  else if (useFaceStore().type === 2) {
    iframeUrl.value = `${import.meta.env.VITE_FACE_BASEURL}?type=1&token=${token}`
  }
  else if (useFaceStore().type === 3) {
    iframeUrl.value = `${import.meta.env.VITE_FACE_BASEURL}?type=2`
  }
  else if (useFaceStore().type === 4) {
    iframeUrl.value = `${import.meta.env.VITE_FACE_BASEURL}?type=2`
  }
  else if (useFaceStore().type === 5) {
    iframeUrl.value = `${import.meta.env.VITE_FACE_BASEURL}?type=2`
  }
  else if (useFaceStore().type === 6) {
    iframeUrl.value = `${import.meta.env.VITE_FACE_BASEURL}?type=2`
  }
  // #ifdef APP-PLUS
  plus.android.requestPermissions(['android.permission.CAMERA'], (e) => {
    if (e.deniedAlways.length > 0) { // 权限被永久拒绝
      // 弹出提示框解释为何需要权限，引导用户打开设置页面开启
      console.log(`权限被永久拒绝${e.deniedAlways.toString()}`)
    }
    if (e.deniedPresent.length > 0) { // 权限被临时拒绝
      // 弹出提示框解释为何需要权限，可再次调用plus.android.requestPermissions申请权限
      console.log(`权限被临时拒绝${e.deniedPresent.toString()}`)
    }
    if (e.granted.length > 0) { // 权限被允许
      console.log(`权限被允许${e.granted.toString()}`)
    }
  }, (e) => {
    console.log(`Request Permissions error:${JSON.stringify(e)}`)
  })
  // #endif
  // uni.navigateTo({
  //   url: '/pages/mirror/index',
  // })
  // // App-Plus: 使用 plus.webview
  // webview = plus.webview.getWebviewById('faceWebview') || plus.webview.create(iframeUrl.value, 'faceWebview', {
  //   hardwareAccelerated: true,
  //   allowFileAccess: true,
  //   mediaPlaybackRequiresUserGesture: false,
  // })
  // webview.show()
  webview = document.getElementById('faceWebview')
  // // 接收 iframe 回传消息
  // window.addEventListener('message', (e) => {
  //   const data = e.data
  //   if (data.status === 'camera_started') {
  //     console.log('摄像头已启动')
  //   }
  //   else if (data.status === 'photo') {
  //     snapshot.value = data.base64
  //   }
  //   else if (data.status === 'camera_failed') {
  //     console.error('摄像头启动失败', data.error)
  //     uni.showToast({ title: '摄像头启动失败', icon: 'none' })
  //   }
  // })
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
