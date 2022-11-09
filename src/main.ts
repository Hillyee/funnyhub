import { createApp } from "vue"
import App from "./App.vue"

import router from "./router/index"
import pinia from "./store"

const app = createApp(App)

// 富文本编辑
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
app.use(VueMarkdownEditor);
app.use(router)
app.use(pinia)

app.mount("#app")
