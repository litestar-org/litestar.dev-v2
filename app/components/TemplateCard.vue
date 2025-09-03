<template>
  <UPageCard
    :to="template.links?.[0]?.to"
    :icon="template.icon"
    :title="template.title"
    target="_blank"
    variant="subtle"
    class="group rounded-md"
    :ui="{
      container: 'p-4 sm:p-4',
      wrapper: 'flex-row items-center gap-1.5',
      leading: 'mb-0',
      leadingIcon: 'text-highlighted'
    }"
  >
    <template #title>
      <div class="flex items-center justify-between w-full">
        <span>{{ template.title }}</span>
        <div class="flex gap-1">
          <UButton
            v-for="(link, index) in template.links"
            :key="index"
            :to="link.to"
            :label="link.label"
            :leadingIcon="link.leadingIcon"
            :trailingIcon="link.trailingIcon"
            :color="link.color"
            :variant="link.variant"
            size="sm"
            target="_blank"
          />
        </div>
      </div>
    </template>
    <UColorModeImage
      :light="`/templates/${template.title.toLowerCase().replace(/\s+/g, '-')}-light.png`"
      :dark="`/templates/${template.title.toLowerCase().replace(/\s+/g, '-')}-dark.png`"
      :alt="`Template ${template.title} screenshot`"
      width="620"
      height="348"
      loading="lazy"
      class="rounded-lg w-full border border-default aspect-video"
    />
  </UPageCard>
</template>

<script setup lang="ts">
import type { TemplatesCollectionItem } from '@nuxt/content'

defineProps<{
  template: TemplatesCollectionItem
}>()
</script>