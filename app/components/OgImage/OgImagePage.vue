<script setup lang="ts">

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="bg-gray-900 w-full h-full flex flex-col">
    <div class="absolute top-0 bottom-0 left-26 w-[2px] bg-gray-700" />
    <div class="absolute top-0 bottom-0 right-26 w-[2px] bg-gray-700" />
    <div class="absolute top-12 inset-x-0 h-[2px] bg-gray-700" />
    <div class="absolute bottom-12 inset-x-0 h-[2px] bg-gray-700" />
    <div class="mx-34 mt-12 h-100 flex flex-col justify-center">
      <div class="flex justify-flex-start">
        <LitestarLogoDark />
      </div>
      <h1 class="text-5xl font-semibold mb-0 flex gap-1 text-white mt-20">
        <span>{{ title }}</span>
      </h1>
      <p class="text-3xl text-gray-400 line-clamp-2">
        {{ description }}
      </p>
    </div>

  </div>
</template>
