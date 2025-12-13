import { http } from '@/http/http'

export function getBalanceLogs(params) {
  return http.get('/api/v1/user/balance/logs', params)
}
// 查询币价

export function getBalanceRate(params) {
  return http.get('/api/v1/user/balance/rate', params)
}

// 查询下级
export function getSubordinateList() {
  return http.get('/api/v1/commission/subordinates')
}
// 查询佣金
export function getStatistics() {
  return http.get('/api/v1/commission/statistics')
}
// 查询我的算力服务器订单
export function getPowerOrders() {
  return http.get('/api/v1/power/orders')
}

// 提前赎回
export function redeemPowerOrder(params) {
  return http.post('/api/v1/power/redeem', params)
}
