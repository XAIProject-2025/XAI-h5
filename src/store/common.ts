import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBalanceRate } from '@/api/funds'

interface IBalanceRateRes {
  toUsdt: number
}

export const useCommonStore = defineStore('common', () => {
  const tokenPrice = ref<number>(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTokenPrice = async (currencyName: string | number = '1') => {
    loading.value = true
    error.value = null
    try {
      const res = await getBalanceRate({ currencyName: String(currencyName) })
      const price = (res as IBalanceRateRes)?.toUsdt ?? 0
      tokenPrice.value = Number(price) || 0
    }
    catch (e) {
      error.value = 'fetch_error'
    }
    finally {
      loading.value = false
    }
  }

  return { tokenPrice, loading, error, fetchTokenPrice }
})
