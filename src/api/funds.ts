import { http } from '@/http/http'

export function getBalanceLogs(params) {
  return http.get('/api/v1/user/balance/logs', params)
}
// 查询币价

export function getBalanceRate(params) {
  return http.get('/api/v1/user/balance/rate', params)
}
