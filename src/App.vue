<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { bindFace, loginByFace, registerByFace, verifyFace } from '@/api/index'
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
  listenFaceLivenessSuccess(async (data, event) => {
    console.log('data :>> ', data)
    const faceInfo = data
    if (useFaceStore().type === 1) {
      if (faceInfo.success === true) {
        try {
          const registerByFaceRes = await registerByFace(faceInfo)
          if (registerByFaceRes === true) {
            uni.showToast({
              title: '人脸验证成功',
              icon: 'none',
              duration: 2000,
              complete: () => {
                useFaceStore().setFaceInfo(faceInfo)
                handleToUrl('/pages-fg/login/register', true)
              },
            })
          }
          else {
            uni.showToast({
              title: faceInfo.message || '人脸验证失败,已注册或者活体检查未通过,请重新校验',
              icon: 'none',
              duration: 2000,
              complete: () => {
                useFaceStore().setFaceInfo({})
                useFaceStore().setType(-1)
                handleToUrl('/pages-fg/login/register', true)
              },
            })
          }
        }
        catch (error) {
          console.log('error :>> ', error)
          uni.showToast({
            title: error.message || '人脸验证失败',
            icon: 'none',
            duration: 2000,
            complete: () => {
              useFaceStore().setFaceInfo({})
              useFaceStore().setType(-1)
              handleToUrl('/pages-fg/login/register', true)
            },
          })
        }
        // useFaceStore().setFaceInfo(faceInfo)
        // handleToUrl('/pages-fg/login/register?faceAuth=true')
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages-fg/login/register?faceAuth=true', true)
          },
        })
      }
    }
    if (useFaceStore().type === 2) {
      if (faceInfo.success === true) {
        try {
          const verifyFaceRes = await verifyFace({ sessionId: faceInfo.sessionId })
          if (verifyFaceRes === true) {
            uni.showToast({
              title: '人脸验证成功',
              icon: 'none',
              duration: 2000,
              complete: () => {
                useFaceStore().setFaceInfo(faceInfo)
                handleToUrl('/pages/changePassword/index', true)
              },
            })
          }
        }
        catch (error) {
          uni.showToast({
            title: faceInfo.message || '人脸验证失败',
            icon: 'none',
            duration: 2000,
            complete: () => {
              useFaceStore().setFaceInfo({})
              useFaceStore().setType(-1)
              handleToUrl('/pages/changePassword/index', true)
            },
          })
        }
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages/changePassword/index', true)
          },
        })
      }
    }
    if (useFaceStore().type === 3) {
      if (faceInfo.success === true && faceInfo.sessionId) {
        try {
          const TokenInfo = await loginByFace({ sessionId: faceInfo.sessionId })
          if (TokenInfo) {
            const tokenStore = useTokenStore()
            tokenStore._postLogin(TokenInfo)
            // sessionId
            uni.showToast({
              title: '登录成功',
              icon: 'none',
              duration: 2000,
              complete: () => {
                setTimeout(() => {
                  handleToUrl('/pages/index/index', true)
                }, 1000)
              },
            })
          }
          else {
            uni.showToast({
              title: '人脸验证失败',
              icon: 'none',
              duration: 2000,
              complete: () => {
                useFaceStore().setFaceInfo({})
                useFaceStore().setType(-1)
                handleToUrl('/pages-fg/login/loginC', true)
              },
            })
          }
        }
        catch (error) {
          console.log('error :>> ', error)
          uni.showToast({
            title: error.message || '人脸验证失败',
            icon: 'none',
            duration: 2000,
            complete: () => {
              useFaceStore().setFaceInfo({})
              useFaceStore().setType(-1)
              handleToUrl('/pages-fg/login/loginC', true)
            },
          })
        }
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages-fg/login/loginC', true)
          },
        })
      }

      // handleToUrl('/pages-fg/login/register?faceAuth=true')
      // useFaceStore().setFaceInfo({})
      // useFaceStore().setType(-1)
    }
    if (useFaceStore().type === 4) {
      if (faceInfo.success === true) {
        try {
          const verifyFaceRes = await verifyFace({ sessionId: faceInfo.sessionId })
          if (verifyFaceRes === true) {
            uni.showToast({
              title: '人脸验证成功',
              icon: 'none',
              duration: 2000,
              complete: () => {
                useFaceStore().setFaceInfo(faceInfo)
                handleToUrl('/pages-fg/login/forgotPassword', true)
              },
            })
          }
        }
        catch (error) {
          uni.showToast({
            title: faceInfo.message || '人脸验证失败',
            icon: 'none',
            duration: 2000,
            complete: () => {
              useFaceStore().setFaceInfo({})
              useFaceStore().setType(-1)
              handleToUrl('/pages-fg/login/forgotPassword', true)
            },
          })
        }
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages-fg/login/forgotPassword', true)
          },
        })
      }
    }

    if (useFaceStore().type === 5) {
      if (faceInfo.success === true) {
        try {
          const verifyFaceRes = await verifyFace({ sessionId: faceInfo.sessionId })
          if (verifyFaceRes === true) {
            uni.showToast({
              title: '人脸验证成功',
              icon: 'none',
              duration: 2000,
              complete: () => {
                useFaceStore().setFaceInfo(faceInfo)
                handleToUrl('/pages/paymentPassword/index', true)
              },
            })
          }
        }
        catch (error) {
          uni.showToast({
            title: faceInfo.message || '人脸验证失败',
            icon: 'none',
            duration: 2000,
            complete: () => {
              useFaceStore().setFaceInfo({})
              useFaceStore().setType(-1)
              handleToUrl('/pages/paymentPassword/index', true)
            },
          })
        }
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages/paymentPassword/index', true)
          },
        })
      }
    }

    if (useFaceStore().type === 6) {
      if (faceInfo.success === true) {
        try {
          const verifyFaceRes = await verifyFace({ sessionId: faceInfo.sessionId })
          if (verifyFaceRes === true) {
            uni.showToast({
              title: '人脸验证成功',
              icon: 'none',
              duration: 2000,
              complete: () => {
                useFaceStore().setFaceInfo(faceInfo)
                handleToUrl('/pages/withdraw/index', true)
              },
            })
          }
        }
        catch (error) {
          uni.showToast({
            title: faceInfo.message || '人脸验证失败',
            icon: 'none',
            duration: 2000,
            complete: () => {
              useFaceStore().setFaceInfo({})
              useFaceStore().setType(-1)
              handleToUrl('/pages/withdraw/index', true)
            },
          })
        }
      }
      else {
        uni.showToast({
          title: faceInfo.message || '人脸验证失败',
          icon: 'none',
          duration: 2000,
          complete: () => {
            useFaceStore().setFaceInfo({})
            useFaceStore().setType(-1)
            handleToUrl('/pages/withdraw/index', true)
          },
        })
      }
    }
  })
  listenFaceLivenessError((data, event) => {
    console.log('data :>> ', data)
    // console.log('data :>> ', data)
    // const faceInfo = data
    // if (useFaceStore().type === 3) {
    //   uni.showToast({
    //     title: faceInfo.message || '人脸验证失败',
    //     icon: 'none',
    //     duration: 2000,
    //     complete: () => {
    //       useFaceStore().setFaceInfo({})
    //       useFaceStore().setType(-1)
    //     },
    //   })
    // }
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
