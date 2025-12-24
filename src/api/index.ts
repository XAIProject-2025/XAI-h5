import { http } from '@/http/http'

export function getChatTask() {
  return http.get('/api/v1/chat/task')
}

// 流失对话
export function getChatLose(data: { message: string, chatId: string }) {
  return http.post('/api/v1/chat/stream', data, {}, {
    'Content-Type': 'application/json',
  })
}
// 聊天记录
export function getChatHistory(data) {
  return http.get('/api/v1/chat/history', data)
}

// 查询会员信息
export function getVipInfo(data) {
  return http.get('/api/v1/vip/info', data)
}

// 查询tron地址
export function getDepositWallets(data) {
  return http.get('/api/v1/user/balance/depositWallets', data)
}
// 发起提现
export function applyWithdrawal(data) {
  return http.post('/api/v1/withdrawal/apply', data)
}
// 修改密码
export function updatePassword(data) {
  return http.post('/api/v1/user/updatePassword', data)
}
// 忘记密码
export function forgotPassword(data) {
  return http.post('/api/v1/auth/forgotPwd', data)
}
// 人脸登陆
export function loginByFace(query: { sessionId: string }) {
  return http.post(`/api/v1/auth/loginByFace?sessionId=${query.sessionId}`)
}
// 人脸校验
export function verifyFace(query: { sessionId: string }) {
  return http.get(`/api/v1/face/validate?session=${query.sessionId}`)
}
// 人脸注册
export function registerByFace(data) {
  return http.get(`/api/v1/face/register?session=${data.sessionId}`)
}
// 注册用户绑定人脸
export function bindFace(data) {
  return http.get(`/api/v1/face/bindFace?session=${data.sessionId}`)
}
