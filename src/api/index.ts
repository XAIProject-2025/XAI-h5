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
