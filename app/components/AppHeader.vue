<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">L</span>
            </div>
            <span class="text-xl font-bold">Litestar</span>
          </NuxtLink>
        </div>
        
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/docs" class="text-gray-600 hover:text-gray-900 font-medium">
            Docs
          </NuxtLink>
          <NuxtLink to="/examples" class="text-gray-600 hover:text-gray-900 font-medium">
            Examples
          </NuxtLink>
          <NuxtLink to="/ecosystem" class="text-gray-600 hover:text-gray-900 font-medium">
            Ecosystem
          </NuxtLink>
          <NuxtLink to="/community" class="text-gray-600 hover:text-gray-900 font-medium">
            Community
          </NuxtLink>
        </nav>

        <div class="flex items-center space-x-4">
          <UButton
            to="https://github.com/litestar-org/litestar"
            target="_blank"
            variant="ghost"
            icon="i-simple-icons-github"
            class="hidden sm:flex"
          />
          <UButton
            to="/docs/getting-started"
            color="primary"
            class="font-medium"
          >
            Get Started
          </UButton>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.router-link-active {
  @apply text-primary-600;
}
</style>