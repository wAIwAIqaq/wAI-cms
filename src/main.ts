import { createApp } from "vue";
import { router } from "./router.ts";
import store from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "tailwindcss/tailwind.css"
import "@/styles/tailwindcss/index.scss"
import "@/styles/element/index.scss"

import App from "./App.vue";


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.use(router);
app.use(store)

app.mount("#app");
