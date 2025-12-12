import { createSSRApp } from 'vue'
import App from './App.vue'
import { requestInterceptor } from './http/interceptor'
import i18n from './locale/index'
import { routeInterceptor } from './router/interceptor'

import store from './store'
import '@/style/index.scss'
import 'virtual:uno.css'

// main.js
uni.$zp = {
  config: {
    // 配置分页默认pageSize为15
    'default-page-no': 0,
  },
}
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(i18n)
  app.use(routeInterceptor)
  app.use(requestInterceptor)

  return {
    app,
  }
}
