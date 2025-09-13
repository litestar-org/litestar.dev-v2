<script setup lang="ts">
import type { BlogArticle } from '~/types'

withDefaults(
  defineProps<{
    blog: BlogArticle | null
  }>(),
  {
    blog: null,
  },
)
</script>

<template>
  <div class="bg-gray-900 w-full h-full flex flex-col">
    <div class="absolute top-0 bottom-0 left-26 w-[2px] bg-gray-700" />
    <div class="absolute top-0 bottom-0 right-26 w-[2px] bg-gray-700" />
    <div class="absolute top-12 inset-x-0 h-[2px] bg-gray-700" />
    <div class="absolute bottom-12 inset-x-0 h-[2px] bg-gray-700" />
    <div class="mx-26 mt-24 border-y-2 border-gray-700 h-14 flex flex-row items-center">
      <div class="h-full uppercase flex items-center text-[#EAB308] text-[20px] font-semibold px-6 pt-1">
        Litestar Blog
      </div>
    </div>
    <div class="mx-34 mt-6 h-[280px] flex flex-col justify-center">
      <h1 class="text-5xl font-semibold mb-0 flex gap-1 text-white">
        <span>{{ blog.title }}</span>
      </h1>
      <p class="text-3xl text-gray-400 line-clamp-2">
        {{ blog.description }}
      </p>
    </div>
    <div
      class="mx-26 mb-16 border-y-2 border-gray-700 h-14 flex flex-row items-center"
    >
      <div
        class="h-full flex items-center border-r-2 border-gray-700 text-[#EAB308] px-6"
      >
        <Logo class="h-[40px] w-[40px] mt-2" />
      </div>


      <div
        class="h-full uppercase flex items-center border-gray-700 text-[#EAB308] text-[20px] font-semibold px-6"
      >
        {{ blog.category }}
      </div>
    </div>
  </div>
</template>
