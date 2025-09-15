<template>
  <div class="flex items-center">
    <UButton
      icon="i-simple-icons-discord"
      :to="config.public.discordUrl"
      target="_blank"
      variant="ghost"
      color="neutral"
      size="xs"
    >
      <span class="sr-only">Litestar on Discord</span>
    </UButton>
    <UButton
      icon="i-simple-icons-github"
      :to="config.public.githubUrl"
      target="_blank"
      variant="ghost"
      color="neutral"
      size="xs"
    >
      <span class="sr-only">Litestar on GitHub</span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>