<template>
  <div class="text-content">
    <h1>Доступные задания</h1>
    <h3 v-if="appStore.tasks.length === 0">Loading tasks...</h3>
    <ul class="list">
      <li class="list-item" v-for="task in appStore.tasks" :key="task.id">
        {{ task.title }}
        <span>
          <a 
          @click.prevent="openTask(task)" 
          target="_blank" 
          class="list-btn"
          :class="{ done: appStore.user?.tasks?.[task.id] }"
          > {{ task.amount }} </a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTelegram } from '@/services/telegram';
import { useAppStore } from '@/stores/app';
import { onMounted } from 'vue';

const { tg } = useTelegram()
const appStore = useAppStore()

onMounted(() => {
  appStore.fetchTasks()
})

function openTask(task) {
  appStore.completeTask(task)
  // Определяю метод подходящий для открытия ссылки внутренние/сторонние
  if(task.url.includes('t.me')) {
    tg.openTelegramLink(task.url)
  } else {
    tg.openLink(task.url)
  }
}
</script>