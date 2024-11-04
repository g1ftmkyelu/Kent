<!-- BlockTimeline.vue -->
<template>
    <a-timeline mode="alternate">
      <a-timeline-item 
        v-for="block in timelineBlocks" 
        :key="block.key"
        :color="block.color"
      >
        <template #dot>
          <component :is="block.icon" />
        </template>
        
        <a-card :title="block.title">
          <BlockGrid
            :blockConfigs="block.blockConfigs"
            :layout="block.layout"
            :rows="block.rows"
            :columns="block.columns"
            @blockUpdate="(data) => handleBlockUpdate(block.key, data)"
          />
        </a-card>
      </a-timeline-item>
    </a-timeline>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import BlockGrid from './BlockGrid.vue';
  
  const props = defineProps({
    timelineBlocks: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['blockUpdate']);
  
  const handleBlockUpdate = (blockKey, data) => {
    emit('blockUpdate', { blockKey, ...data });
  };
  </script>