<script lang="ts" setup>
import { getI18nText } from '@/tabbar/i18n'
import { getCurrentPageI18nKey } from '@/utils'

onShow(() => {
  uni.setNavigationBarTitle({
    title: import.meta.env.VITE_APP_TITLE,
  })
})
</script>

<template>
  <slot />
</template>
