import { http } from '@/http/http'

export function getServerList() {
  return http.get(`/api/v1/power/servers`)
}
// 购买算力服务器
export function buyServer(params) {
  return http.post('/api/v1/power/buy', params)
}
