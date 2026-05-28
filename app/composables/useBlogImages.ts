import type { BlogArticle } from '~/types'

export const useBlogImages = () => {
  /**
   * Merge articles with caller-supplied OG-image URLs (frontmatter `image:`
   * wins). Callers obtain the OG paths from `defineOgImage()` in their own
   * page setup — that's the only way to get a URL the prerender will actually
   * write. Indexes must align with the `articles` array.
   */
  const enrichArticlesWithImages = (
    articles: BlogArticle[],
    ogPaths: readonly string[],
  ): BlogArticle[] =>
    articles.map((article, i) => ({
      ...article,
      image: article.image || ogPaths[i],
    }))

  return { enrichArticlesWithImages }
}
