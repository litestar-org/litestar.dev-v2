<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <UIcon name="i-custom-litestar-full" class="h-8 w-30" />
          </div>
          <p class="text-gray-600 max-w-md">
            A modern, fast Python ASGI framework for building APIs that scale.
          </p>
        </div>
        
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Framework</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/docs" class="text-gray-600 hover:text-primary-600">Documentation</NuxtLink></li>
            <li><NuxtLink to="/examples" class="text-gray-600 hover:text-primary-600">Examples</NuxtLink></li>
            <li><NuxtLink to="/api" class="text-gray-600 hover:text-primary-600">API Reference</NuxtLink></li>
            <li><NuxtLink to="/changelog" class="text-gray-600 hover:text-primary-600">Changelog</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Community</h3>
          <ul class="space-y-2">
            <li><a href="https://github.com/litestar-org/litestar" target="_blank" class="text-gray-600 hover:text-primary-600">GitHub</a></li>
            <li><a href="https://discord.gg/litestar" target="_blank" class="text-gray-600 hover:text-primary-600">Discord</a></li>            <li><NuxtLink to="/blog" class="text-gray-600 hover:text-primary-600">Blog</NuxtLink></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
        <p class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} Litestar. Released under the MIT License.
        </p>
        <div class="flex items-center space-x-4 mt-4 sm:mt-0">
          <NuxtLink to="/privacy" class="text-gray-500 hover:text-primary-600 text-sm">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="text-gray-500 hover:text-primary-600 text-sm">Terms</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>