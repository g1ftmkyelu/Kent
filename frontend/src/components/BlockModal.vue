<!-- BlockGallery.vue -->
<template>
    <div class="block-gallery">
      <div class="gallery-grid">
        <a-card
          v-for="block in blocks"
          :key="block.key"
          class="card"
          hoverable
          @click="showBlock(block)"
        >
          <template #cover>
            <div class="">
              <h3>{{ block.title }}</h3>
              <p>{{ block.description }}</p>
            </div>
          </template>
        </a-card>
      </div>
  
      <a-modal
        v-model:visible="modalVisible"
        :title="selectedBlock?.title"
        width="90%"
        :footer="null"
      >
        <BlockGrid
          v-if="selectedBlock"
          :blockConfigs="selectedBlock.blockConfigs"
          :layout="selectedBlock.layout"
          :rows="selectedBlock.rows"
          :columns="selectedBlock.columns"
          @blockUpdate="(data) => handleBlockUpdate(selectedBlock.key, data)"
        />
      </a-modal>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BlockGrid from './BlockGrid.vue';
  
  const props = defineProps({
    blocks: {
      type: Array,
      required: true
    }
  });
  
  const modalVisible = ref(false);
  const selectedBlock = ref(null);
  const emit = defineEmits(['blockSelect', 'blockUpdate']);
  
  const showBlock = (block) => {
    selectedBlock.value = block;
    modalVisible.value = true;
    emit('blockSelect', block.key);
  };
  
  const handleBlockUpdate = (blockKey, data) => {
    emit('blockUpdate', { blockKey, ...data });
  };
  </script>
  
  <style scoped>
  .block-gallery {
    padding: 20px;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .gallery-item {
    cursor: pointer;
  }
  
  .preview-container {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f0f2f5;
    padding: 20px;
  }
  </style>