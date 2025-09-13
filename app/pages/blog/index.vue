<script setup lang="ts">
definePageMeta({
  heroBackground: 'opacity-70 -z-10',
})
const { fetchList, articles } = useBlog()
const { enrichArticlesWithImages } = useBlogImages()

const page = {
  title: 'Litestar Blog',
  description: 'Read the latest news about Litestar ecosystem',
}

useSeoMeta({
  titleTemplate: '%s',
  title: page.title,
  description: page.description,
  ogDescription: page.description,
  ogTitle: page.title,
})

defineOgImageComponent('Page', {
  title: page.title,
  description: page.description,
})

// Enrich articles with OG images when no image is specified
const articlesWithImages = computed(() => {
  return enrichArticlesWithImages(articles.value || [])
})

await fetchList()

// console.log('ARTICLES:', articlesWithImages.value)
</script>

<template>
  <UContainer>
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
    >
    </UPageHero>

    <UPageBody>
      <UContainer>
        <UBlogPosts class="mb-12 md:grid-cols-2 lg:grid-cols-3">
          <UBlogPost
            v-for="(article, index) in articlesWithImages"
            :key="article.path"
            :to="article.path"
            :title="article.title"
            :description="article.description"
            :image="{
              src: article.image,
              width: index === 0 ? 672 : 437,
              height: index === 0 ? 378 : 246,
              alt: `${article.title} image`,
            }"
            :date="formatDateByLocale('en', article.date)"
            :authors="
              article.authors.map((author) => ({
                ...author,
                avatar: { ...author.avatar, alt: `${author.name} avatar` },
              }))
            "
            :badge="{
              label: article.category,
              color: 'primary',
              variant: 'subtle',
            }"
            :variant="index === 0 ? 'outline' : 'subtle'"
            :orientation="index === 0 ? 'horizontal' : 'vertical'"
            :class="[index === 0 && 'col-span-full']"
          />
        </UBlogPosts>
      </UContainer>
    </UPageBody>
  </UContainer>
</template>
