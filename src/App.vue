<template>
  <main class="game">
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
</script>
