import { fetchTasks, getOrCreateUser, registerRef, completeTask } from '@/api/app';
import { defineStore } from 'pinia';
import { useScoreStore } from './score';
import { useTelegram } from '@/services/telegram';

const { user } = useTelegram();

// Создаю отдельный стор. Один для счёта, один для всего приложения
export const useAppStore = defineStore('app', {
  state: () => ({
    user: {},
    tasks: []
  }),
  actions: {
    async init(refId) {
      this.user = await getOrCreateUser(refId)

      const score = useScoreStore()

      score.setScore(this.user.score)

      if (refId && +refId !== +this.user.telegram_id) {
        await registerRef(user?.first_name ?? 'заглушка', refId)
      }
    },
    async completeTask(task) {
      await completeTask(this.user, task)
    },
    async fetchTasks() {
      this.tasks = await fetchTasks()
    }
  }
})