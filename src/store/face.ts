import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFaceStore = defineStore('face', () => {
  const faceInfo = ref({})
  const type = ref(null) // 1注册 // 2验证 // 3 登陆 //-1失败 //4 忘记密码 //5 设置支付密码 //6 提现验证
  const form = ref({})
  const setFaceInfo = (info: any) => {
    faceInfo.value = info
  }
  const setType = (t: number) => {
    type.value = t
  }
  const setForm = (f: any) => {
    form.value = f
  }

  return { setFaceInfo, faceInfo, type, setType, form, setForm }
})
