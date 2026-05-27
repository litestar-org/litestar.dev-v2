<script setup lang="ts">
// Shared community section rendered under the table of contents on the blog
// and plugin detail pages. Renders as fragment children so it can slot into an
// existing `space-y-*` wrapper inside the UContentToc `#bottom` slot.
const config = useRuntimeConfig()

const communityLinks = [
  {
    label: 'Discord',
    icon: 'i-simple-icons-discord',
    to: config.public.discordUrl,
    target: '_blank',
  },
  {
    label: 'Discussions',
    icon: 'i-lucide-messages-square',
    to: config.public.discussionsUrl,
    target: '_blank',
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: config.public.githubUrl,
    target: '_blank',
  },
]
</script>

<template>
  <USeparator type="dashed" />
  <UPageLinks
    title="Community"
    aria-label="Community"
    :links="communityLinks"
  />
</template>
