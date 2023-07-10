import './assets/main.css'
import {GlobalFunctions} from './GlobalFunctions.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$GlobalFunctions = GlobalFunctions;

app.use(router)

app.mount('#app')
