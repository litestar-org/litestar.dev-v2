<script setup lang="ts">
import type { Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

defineProps<{
  id: string
  data: {
    label: string
    tooltip: string
    toolbarPosition: Position
  }
}>()
</script>

<template>
  <NodeToolbar :position="data.toolbarPosition">
    <div class="toolbar-content" v-html="data.tooltip"></div>
  </NodeToolbar>

  <div>
    {{ data.label }}
  </div>
</template>

<style scoped>
.toolbar-content {
  background: #ffffff;
  color: #18181b;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 12px;
  white-space: pre-line;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  border: 1px solid #d1d5db;
}

.dark .toolbar-content {
  background: #1f2937;
  color: #f3f4f6;
  border-color: #374151;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}
</style>
