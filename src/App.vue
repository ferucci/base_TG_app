<template>
  <main class="game" v-if="loaded">
    <div class="page">
      <!-- подставляет страницу в зависимости от роутера -->
      <RouterView />
    </div>
    <!-- menu -->
    <TheMenu />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue'
import { onMounted, ref } from 'vue'
import { useAppStore } from './stores/app'
import { useTelegram } from './services/telegram'

const loaded = ref(false)
const app = useAppStore()

const {tg} = useTelegram()

const urlParams = new URLSearchParams(window.location.search)

app.init(urlParams.get('ref')).then(() => {
  loaded.value = true
})
onMounted(() => {
  // Сообщаю телеграмму - всё готово
  tg.ready()
  // Разворачиваю приложение на весь экран
  tg.expand()
})
</script>
