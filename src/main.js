import './assets/main.css'

import { createApp } from 'vue'
// Инициализация стейт-менеджемнта
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
