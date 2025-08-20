<template>
  <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <UIcon name="i-custom-litestar-full" class="h-8 w-30" />
          </div>
          <p class="text-gray-600 dark:text-gray-400 max-w-md">
            A modern, fast Python ASGI framework for building APIs that scale.
          </p>
        </div>
        
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Framework</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Documentation</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Examples</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">API Reference</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Changelog</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Community</h3>
          <ul class="space-y-2">
            <li><a href="https://github.com/litestar-org/litestar" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">GitHub</a></li>
            <li><a href="https://discord.gg/litestar" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Discord</a></li>
            <li><NuxtLink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Blog</NuxtLink></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} Litestar. Released under the MIT License.
        </p>
        <div class="flex items-center space-x-4 mt-4 sm:mt-0">
          <NuxtLink to="#" class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Privacy</NuxtLink>
          <NuxtLink to="#" class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">Terms</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>