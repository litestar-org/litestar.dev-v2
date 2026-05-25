<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()

// takumi (the v6 OG renderer) rejects Tailwind's `line-clamp` utility because it
// compiles to `display: -webkit-box`; clamp the description length here instead.
const clampedDescription = computed(() =>
  props.description.length > 120
    ? `${props.description.slice(0, 119).trimEnd()}…`
    : props.description,
)
</script>

<template>
  <div class="bg-gray-900 w-full h-full flex flex-col" style="font-family: 'Inter'">
    <div class="absolute top-0 bottom-0 left-26 w-[2px] bg-gray-700" />
    <div class="absolute top-0 bottom-0 right-26 w-[2px] bg-gray-700" />
    <div class="absolute top-12 inset-x-0 h-[2px] bg-gray-700" />
    <div class="absolute bottom-12 inset-x-0 h-[2px] bg-gray-700" />
    <div class="mx-34 mt-12 h-100 flex flex-col justify-center">
      <div class="flex justify-start">
        <LitestarLogoDark />
      </div>
      <h1 class="text-5xl font-semibold mb-0 flex gap-1 text-white mt-20">
        <span>{{ title }}</span>
      </h1>
      <p class="text-3xl text-gray-400">
        {{ clampedDescription }}
      </p>
    </div>
  </div>
</template>
