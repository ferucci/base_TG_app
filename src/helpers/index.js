import debounce from 'lodash.debounce'
import { updateScore } from '@/api/app'

const delay = 1000

export const debounceUpdateScore = debounce(updateScore, delay)