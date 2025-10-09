<script setup lang="ts">
defineProps<{
  data: {
    label: string
    backgroundColor?: string
  }
}>()
</script>

<template>
  <div class="config-node" :style="{ backgroundColor: data.backgroundColor || '#DBEAFE' }">
    {{ data.label }}
  </div>
</template>

<style scoped>
.config-node {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-radius: 2px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
</style>
