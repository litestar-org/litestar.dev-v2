<script setup lang="ts">
import { ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

type Data = { label: string }

const props = defineProps<{
  data: Data
  selected: boolean
}>()

const open = ref(false)
</script>

<template>
  <div class="node" @mouseleave="open = false">
    <!-- Icon (top-left) -->
    <button
      type="button"
      aria-label="Node menu"
      class="node__icon"
      @mouseenter="open = true"
      @focus="open = true"
    >
      ⚙️
    </button>

    <!-- Label / content -->
    <div class="node__label">{{ props.data.label }}</div>

    <!-- Example handles -->
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />

    <!-- Toolbar -->
    <NodeToolbar
      :isVisible="open || props.selected"
      :position="Position.Top"
      align="start"
      :offset="8"
    >
      <div class="toolbar" @mouseenter="open = true">
        <button class="toolbar__btn" @click="$emit('duplicate')">
          Duplicate
        </button>
        <button class="toolbar__btn" @click="$emit('lock')">Lock</button>
        <button
          class="toolbar__btn toolbar__btn--danger"
          @click="$emit('delete')"
        >
          Delete
        </button>
      </div>
    </NodeToolbar>
  </div>
</template>

<style scoped>
.node {
  position: relative;
  min-width: 220px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.node__icon {
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 4px;
  border: 0;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
}
.node__icon:focus,
.node__icon:hover {
  background: #f3f4f6;
  outline: none;
}
.node__label {
  padding: 14px 12px 12px 12px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}
.toolbar {
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  font-size: 12px;
}
.toolbar__btn {
  padding: 4px 8px;
  border-radius: 6px;
  border: 0;
  background: transparent;
  cursor: pointer;
}
.toolbar__btn:hover {
  background: #f3f4f6;
}
.toolbar__btn--danger:hover {
  background: #fef2f2;
}
</style>
