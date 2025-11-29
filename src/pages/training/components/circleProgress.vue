<template>
  <view class="circle-wrapper">
    <canvas id="circleCanvas" canvas-id="circleCanvas" class="circle-canvas" type="2d" />

    <view class="circle-text">
      <text class="value">{{ displayValue }}</text>
      <text class="unit">Days</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, watch } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  color: { type: String, default: '#FF8A00' },
  showFixed28: { type: Boolean, default: false },
  size: { type: Number, default: 160 }, // rpx
  strokeWidth: { type: Number, default: 6 }, // px
})

const displayValue = computed(() => props.showFixed28 ? 28 : props.value)
const percent = computed(() => props.showFixed28 ? 0.28 : props.value / props.max)

let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  nextTick(() => {
    draw()
  })
})

watch(() => props.value, () => draw())
watch(() => props.color, () => draw())

// 绘制方法
function draw() {
  const query = uni.createSelectorQuery()
  query
    .select('#circleCanvas')
    .fields({ node: true, size: true })
    .exec((res: any) => {
      const canvas = res[0].node
      const width = res[0].width
      const height = res[0].height

      const dpr = uni.getSystemInfoSync().pixelRatio
      canvas.width = width * dpr
      canvas.height = height * dpr

      ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)

      // 清空画布
      ctx.clearRect(0, 0, width, height)

      const r = width / 2 - props.strokeWidth

      // 背景圆
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, r, 0, 2 * Math.PI)
      ctx.strokeStyle = '#F2F4F5'
      ctx.lineWidth = props.strokeWidth
      ctx.stroke()

      // 进度圆
      const start = -Math.PI / 2
      const end = start + percent.value * 2 * Math.PI

      ctx.beginPath()
      ctx.arc(width / 2, height / 2, r, start, end)
      ctx.strokeStyle = props.color
      ctx.lineCap = 'round'
      ctx.lineWidth = props.strokeWidth
      ctx.stroke()
    })
}
</script>

<style scoped>
.circle-wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.circle-canvas {
  width: 160rpx;
  height: 160rpx;
}

.circle-text {
  position: absolute;
  width: 160rpx;
  height: 160rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.value {
  font-size: 32rpx;
  font-weight: bold;
  color: #222;
}

.unit {
  font-size: 20rpx;
  color: #666;
}
</style>
