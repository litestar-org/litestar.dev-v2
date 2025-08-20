<script setup lang="ts">
interface Template {
  title: string
  description: string
  path: string
  logoIcon?: string
  featured?: boolean
  template?: string // template identifier for dynamic commands
}

const { template } = defineProps<{
  template: Template
}>()

const { copy } = useClipboard()
const { selectedPackageManager } = usePackageManager()

const dynamicCommand = computed(() => {
  if (!template.template) return ''
  
  if (selectedPackageManager.value.label === 'pip') {
    return `pipx litestar create -t ${template.template}`
  } else {
    return `uvx litestar@latest create -t ${template.template}`
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
    :to="template.path"
    :title="template.title"
    :description="template.description"
    external
    :ui="{
      footer: template.template ? 'w-full mt-auto pointer-events-auto pt-4 z-[1]' : ''
    }"
  >
    <template #leading>
      <UIcon v-if="template.logoIcon" :name="template.logoIcon" class="size-10 text-primary" />
    </template>
    <UBadge
      v-if="template.featured === true"
      class="shine absolute top-4 right-4 sm:top-6 sm:right-6"
      variant="subtle"
      color="success"
      label="Recommended"
    />
    <template #title>
      {{ template.title }}
    </template>
    
    <template #description>
      <span class="line-clamp-2">{{ template.description }}</span>
    </template>

    <template v-if="template.template" #footer>
      <USeparator type="dashed" class="mb-4" />
      
      <div class="flex items-center justify-between gap-2">
        <UTooltip text="View on GitHub">
          <UButton
            icon="i-lucide-github"
            color="neutral"
            size="sm"
            variant="outline"
            :to="template.path"
            external
            @click.stop
          >
            GitHub
            <span class="sr-only">View {{ template.title }} on GitHub</span>
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
            <span class="sr-only">Copy command for {{ template.title }}</span>
          </UButton>
        </UTooltip>
      </div>
    </template>
  </UPageCard>
</template>