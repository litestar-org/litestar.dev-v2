import type { BlogArticle } from '~/types'

export const useBlog = () => {
  const { data: articles, refresh } = useAsyncData<BlogArticle[]>(
    'blog',
    async () => {
      return queryCollection('blog')
        .where('extension', '=', 'md')
        .order('date', 'DESC')
        .all()
        .then((res) =>
          res.filter(
            (article) =>
              article.path !== '/blog'
              // Hide drafts from the published site (still visible in dev).
              && (import.meta.dev || isPublished(article)),
          ),
        )
    },
    { default: () => [] },
  )

  async function fetchList() {
    if (!articles.value?.length) {
      return refresh()
    }
  }

  return {
    articles,
    fetchList,
  }
}
