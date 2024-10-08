import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()
import './style.scss'
import App from './App.vue'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')


