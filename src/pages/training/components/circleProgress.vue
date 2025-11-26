<template>
  <div class="relative h-32 w-32 inline-flex items-center justify-center">
    <!-- SVG 环形 -->
    <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90">
      <!-- 背景环 -->
      <circle cx="50" cy="50" r="45" class="fill-none" stroke="#F2F4F5" stroke-width="6" />

      <!-- 进度环 -->
      <circle
        cx="50" cy="50" r="45" class="fill-none transition-all duration-500 ease-out" stroke="#FF8A00"
        stroke-width="6" stroke-linecap="round" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset"
      />
    </svg>

    <!-- 文本 -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-xl text-[#222] font-bold">
        {{ displayValue }} <span class="text-[12px]">Days</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  color: { type: String, default: '#FF8A00' },
  showFixed28: { type: Boolean, default: false }, // optional: 恶搞模式
})

// 半径
const r = 45
const circumference = 2 * Math.PI * r

// 进度比例
const percent = computed(() => {
  if (props.showFixed28)
    return 0.28 // 恶搞：永远 28%
  return props.value / props.max
})

// 偏移值
const dashOffset = computed(() => circumference * (1 - percent.value))

// 显示文本
const displayValue = computed(() => {
  if (props.showFixed28)
    return 28
  return props.value
})
</script>
