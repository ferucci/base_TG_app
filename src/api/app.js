import supabase from "@/services/supabase";
import { useTelegram } from "@/services/telegram";
import { useScoreStore } from "@/stores/score";

const { user } = useTelegram();

const MY_ID = user?.id ?? 1111

export async function fetchTasks() {
  const { data } = await supabase.from('tasks').select('*')
  try {
    return data
  } catch (error) {
    console.log({ message: error })
  }
}

// Проверяю наличие пользователя
export async function getOrCreateUser(refId) {
  const user = await supabase
    .from('users')
    .select()
    .eq('telegram', MY_ID)

  if (user.data.length !== 0) {
    return user.data[0]
  }

  const newUser = {
    telegram: MY_ID,
    friends: {},
    tasks: {},
    score: 0
  }

  await supabase.from('users').insert(newUser)
  return newUser
}

export async function updateScore(score) {
  return await supabase.from('users').update({ score }).eq('telegram', MY_ID)
}

export async function registerRef(userName, refId) {
  // Получаю все данные, которые есть у реферала
  const { data } = await supabase.from('users').select().eq('telegram', +refId)
  // Получаю самого пользователя
  const refUser = data[0]
  // Заношу "себя" в таблицу к рефералу
  await supabase
    .from('users')
    .update({
      friends: { ...refUser.friends, [MY_ID]: userName },
      score: refUser.score + 100
    }).eq('telegram', +refId)

}

export async function completeTask(user, task) {
  const score = useScoreStore()
  const newScore = score.score + task.amount
  score.setScore(newScore)

  const updateUser = await supabase
    .from('users')
    .update({
      tasks: { ...user?.tasks, [task.id]: true },
      score: newScore,
    }).eq('telegram', MY_ID)

  try {
    return updateUser;
  } catch (error) {
    console.log({ message: error })
  }

}