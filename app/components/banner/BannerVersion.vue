<script setup lang="ts">
</script>

<template>
  <div>
    <UBanner
      id="litestar-3.1"
      title="Litestar 3.1 is out"
      icon="i-lucide-book-open"
      to="https://masteringnuxt.com/?utm_source=nuxt&utm_medium=banner&utm_campaign=nuxt4&friend=nuxt"
      target="_blank"
      close
      :actions="[
        {
          label: 'Claim discount',
          color: 'neutral',
          variant: 'outline',
          trailingIcon: 'i-lucide-arrow-right',
          to: 'https://masteringnuxt.com/?utm_source=nuxt&utm_medium=banner&utm_campaign=nuxt4&friend=nuxt'
        }
      ]"
    />
  </div>
</template>