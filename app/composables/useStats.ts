import statsData from '@/data/stats.json'
import type { Stats } from '~/types'

export const useStats = () => {
  const stats = ref<Stats>(statsData as Stats)

  return {
    stats
  }
}  