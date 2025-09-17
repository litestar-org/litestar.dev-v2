<script setup lang="ts">
const { footerLinks } = useFooterLinks()
const config = useRuntimeConfig()
const colorMode = useColorMode()
</script>

<template>
  <USeparator icon="i-custom-litestar" class="h-px" />

  <UFooter
    :ui="{
      top: 'border-b border-default',
      root: 'bg-gray-50 dark:bg-gray-900',
    }"
  >
    <template #top>
      <UContainer>
        <UFooterColumns :columns="footerLinks">
          <template #left>
            <div class="flex items-center space-x-2 mb-4">
              <ClientOnly>
                <UIcon
                  :name="
                    colorMode.value === 'dark'
                      ? 'i-custom-litestar-full-dark'
                      : 'i-custom-litestar-full'
                  "
                  class="h-8 w-30"
                />
                <template #fallback>
                  <UIcon name="i-custom-litestar-full" class="h-8 w-30" />
                </template>
              </ClientOnly>
            </div>
            <p class="text-muted text-sm max-w-md">
              A modern, fast Python ASGI framework for building APIs that scale.
            </p>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        © {{ new Date().getFullYear() }} Litestar. Released under the MIT
        License.
      </p>
    </template>

    <template #right>
      <UButton
        color="neutral"
        variant="ghost"
        :to="config.public.githubUrl"
        target="_blank"
        icon="i-simple-icons-github"
      >
        <span class="sr-only">Litestar on GitHub</span>
      </UButton>
      <UButton
        color="neutral"
        variant="ghost"
        :to="config.public.discordUrl"
        target="_blank"
        icon="i-simple-icons-discord"
      >
        <span class="sr-only">Litestar on Discord</span>
      </UButton>
    </template>
  </UFooter>
</template>
