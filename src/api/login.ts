import type { IAuthLoginRes, ICaptcha, IDoubleTokenRes, IUpdateInfo, IUpdatePassword, IUserInfoRes } from './types/login'
import { http } from '@/http/http'

// 注册

/**
 * 登录表单
 */
export interface ILoginForm {
  name: string
  password: string
}
/**
 * 注册表单
 */

export function register(registerForm) {
  return http.post('/api/v1/auth/register', registerForm)
}
// 检查用户名是否存在
export function checkName(name: string) {
  return http.get<boolean>(`/api/v1/auth/checkName?name=${name}`)
}
// 检查邀请码是否存在
export function checkInviteCode(inviteCode: string) {
  return http.get<boolean>(`/api/v1/auth/checkInviteCode?inviteCode=${inviteCode}`)
}
/**
 * 获取验证码
 * @returns ICaptcha 验证码
 */
export function getCode() {
  return http.get<ICaptcha>('/user/getCode')
}

/**
 * 用户登录
 * @param loginForm 登录表单
 */
export function login(loginForm: ILoginForm) {
  return http.post<IAuthLoginRes>('/api/v1/auth/login', loginForm)
}

/**
 * 刷新token
 * @param refreshToken 刷新token
 */
export function refreshToken(refreshToken: string) {
  return http.post<IDoubleTokenRes>('/auth/refreshToken', { refreshToken })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return http.get<IUserInfoRes>('/api/v1/user/info')
}

/**
 * 退出登录
 */
export function logout() {
  return http.get<void>('/auth/logout')
}

/**
 * 修改用户信息
 */
export function updateInfo(data: IUpdateInfo) {
  return http.post('/api/v1/user/updateInfo', data)
}

/**
 * 修改用户密码
 */
export function updateUserPassword(data: IUpdatePassword) {
  return http.post('/api/v1/user/updatePassword', data)
}

/**
 * 获取微信登录凭证
 * @returns Promise 包含微信登录凭证(code)
 */
export function getWxCode() {
  return new Promise<UniApp.LoginRes>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: res => resolve(res),
      fail: err => reject(new Error(err)),
    })
  })
}

/**
 * 微信登录
 * @param params 微信登录参数，包含code
 * @returns Promise 包含登录结果
 */
export function wxLogin(data: { code: string }) {
  return http.post<IAuthLoginRes>('/auth/wxLogin', data)
}

// 游客模式登录
export function touristLogin(inviteCode: string) {
  return http.post<IAuthLoginRes>(`/api/v1/auth/guest?inviteCode=${inviteCode}`)
}

// 支付密码
export function updatePayPwd(data) {
  return http.post('/api/v1/user/updatePayPwd', data)
}
