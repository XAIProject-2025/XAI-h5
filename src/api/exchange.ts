import { http } from '@/http/http'

export function exchange(data) {
  return http.post('/api/v1/user/balance/exchange', data)
}
export function getCurrencyStatistics(data) {
  return http.get('/api/v1/currency/statistics', data)
}
