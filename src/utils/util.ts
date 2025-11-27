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
  console.log('name :>> ', name)
  return new URL(`../static/${name}`, import.meta.url).href
}
export function openLink(link: string, type = '_blank') {
  if (type == '_blank') {
    window.open(link, '_blank')
  }
  else {
    // _self
    window.location.assign(link)
  }
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
export function handleCopy(value: string, needToash: boolean = true, msg: string = $t('fu-zhi-cheng-gong')) {
  const text = document.createElement('textarea')
  text.value = value
  document.body.appendChild(text)
  text.select() // 选择对象
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    if (needToash) {
      showToast(msg)
    }
  }
  // 执行浏览器复制命令
  document.body.removeChild(text)
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

export function formatLargeNumber(number, param_lang = '', precision = 3, symbol = '$') {
  number = Number(number)
  const lang = param_lang || $locale.value
  console.log(param_lang)
  const en = ['', 'K', 'M', 'B', 'T']
  const cn = ['', '万', '亿', '兆']
  const suffixes = lang === 'zh-cn' ? cn : en
  let suffixIndex = 0
  const num = lang === 'en' ? 1000 : 10000

  while (Math.abs(number) >= num && suffixIndex < suffixes.length - 1) {
    number /= num
    suffixIndex++
  }

  return symbol + number.toFixed(precision) + suffixes[suffixIndex]
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
// 根据阿拉伯数字 获取英文

export function numberToEnglish(num) {
  console.log('$locale :>> ', $locale)
  if ($locale.value == 'zh-cn') {
    return num
  }
  // 处理输入为0的情况
  if (num === 0) {
    return 'zero'
  }

  // 定义基础数字词汇
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ]

  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ]

  // 处理小于100的数字
  function convertLessThanOneHundred(n) {
    if (n === 0) {
      return ''
    }
    if (n < 20) {
      return ones[n]
    }
    const ten = Math.floor(n / 10)
    const one = n % 10
    return tens[ten] + (one !== 0 ? `-${ones[one]}` : '')
  }

  // 处理小于1000的数字
  function convertLessThanOneThousand(n) {
    const hundred = Math.floor(n / 100)
    const remainder = n % 100
    let res = ''

    if (hundred > 0) {
      res += `${ones[hundred]} hundred`
    }

    const remainderStr = convertLessThanOneHundred(remainder)
    if (remainderStr) {
      res += (res ? ' ' : '') + remainderStr
    }

    return res
  }

  // 确保输入是整数且在有效范围内
  num = Math.floor(num)
  if (num < 0 || num > 999999) {
    return '请输入0到999999之间的数字'
  }

  const thousands = Math.floor(num / 1000)
  const hundreds = num % 1000

  let result = ''

  if (thousands > 0) {
    result += `${convertLessThanOneThousand(thousands)} thousand`
  }

  if (hundreds > 0) {
    result += (result ? ' ' : '') + convertLessThanOneThousand(hundreds)
  }

  // 转换为首字母大写的格式
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export function handleToUrl(
  url: string,
) {
  uni.navigateTo({ url })
};
