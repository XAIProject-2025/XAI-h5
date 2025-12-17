import type { ILoginForm } from '@/api/login'
import type { IAuthLoginRes } from '@/api/types/login'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import {
  login as _login,
  refreshToken as _refreshToken, // 若你不再需要刷新，可删除
  register as _register,
  wxLogin as _wxLogin,
  checkInviteCode,
  checkName,
  getWxCode,
} from '@/api/login'

import { isDoubleTokenRes, isSingleTokenRes } from '@/api/types/login'
import { useUserStore } from './user'

/**
 * 配置：是否双 token 模式
 */
export const isDoubleTokenMode = import.meta.env.VITE_AUTH_MODE === 'double'

/**
 * 初始化 token 数据结构
 */
const tokenInfoState = isDoubleTokenMode
  ? {
      accessToken: '',
      refreshToken: '',
    }
  : {
      token: '',
    }

export const useTokenStore = defineStore(
  'token',
  () => {
    /** Token 信息 */
    const tokenInfo = ref<IAuthLoginRes>({ ...tokenInfoState })

    /** 设置 token（不考虑过期 -> 永久有效） */
    const setTokenInfo = (val: IAuthLoginRes) => {
      if (isSingleTokenRes(val)) {
        tokenInfo.value = {
          token: val.token,
        }
      }
      else if (isDoubleTokenRes(val)) {
        tokenInfo.value = {
          accessToken: val.accessToken,
          refreshToken: val.refreshToken,
        }
      }
    }

    /** 登录成功后的统一处理 */
    const _postLogin = async (val) => {
      setTokenInfo(val)
      // 如有需要，可以请求用户信息
      const userStore = useUserStore()
      await userStore.fetchUserInfo()
    }

    /** 普通账号密码登录 */
    const login = async (loginForm: ILoginForm) => {
      const res = await _login(loginForm)
      await _postLogin(res)
      uni.showToast({ title: '登录成功', icon: 'success' })
      return res
    }

    /** 微信登录 */
    const wxLogin = async () => {
      const code = await getWxCode()
      const res = await _wxLogin(code)
      await _postLogin(res)
      uni.showToast({ title: '登录成功', icon: 'success' })
      return res
    }

    /** 退出登录 */
    const logout = async () => {
      try {
        // 如果你的后端有 logout，则调用
        // await _logout()
      }
      catch (e) {
        console.error('退出登录失败:', e)
      }
      finally {
        tokenInfo.value = { ...tokenInfoState }
        const userStore = useUserStore()
        userStore.clearUserInfo()
        uni.removeStorageSync('token')
      }
    }
    // 实际调用逻辑
    const register = async (registerForm) => {
      console.log('registerForm :>> ', registerForm)
      const checkNameRes = await checkName(registerForm.name)
      if (!checkNameRes) {
        console.log('checkNameRes :>> ', checkNameRes)
        uni.showToast({
          icon: 'none',
          title: '用户名已存在',
        })
        return false
      }
      const checkInviteCodeRes = await checkInviteCode(registerForm.inviteCode)
      if (!checkInviteCodeRes) {
        uni.showToast({
          icon: 'none',
          title: '邀请码不存在',
        })
        return false
      }
      const res = await _register(registerForm)
      await _postLogin(res)
      uni.showToast({
        icon: 'none',
        title: '注册成功',
      })
      return res
    }
    /** 获取有效 token（永不过期） */
    const validToken = computed(() => {
      if (isSingleTokenRes(tokenInfo.value))
        return tokenInfo.value.token

      if (isDoubleTokenRes(tokenInfo.value))
        return tokenInfo.value.accessToken

      return ''
    })

    /** 是否已登录 */
    const hasLogin = computed(() => {
      return !!validToken.value
    })

    return {
      tokenInfo,

      // 登录 / 登出
      login,
      wxLogin,
      logout,
      // token
      setTokenInfo,
      validToken,
      hasLogin,
      _postLogin,
      // 注册
      register,
    }
  },
  {
    persist: true,
  },
)
