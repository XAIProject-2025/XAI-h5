<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'
import { useCommonStore } from '@/store/common'
import { useFaceStore } from '@/store/face'
import { useTokenStore } from '@/store/token'
import { debounce, handleToUrl, listenFaceLivenessError, listenFaceLivenessSuccess } from '@/utils/util'

onLaunch((options) => {
  if (options?.query?.inviteCode) {
    useCommonStore().setInviteCode(options.query.inviteCode)
  }
  // 防抖
  listenFaceLivenessSuccess((data, event) => {
    const faceInfo = JSON.parse(data)
    console.log('faceInfo :>> ', faceInfo)
    console.log('useFaceStore().type :>> ', useFaceStore().type)
    if (useFaceStore().type === 1) {
      if (faceInfo.success === true) {
        useFaceStore().setFaceInfo(faceInfo)
        handleToUrl('/pages-fg/login/register?faceAuth=true')
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages-fg/login/register?faceAuth=true')
          },
        })
      }
    }
    if (useFaceStore().type === 2) {
      if (faceInfo.success === true) {
        uni.showToast({
          title: '人脸验证成功',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo(faceInfo)
            handleToUrl('/pages/changePassword/index')
          },
        })
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages/changePassword/index')
          },
        })
      }
    }
    if (useFaceStore().type === 3) {
      if (faceInfo.token) {
        const tokenStore = useTokenStore()
        tokenStore._postLogin(faceInfo)
        uni.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 2000,
          complete: () => {
            setTimeout(() => {
              handleToUrl('/pages/index/index')
            }, 1000)
          },
        })
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages-fg/login/loginC')
          },
        })
      }

      // handleToUrl('/pages-fg/login/register?faceAuth=true')
      // useFaceStore().setFaceInfo({})
      // useFaceStore().setType(-1)
    }
    if (useFaceStore().type === 4) {
      if (faceInfo.token) {
        useFaceStore().setFaceInfo(faceInfo)
        uni.showToast({
          title: '验证成功',
          icon: 'none',
          duration: 2000,
          complete: () => {
            setTimeout(() => {
              handleToUrl('/pages-fg/login/forgotPassword')
            }, 1000)
          },
        })
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages-fg/login/forgotPassword')
          },
        })
      }
      // handleToUrl('/pages-fg/login/register?faceAuth=true')
      // useFaceStore().setFaceInfo({})
      // useFaceStore().setType(-1)
    }
    // 这里可以添加实际的业务逻辑，如更新用户状态、触发其他事件等
  }, (error) => {
    useFaceStore().setFaceInfo({})
    useFaceStore().setType(-1)
    console.error('人脸活体检测消息处理失败:', error)
  })
  listenFaceLivenessError((data, event) => {
    console.log('data :>> ', data)
    uni.showToast({
      title: '人脸检测失败',
      icon: 'none',
      duration: 2000,
      complete: () => {
        if (useFaceStore().type === 4) {
          handleToUrl('/pages-fg/login/forgotPassword')
        }
        if (useFaceStore().type === 3) {
          handleToUrl('/pages-fg/login/loginC')
        }
        if (useFaceStore().type === 2) {
          handleToUrl('/pages/changePassword/index')
        }
        if (useFaceStore().type === 1) {
          handleToUrl('/pages-fg/login/register')
        }
        useFaceStore().setFaceInfo({})
        useFaceStore().setType(-1)
        // handleToUrl('/pages-fg/login/register')
      },
    })
  }, (error) => {
    console.error('人脸活体检测错误处理失败监听:', error)
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
