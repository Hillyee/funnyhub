import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import pinia from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { setupStore } from './store'

const app = createApp(App)

// 富文本编辑
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// main.js
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// 引入所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'
import Prism from 'prismjs'

import vueiInfinite from 'vue-infinite-scroll'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})
VMdPreview.use(githubTheme, {
  Hljs: hljs,
})
app.use(VueMarkdownEditor)
app.use(VMdPreview)
app.use(router)
app.use(pinia)
app.use(vueiInfinite)
// 初始化store
setupStore()

app.mount('#app')
