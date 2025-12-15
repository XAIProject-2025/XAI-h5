// 防抖

export function debounce(fn: Function, delay: number) {
  let timer: any = null
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function getImage(name) {
  // 1. 获取当前运行平台（H5/APP/小程序）
  const platform = process.env.UNI_PLATFORM
  // 基础路径（static 文件夹在项目根目录）
  const basePath = `/static/${name}`

  // 2. 按平台适配路径
  if (platform === 'app') {
    // App 端（iOS/Android）：直接返回绝对路径（UniApp 会自动解析沙箱路径）
    return `../..${basePath}`
  }
  else if (platform === 'h5') {
    // H5 端：兼容 Vite/Webpack，区分构建工具
    try {
      // Vite 项目（新版 UniApp）
      return new URL(`../static/${name}`, import.meta.url).href
    }
    catch (e) {
      // Webpack/Vue CLI 项目（旧版 UniApp）
      return basePath
    }
  }
  else {
    // 小程序端（微信/支付宝/抖音等）：直接返回绝对路径
    return basePath
  }
}
export function openExternalUrl(url, options = {}) {
  // H5 端
  // #ifdef H5
  window.open(url, options.target || '_blank')
  // #endif
  // App 端（需依赖 5+ API）
  // #ifdef APP-PLUS
  plus.runtime.openURL(url, (res) => {
    uni.showToast({
      title: '打开失败，请检查链接',
      icon: 'none',
    })
  })
  // #endif
}
// 获取剪切板
export async function getClipboard() {
  return await navigator.clipboard.readText()
}
// 获取图片宽高
export function getImageSize(url: string) {
  const img = new Image()
  img.src = url
  return img
}
export function handleCopy(value: string) {
  // 调用复制 API
  uni.setClipboardData({
    data: value, // 要复制的内容
    success: () => {
      // 复制成功提示（UniApp 原生提示）
      uni.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1500,
      })
    },
    fail: (err) => {
      // 复制失败处理
      uni.showToast({
        title: '复制失败',
        icon: 'none',
        duration: 1500,
      })
      console.error('复制失败：', err)
    },
  })
}

export function formatAmount(amount: any, fixed = 2) {
  // 处理空值、非数字情况
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return '0.00'.slice(0, 2 + fixed) // 根据fixed返回对应长度的0值
  }

  // 转换为数字并处理四舍五入
  const num = Number(amount)

  // 更精确的四舍五入处理（避免toFixed在某些情况下的精度问题）
  const rounded = Number(`${Math.round(Number(`${num}e${fixed}`))}e-${fixed}`)

  // 转换为指定小数位数的字符串
  let amounts = rounded.toFixed(fixed)

  // 分割整数和小数部分
  const parts = amounts.split('.')

  // 整数部分添加千位分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 拼接并返回结果
  return parts.join('.')
}
export function formatWalletAddress(address: string, isSub = false): string {
  if (address.length <= 12)
    return address
  if (isSub) {
    return `${address.substring(0, 6)}...`
  }
  else {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 6,
    )}`
  }
}

// 获取等级
export function getLevel(level: number) {
  console.log('level :>> ', level)
  if (level == 0) {
    return {
      title: '',
      img: getImage('level/level0.png'),
      color: '#FFF',
    }
  }
  if (level == 1) {
    return {
      title: 'A',
      img: getImage('level/level1.png'),
      color: '#00D9A6',
    }
  }
  if (level == 2) {
    return {
      title: 'B',
      img: getImage('level/level2.png'),
      color: '#A097FF',
    }
  }
  if (level == 3) {
    return {
      title: 'C',
      img: getImage('level/level3.png'),
      color: '#D97700',
    }
  }
  if (level == 4) {
    return {
      title: 'D',
      img: getImage('level/level4.png'),
      color: '#96EEFF',
    }
  }
  if (level == 5) {
    return {
      title: 'E',
      img: getImage('level/level5.png'),
      color: '#FEFE26',
    }
  }
}
// 获取币种id对应信息
export function getCurrencyInfo(id: number) {
  const obj = {
    name: '',
    img: '',
  }
  if (id == 1) {
    obj.name = 'BNB'
  }
  if (id == 2) {
    obj.name = 'USDT'
  }
  if (id == 3) {
    obj.name = 'AUC'
  }
  if (id == 4) {
    obj.name = 'BNTG'
  }
  if (id == 5) {
    obj.name = 'AUH'
  }
  return obj
}

export function GetQueryString(param: any) {
  // 获取由全部参数组成的字符串。
  let query = window.location.href
  // 傻X PB钱包判断
  if (query.includes('tokenpocket')) {
    console.log('shits')
    query = query.replace('?utm_source=tokenpocket#/', '')
  }
  console.log(query)
  // 分割参数，得到每一个参数字符串组成的数组。
  let vars = query.split('?')
  if (vars[1]) {
    const params2: any = vars[1].split('&')
    if (params2.length > 0) {
      for (let i = 0; i < params2.length; i++) {
        // 分割每一个参数字符串，得到参数名和参数值组成的数组。
        let pair = params2[i].split('=')
        // 如果参数名等于传入的param，则返回该值。
        if (pair[0] == param) {
          return decodeURI(pair[1])
        }
      }
    }
  }
  // 若参数不存在，则返回false。
  return false
}

// 根据数字获取开始时间结束时间
export function getTime(num: number) {
  const endTime = new Date()
  const startTime = new Date()
  startTime.setDate(endTime.getDate() - num)
  return {
    startTime: startTime.toISOString().split('T')[0],
    endTime: endTime.toISOString().split('T')[0],
  }
}
export function formatReceivingAddress(order) {
  return `${order.detailedAddress1 || ''}<br/>${order.detailedAddress || ''
  }<br/>${order.detailedAddress2 || ''}`
}

export function compareRatio(previousValue, currentValue, decimalPlaces = 2) {
  // 检查输入是否为有效数字
  if (typeof previousValue !== 'number' || typeof currentValue !== 'number' || isNaN(previousValue) || isNaN(currentValue)) {
    throw new TypeError('输入必须是有效的数字')
  }

  // 检查基准值是否为0，避免除以零
  if (previousValue === 0) {
    throw new Error('基准值不能为0')
  }

  // 计算差值
  const difference = currentValue - previousValue

  // 计算比例 (变化量 / 基准值)
  const ratio = (difference / previousValue) * 100

  // 四舍五入保留指定小数位数
  const roundedRatio = Number(ratio.toFixed(decimalPlaces))

  // 确定变化趋势
  let trend
  if (difference > 0) {
    trend = 'up' // 上升
  }
  else if (difference < 0) {
    trend = 'down' // 下降
  }
  else {
    trend = 'same' // 不变
  }

  return {
    previousValue, // 原始基准值
    currentValue, // 原始当前值
    difference, // 差值
    ratio: roundedRatio, // 百分比比例（已四舍五入）
    trend, // 趋势：'up' | 'down' | 'same'
  }
}
export function handleToUrl(
  url: string,
) {
  uni.navigateTo({ url })
};

export function getRecordType(type: number) {
  console.log('type :>> ', type)
  const obj = {
    name: '',
    img: '',
    color: '',
  }
  if (type == 1) {
    obj.name = '充值'
  }
  if (type == 2) {
    obj.name = '购买算力服务器'
  }
  if (type == 3) {
    obj.name = '奖励'
  }
  if (type == 4) {
    obj.name = '兑换'
  }
  if (type == 5) {
    obj.name = '任务奖励'
  }
  if (type == 6) {
    obj.name = '服务器赎回'
  }
  return obj
}
