import type { BlogArticle } from '~/types'

export const useBlogImages = () => {
  /**
   * Get the OG image URL for a blog post
   * Falls back to frontmatter image if OG image fails
   */
  const getBlogPostImage = (article: BlogArticle): string => {
    // If the article has a custom image in frontmatter, use it
    if (article.image) {
      return article.image
    }

    // Otherwise, use the auto-generated OG image
    return getOgImageUrl(article)
  }

  /**
   * Get the generated OG image URL for a blog post.
   *
   * v6 encodes the render options into the static file path, so this must use
   * the same component + props that blog/[slug].vue passes to defineOgImage()
   * ('Blog' with minimal { title, category }). getOgImagePath() is auto-imported
   * by nuxt-og-image and joins the app baseURL for us.
   */
  const getOgImageUrl = (article: BlogArticle): string => {
    const { path } = getOgImagePath(article.path, {
      component: 'Blog',
      props: { blog: { title: article.title, category: article.category } },
    })

    // Returns the baseURL-prefixed path. These are rendered with @nuxt/image's
    // `none` provider (see blog/index.vue) so the URL is used as-is rather than
    // run through IPX — the OG image is generated during prerender, so IPX has
    // no source file to optimize when the listing page is built first.
    return path
  }

  /**
   * Get blog post image with fallback handling
   * Returns OG image URL, or frontmatter image, or placeholder
   */
  const getBlogPostImageWithFallback = (article: BlogArticle): string => {
    // Priority order:
    // 1. Custom image from frontmatter
    // 2. Generated OG image
    // 3. Placeholder image

    if (article.image && article.image !== '') {
      return article.image
    }

    // Use generated OG image as primary choice
    return getOgImageUrl(article)
  }

  /**
   * Process articles to ensure they have image URLs
   */
  const enrichArticlesWithImages = (articles: BlogArticle[]): BlogArticle[] => {
    return articles.map((article) => ({
      ...article,
      // Use OG image if no image is specified
      image: getBlogPostImageWithFallback(article),
    }))
  }

  /**
   * Check if an article should use OG image
   */
  const shouldUseOgImage = (article: BlogArticle): boolean => {
    return !article.image || article.image === ''
  }

  return {
    getBlogPostImage,
    getOgImageUrl,
    getBlogPostImageWithFallback,
    enrichArticlesWithImages,
    shouldUseOgImage,
  }
}
