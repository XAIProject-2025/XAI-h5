<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'
import { useCommonStore } from '@/store/common'
import { useFaceStore } from '@/store/face'
import { handleToUrl, listenFaceLivenessSuccess } from '@/utils/util'

onLaunch((options) => {
  if (options?.query?.inviteCode) {
    useCommonStore().setInviteCode(options.query.inviteCode)
  }
  listenFaceLivenessSuccess((data, event) => {
    console.log('人脸活体检测成功:', JSON.parse(data))
    const faceInfo = JSON.parse(data)
    if (faceInfo.success === true) {
      useFaceStore().setFaceInfo(faceInfo)
      if (useFaceStore().type === 1) {
        handleToUrl('/pages-fg/login/register?faceAuth=true')
      }
    }
    else {
      console.log('人脸活体失败:', JSON.parse(data))
      uni.showToast({
        title: faceInfo.message || '人脸活体检测失败',
        icon: 'none',
        duration: 2000,
        complete: () => {
          console.log('useFaceStore().type :>> ', useFaceStore().type)
          if (useFaceStore().type === 1) {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages-fg/login/register')
          }
          else if (useFaceStore().type === 2) {
            handleToUrl('/pages/changePassword/index')
          }
          // uni.navigateBack()
        },
      })
    }
    // 这里可以添加实际的业务逻辑，如更新用户状态、触发其他事件等
  }, (error) => {
    useFaceStore().setFaceInfo({})
    useFaceStore().setType(-1)
    console.error('人脸活体检测消息处理失败:', error)
  })
})
onShow((options) => {
  console.log('App.vue onShow', options)
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss"></style>
