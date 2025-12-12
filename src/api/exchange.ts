import { http } from '@/http/http'

export function exchange(data) {
  return http.post('/api/v1/user/balance/exchange', data)
}
