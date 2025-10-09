<script setup lang="ts">
defineProps<{
  data: {
    label: string
    labelPosition?: 'left' | 'right'
  }
}>()
</script>

<template>
  <div class="container-node">
    <div class="container-label" :class="{ 'label-right': data.labelPosition === 'right' }">{{ data.label }}</div>
  </div>
</template>

<style scoped>
.container-node {
  width: 100%;
  height: 100%;
  position: relative;
}

.container-label {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 13px;
  color: #000000;
  font-weight: 500;
}

.container-label.label-right {
  left: auto;
  right: 10px;
}
</style>
