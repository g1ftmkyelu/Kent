<template>
  <div class="resource-display">
    <div v-if="showHeading" class="mb-4">
      <h2 class="heading">{{ resource.label }}</h2>
    </div>
    
    <div class="grid-layout">
      <GridLayout :rows="layout.rows" :columns="layout.columns" :layout="layoutItems">
        <template v-for="item in layoutItems" :key="item.name" #[item.name]>
          <div class="grid-item-container">
            <template v-if="item.type === 'field'">
              <DynamicFieldRenderer 
                :field="getFieldByName(item.name)" 
                :value="displayData[item.name]"
                :fallbackType="item.fallbackType || 'text'"
              />
            </template>
            <template v-else-if="item.type === 'action'">
              <action_dispatcher
                :resource="{ name: resource.name, path: resource.path, schema: resource.schema, actions: item.actions }"
                :item="payload || displayData"
                :orientation="item.orientation || defaultOrientation"
              />
            </template>
          </div>
        </template>
      </GridLayout>
    </div>
  </div>
</template>

<script>
import DynamicFieldRenderer from './fieldrenderer.vue';
import GridLayout from './Gridlayout.vue';
import action_dispatcher from '../action_dispatcher.vue';

export default {
  name: 'ResourceRenderer',
  components: {
    DynamicFieldRenderer,
    GridLayout,
    action_dispatcher
  },
  props: {
    resource: {
      type: Object,
      required: true,
    },
    displayData: {
      type: Object,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    defaultOrientation: {
      type: String,
      default: 'icons',
    },
    payload: {
      type: Object,
      required: false,
    },
    showHeading: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    layoutItems() {
      const fieldItems = Object.entries(this.layout.fields).map(([name, item]) => ({
        name,
        type: 'field',
        alignment: item.alignment || 'top-left', // Add this line
        ...item,
      }));
      const actionItems = (this.layout.actions || []).map(item => ({
        type: 'action',
        alignment: item.alignment || 'top-left', // Add this line
        ...item,
      }));
      return [...fieldItems, ...actionItems];
    },
  },
  methods: {
    getFieldByName(name) {
      return this.resource.schema.find(field => field.name === name) || { name, type: 'text' };
    },
  }
};
</script>

<style scoped>
.resource-display {
  position: relative;
}
</style>
