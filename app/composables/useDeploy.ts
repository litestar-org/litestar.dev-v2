import type { DeployCollectionItem } from '@nuxt/content'

export const useDeploy = () => {
  const providers = useState<DeployCollectionItem[]>('deploy', () => [])

  async function fetchList() {
    if (providers.value.length) {
      return
    }

    try {
      const { data } = await useAsyncData('hosting-provider', () => queryCollection('deploy').all())

      providers.value = data.value?.filter(article => article.path !== '/deploy') || []
    } catch (e) {
      providers.value = []
      return e
    }
  }

  return {
    providers,
    fetchList
  }
}