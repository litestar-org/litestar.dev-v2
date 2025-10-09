<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@vue-flow/core'
import { VueFlow, MarkerType, Position } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import ContainerNode from './nodes/ContainerNode.vue'
import ToolbarNode from './nodes/ToolbarNode.vue'
import ConfigNode from './nodes/ConfigNode.vue'

// Litestar configuration layers
const nodes = ref<Node[]>([
  // Main box (blue)
  {
    id: 'application-layer-box',
    type: 'container',
    data: { label: 'Application layer' },
    position: { x: 0, y: 20 },
    height: 640,
    width: 500,
    style: {
      backgroundColor: '#EFF6FF',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      zIndex: -1,
      pointerEvents: 'none'
    },
    draggable: false,
  },
  // Router/Controller layer (purple) inside main box
  {
    id: 'router-controller-layer-box',
    type: 'container',
    data: { label: 'Router/Controller layer' },
    parentNode: 'application-layer-box',
    position: { x: 20, y: 200 },
    width: 460,
    height: 420,
    style: {
      backgroundColor: '#fae8ff',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      zIndex: -1,
      pointerEvents: 'none'
    },
    draggable: false,
  },
  // Handler layers (green) inside Router/Controller layer
  {
    id: 'handler-layer-box-1',
    type: 'container',
    data: { label: 'Handler layer' },
    parentNode: 'router-controller-layer-box',
    position: { x: 20, y: 200 },
    width: 200,
    height: 200,
    style: {
      backgroundColor: '#D9E7D6',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      zIndex: -1,
      pointerEvents: 'none'
    },
    draggable: false,
  },
  // Second handler layer (green) inside Router/Controller layer
  {
    id: 'handler-layer-box-2',
    type: 'container',
    data: { label: 'Handler layer', labelPosition: 'right' },
    parentNode: 'router-controller-layer-box',
    position: { x: 240, y: 200 },
    width: 200,
    height: 200,
    style: {
      backgroundColor: '#D9E7D6',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      zIndex: -1,
      pointerEvents: 'none'
    },
    draggable: false,
  },
  // Production configuration (top)
  {
    id: 'production',
    type: 'config',
    data: { label: 'Application configuration', backgroundColor: '#DBEAFE' },
    position: { x: 150, y: 70 },
    width: 200,
    height: 50,
  },
  // Icon node in application layer
  {
    id: 'application-layer-config',
    type: 'icon',
    data: {
      label: '⎇+',
      tooltip: '<span style="color: #3b82f6;">Anonymize PII data</span>',
      toolbarPosition: Position.Right,
    },
    position: { x: 230, y: 155 },
    style: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      cursor: 'pointer',
    },
  },
  // Router controller configuration (middle)
  {
    id: 'staging',
    type: 'config',
    data: { label: 'Router/Controller configuration', backgroundColor: '#f3e8ff' },
    position: { x: 150, y: 270 },
    width: 200,
    height: 50,
  },
  // Icon node router controller configuration
  {
    id: 'branchPlus',
    type: 'icon',
    data: {
      label: '⎇+',
      tooltip: 'Router configuration',
      toolbarPosition: Position.Right,
    },
    position: { x: 230, y: 335 },
    style: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      cursor: 'pointer',
    },
  },
  // Get users
  {
    id: 'get-users',
    type: 'config',
    data: { label: 'GET /users', backgroundColor: '#C1D9BC' },
    position: { x: 20, y: 60 },
    parentNode: 'handler-layer-box-1',
    width: 160,
    height: 40,
  },
  // Post users
  {
    id: 'post-users',
    type: 'config',
    data: { label: 'POST /users', backgroundColor: '#C1D9BC' },
    position: { x: 20, y: 60 },
    parentNode: 'handler-layer-box-2',
    width: 160,
    height: 40,
  },
  // Icon nodes in handler layers
  {
    id: 'get-users-icon',
    type: 'icon',
    data: {
      label: '⎇+',
      tooltip: 'Handler configuration',
      toolbarPosition: Position.Right,
    },
    position: { x: 80, y: 130 },
    parentNode: 'handler-layer-box-1',
    style: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      cursor: 'pointer',
    },
  },
  {
    id: 'post-users-icon',
    type: 'icon',
    data: {
      label: '⎇+',
      tooltip: `<strong>operation_id:</strong> ListUsers
<strong>name:</strong> users:list
<strong>summary:</strong> List Users
<strong>description:</strong> Retrieve the users.
<strong>path:</strong> /users
<strong>cache:</strong> None`,
      toolbarPosition: Position.Right,
    },
    position: { x: 80, y: 130 },
    parentNode: 'handler-layer-box-2',
    style: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      cursor: 'pointer',
    },
  },
])

const edges = ref<Edge[]>([
  {
    id: 'e-prod-staging',
    source: 'production',
    target: 'application-layer-config',
    animated: true,
    style: { stroke: '#71717a', strokeWidth: 1, strokeDasharray: '5,5' },
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e-application-layer-config-staging',
    source: 'application-layer-config',
    target: 'staging',
    animated: true,
    style: { stroke: '#71717a', strokeWidth: 1, strokeDasharray: '5,5' },
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e-staging-branchPlus',
    source: 'staging',
    target: 'branchPlus',
    animated: true,
    style: { stroke: '#71717a', strokeWidth: 1, strokeDasharray: '5,5' },
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e-branchPlus-get-users',
    source: 'branchPlus',
    target: 'get-users',
    animated: true,
    style: { stroke: '#71717a', strokeWidth: 1, strokeDasharray: '5,5' },
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e-branchPlus-post-users',
    source: 'branchPlus',
    target: 'post-users',
    animated: true,
    style: { stroke: '#71717a', strokeWidth: 1, strokeDasharray: '5,5' },
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e-get-users-icon',
    source: 'get-users',
    target: 'get-users-icon',
    animated: true,
    style: { stroke: '#71717a', strokeWidth: 1, strokeDasharray: '5,5' },
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e-post-users-icon',
    source: 'post-users',
    target: 'post-users-icon',
    animated: true,
    style: { stroke: '#71717a', strokeWidth: 1, strokeDasharray: '5,5' },
    markerEnd: MarkerType.ArrowClosed,
  },
])
</script>

<template>
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      fit-view-on-init
      :zoom-on-scroll="false"
      :zoom-on-pinch="false"
      :zoom-on-double-click="false"
      :nodes-draggable="false"
      :nodes-connectable="false"
      :pan-on-drag="false"
      :pan-on-scroll="false"
    >
      <template #node-container="{ data }">
        <ContainerNode :data="data" />
      </template>

      <template #node-config="{ data }">
        <ConfigNode :data="data" />
      </template>

      <template #node-icon="props">
        <ToolbarNode :id="props.id" :data="props.data" />
      </template>

      <template #node-default="{ data, id }">
        <div class="custom-node">
          {{ data.label }}
          <NodeToolbar v-if="data.tooltip" :node-id="id">
            <div class="toolbar-content">{{ data.tooltip }}</div>
          </NodeToolbar>
        </div>
      </template>

      <Background />
    </VueFlow>
</template>

<style scoped>

.vue-flow {
  flex: 1;
  background: #ffffff;
}

.vue-flow__node {
  cursor: default;
}

.vue-flow__node:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Container boxes shouldn't respond to hover */
.vue-flow__node[data-id="your-cloud-box"]:hover,
.vue-flow__node[data-id="xata-cloud-box"]:hover {
  box-shadow: none;
}

/* Icon nodes get hover effect */
.vue-flow__node[data-id="application-layer-config"]:hover,
.vue-flow__node[data-id="branchPlus"]:hover,
.vue-flow__node[data-id="merge"]:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
  cursor: help;
}

.custom-node {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar-content {
  background: #18181b;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
