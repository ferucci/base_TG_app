<template>
  <div class="text-content">
    <h1>Мои друзья</h1>

    <div class="center">
      <button class="referal" @click="copy">{{ referalText }}</button>
    </div>

    <h3 v-if="friends.length === 0">Пока друзей нет.</h3>

    <ul class="list">
      <li class="list-item" v-for="friend in friends" :key="friends.id">
        {{ friend.name }}
        <span class="list-btn done">100</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  // Потребуется как минимум для текущего id
  import { useTelegram } from '@/services/telegram';
  // Для списка друзей
  import { useAppStore } from '@/stores/app';
  import { ref, computed } from 'vue';

  const appStore = useAppStore()
  const { user } = useTelegram()

  const referalText = ref("Реферальная ссылка")

  // {1: 'Username'}
  const friends = computed(() => Object.keys(appStore.user.friends).map((id) => ({
    id, 
    name: appStore.user.friends[id],
  }))
  )
  function copy() {
    navigator.clipboard.writeText('https://t.me/Veriful_pro_bot?start=' + user?.id)
    referalText.value = 'Скопировано!'
  }
</script>