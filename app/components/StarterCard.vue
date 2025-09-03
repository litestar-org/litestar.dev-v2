<script setup lang="ts">
import type { StartersCollectionItem } from '@nuxt/content';


const { starter } = defineProps<{
  starter: StartersCollectionItem
}>()

const { copy } = useClipboard()
const { selectedPackageManager } = usePackageManager()

const dynamicCommand = computed(() => {
  if (!starter.template) return ''
  
  if (selectedPackageManager.value.label === 'pip') {
    return `pipx litestar create -t ${starter.template}`
  } else {
    return `uvx litestar@latest create -t ${starter.template}`
  }
})

function copyCommand() {
  if (dynamicCommand.value) {
    copy(dynamicCommand.value, { title: 'Command copied to clipboard:', description: dynamicCommand.value })
  }
}
</script>

<template>
  <UPageCard
    :title="starter.title"
    :description="starter.description"
    external
    :ui="{
      footer: starter.template ? 'w-full mt-auto pointer-events-auto pt-4 z-[1]' : ''
    }"
  >
    <template #leading>
      <UIcon v-if="starter.icon" :name="starter.icon" class="size-10 text-primary" />
    </template>
    <UBadge
      v-if="starter.featured === true"
      class="shine absolute top-4 right-4 sm:top-6 sm:right-6"
      variant="subtle"
      color="success"
      label="Recommended"
    />
    <template #title>
      {{ starter.title }}
    </template>
    
    <template #description>
      <span class="line-clamp-2">{{ starter.description }}</span>
    </template>

    <template v-if="starter.template" #footer>
      <USeparator type="dashed" class="mb-4" />
      
      <div class="flex items-center justify-between gap-2">
        <UTooltip text="View on GitHub">
          <UButton
            icon="i-lucide-github"
            color="neutral"
            size="sm"
            variant="outline"
            :to="starter.github"
            external
            @click.stop
          >
            GitHub
            <span class="sr-only">View {{ starter.title }} on GitHub</span>
          </UButton>
        </UTooltip>
        
        <UTooltip text="Copy command">
          <UButton
            icon="i-lucide-terminal"
            color="neutral"
            size="sm"
            variant="outline"
            @click.stop="copyCommand()"
          >
            <span class="sr-only">Copy command for {{ starter.title }}</span>
          </UButton>
        </UTooltip>
      </div>
    </template>
  </UPageCard>
</template>