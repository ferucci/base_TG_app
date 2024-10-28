import { defineStore } from 'pinia'

export const baseLevelScore = 10

// Создаю массив, который показывает сколько очков нужно для следующего уровня
const levels = new Array(10).fill(0).map((_, i) => {
  return baseLevelScore * Math.pow(2, i)
})

// Считаю сумму для перехода на следующий уровень
const levelScores = levels.map((_, level) => {
  let sum = 0

  for (let [index, value] of levels.entries()) {
    if (index >= level) return sum + value
    // Если НЕ дошел до нужного уровня
    sum += value
  }
  return sum
})

// Вычисляю на каком уровне сейчас нахожусь, в зависимости от счёта

function computeLevelByScore(score) {
  for (let [index, value] of levelScores.entries()) {
    if (score <= value) {
      return {
        level: index,
        // Кол-во очков, которое нужно набить на текущем уровне
        value: levels[index]
      }
    }
  }
}

export const useScoreStore = defineStore('score', {
  state: () => ({
    score: 0,
  }),
  getters: {
    // Получаю текущий уровень
    level: (state) => computeLevelByScore(state.score),
    currentScore(state) {
      if (this.level.level === 0) {
        return state.score
      }
      return state.score - levelScores[this.level.level - 1]
    },
  },
  actions: {
    add(score = 1) {
      // изменяю state
      this.score += score
    },
    // Для получения данных из бд
    setScore(score) {
      this.score = score
    }
  }
})
