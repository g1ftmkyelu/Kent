<!-- BlockAccordion.vue -->
<template>
    <a-collapse v-model:activeKey="activeKeys" :accordion="false">
      <a-collapse-panel 
        v-for="section in sections" 
        :key="section.key" 
        :header="section.title"
      >
        <BlockGrid
          :blockConfigs="section.blockConfigs"
          :layout="section.layout"
          :rows="section.rows"
          :columns="section.columns"
          @blockUpdate="(data) => handleBlockUpdate(section.key, data)"
        />
      </a-collapse-panel>
    </a-collapse>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BlockGrid from './BlockGrid.vue';
  
  const activeKeys = ref(['1']);
  const emit = defineEmits(['sectionUpdate', 'blockUpdate']);
  
  defineProps({
    sections: {
      type: Array,
      required: true
    }
  });
  
  const handleBlockUpdate = (sectionKey, data) => {
    emit('blockUpdate', { sectionKey, ...data });
  };
  </script>