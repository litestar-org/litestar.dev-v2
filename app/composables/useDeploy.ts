import type { DeployCollectionItem } from '@nuxt/content'

export const useDeploy = () => {
  const hostingProviders = useState<DeployCollectionItem[]>(
    'hosting-providers',
    () => [],
  )
  const deploymentTechnologies = useState<DeployCollectionItem[]>(
    'deployment-technologies',
    () => [],
  )

  async function fetchList() {
    if (hostingProviders.value.length || deploymentTechnologies.value.length) {
      return
    }

    try {
      const { data } = await useAsyncData('deploy-content', () =>
        queryCollection('deploy').all(),
      )

      const allItems =
        data.value?.filter((article) => article.path !== '/deploy') || []

      // Separate items by category
      hostingProviders.value = allItems.filter(
        (item) => item.category === 'Hosting' || item.category === 'hosting',
      )
      deploymentTechnologies.value = allItems.filter(
        (item) =>
          item.category === 'Technology' || item.category === 'technology',
      )
    } catch (e) {
      hostingProviders.value = []
      deploymentTechnologies.value = []
      return e
    }
  }

  return {
    hostingProviders,
    deploymentTechnologies,
    fetchList,
  }
}
