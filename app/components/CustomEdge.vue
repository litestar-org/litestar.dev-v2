<script lang="ts" setup>
import { computed } from 'vue'
import type { EdgeProps } from '@vue-flow/core'
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useVueFlow,
} from '@vue-flow/core'

const props = defineProps<EdgeProps>()

const { removeEdges } = useVueFlow()

const path = computed(() => getBezierPath(props))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <BaseEdge
    :path="path[0]"
    :style="{
      stroke: '#3b82f6',
      strokeWidth: 2,
      opacity: 0.8,
    }"
  />

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan edge-button-container"
    >
      <button class="edge-button" @click="removeEdges(id)" title="Remove edge">
        <UIcon name="i-lucide-x" class="w-3 h-3" />
      </button>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.edge-button-container {
  opacity: 0;
  transition: opacity 0.2s;
}

.edge-button-container:hover,
.vue-flow__edge:hover + .edge-button-container {
  opacity: 1;
}

.edge-button {
  width: 20px;
  height: 20px;
  background: #ef4444;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
}

.edge-button:hover {
  background: #dc2626;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
