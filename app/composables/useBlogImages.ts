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
    return getOgImageUrl(article.path)
  }

  /**
   * Get the generated OG image URL for a blog post path
   */
  const getOgImageUrl = (path: string): string => {
    const config = useRuntimeConfig()
    const siteConfig = useSiteConfig()

    // Get the base URL from site config or construct it
    const baseUrl = siteConfig.url || 'http://localhost:3000'

    // Get the app base URL (e.g., '/litestar.dev-v2/')
    const appBase = config.app.baseURL || '/'

    // Construct the full URL
    // Remove trailing slash from baseUrl and leading slash from appBase if needed
    const cleanBaseUrl = baseUrl.replace(/\/$/, '')
    const cleanAppBase = appBase === '/' ? '' : appBase.replace(/\/$/, '')

    return `${cleanBaseUrl}${cleanAppBase}/__og-image__/static${path}/og.png`
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
    return getOgImageUrl(article.path)
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
