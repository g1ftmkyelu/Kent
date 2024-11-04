<!-- BlockTabs.vue -->
<template>
    <a-tabs v-model:activeKey="activeTabKey">
      <a-tab-pane 
        v-for="tab in tabs" 
        :key="tab.key" 
        :tab="tab.title"
      >
        <BlockGrid
          :blockConfigs="tab.blockConfigs"
          :layout="tab.layout"
          :rows="tab.rows || defaultConfig.rows"
          :columns="tab.columns || defaultConfig.columns"
          :rowHeight="tab.rowHeight || defaultConfig.rowHeight"
          :gap="tab.gap || defaultConfig.gap"
          @blockUpdate="(data) => handleBlockUpdate(tab.key, data)"
        />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import BlockGrid from './BlockGrid.vue';
  
  const props = defineProps({
    tabs: {
      type: Array,
      required: true,
      // Example structure:
      // [{
      //   key: 'tab1',
      //   title: 'Dashboard 1',
      //   blockConfigs: [...],
      //   layout: [...],
      //   rows: 12,
      //   columns: 12,
      //   rowHeight: 60,
      //   gap: '10px'
      // }]
    },
    defaultConfig: {
      type: Object,
      default: () => ({
        rows: 12,
        columns: 12,
        rowHeight: 60,
        gap: '10px'
      })
    }
  });
  
  const emit = defineEmits(['tabChange', 'blockUpdate']);
  const activeTabKey = ref(props.tabs[0]?.key || '1');
  
  const handleBlockUpdate = (tabKey, updateData) => {
    emit('blockUpdate', {
      tabKey,
      ...updateData
    });
  };
  
  // Watch for tab changes
  watch(activeTabKey, (newKey) => {
    emit('tabChange', newKey);
  });
  </script>
  
  <style scoped>
  .ant-tabs {
    width: 100%;
  }
  </style>