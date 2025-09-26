<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

interface CustomNodeData {
  title: string
  subtitle?: string
  icon?: string
}

defineProps<NodeProps<CustomNodeData>>()
</script>

<template>
  <div class="custom-node group">
    <Handle
      type="target"
      :position="Position.Top"
      class="!w-3 !h-3 !bg-primary-500 !border-2 !border-white shadow-md"
    />

    <div class="node-content">
      <div class="flex items-center gap-3">
        <div class="node-icon">
          <UIcon
            :name="data?.icon || 'i-lucide-box'"
            class="w-5 h-5 text-primary-600"
          />
        </div>
        <div class="node-text">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">
            {{ data?.title || label }}
          </h3>
          <p
            v-if="data?.subtitle"
            class="text-sm text-gray-600 dark:text-gray-300"
          >
            {{ data.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <Handle
      type="source"
      :position="Position.Bottom"
      class="!w-3 !h-3 !bg-primary-500 !border-2 !border-white shadow-md"
    />
  </div>
</template>

<style scoped>
.custom-node {
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.2s;
  min-width: 180px;
  padding: 16px;
}

@media (prefers-color-scheme: dark) {
  .custom-node {
    background: #1f2937;
    border-color: #374151;
  }
}

.custom-node:hover {
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-color: #bfdbfe;
  transform: translateY(-2px);
}

@media (prefers-color-scheme: dark) {
  .custom-node:hover {
    border-color: #1d4ed8;
  }
}

.node-content {
  position: relative;
  z-index: 10;
}

.node-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: #eff6ff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (prefers-color-scheme: dark) {
  .node-icon {
    background: rgba(37, 99, 235, 0.1);
  }
}

.node-text h3 {
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 600;
  color: #111827;
}

@media (prefers-color-scheme: dark) {
  .node-text h3 {
    color: #f9fafb;
  }
}

.node-text p {
  font-size: 0.75rem;
  line-height: 1.25;
  margin-top: 0.25rem;
  color: #6b7280;
}

@media (prefers-color-scheme: dark) {
  .node-text p {
    color: #d1d5db;
  }
}

/* Handle styles */
.custom-node :deep(.vue-flow__handle) {
  opacity: 0;
  transition: opacity 0.2s;
}

.custom-node:hover :deep(.vue-flow__handle) {
  opacity: 1;
}
</style>
