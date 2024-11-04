<template>
  <div>
    <component
      v-if="block && getComponent(block.type)"
      :is="getComponent(block.type)"
      v-bind="block.props"
      @error="handleComponentError"
      @update="handleUpdate"
    />
    <div v-else-if="!block" class="error-message">
      No block data provided
    </div>
  </div>
</template>

<script setup>
import { defineProps, markRaw } from 'vue'
import dynamic_form from './portal/render_modes/crud/dynamic_form.vue'
import objectrenderer from './Object/objectrenderer.vue'
import DataGroup from './Object/DataGroup.vue'
import DynamicCrud from './Object/DynamicCrud.vue'
import multi_step_form from './dynamic_form_alt/multi_step_form.vue'
import flexible_chart from './flexible_chart.vue'
import ActionList from './ActionList.vue'
import Timeline from './Timeline.vue'
import metric from './portal/render_modes/kanban/metric.vue'
import BlockTabs from './BlockTabs.vue'
import BlockCarousel from './BlockCarousel.vue'
import BlockAccordion from './BlockAccordion.vue'
import BlockModal from './BlockModal.vue'
import BlockTimeline from './BlockTimeline.vue'
import VerticalBlockTabs from './VerticalBlockTabs.vue'
import DistributionChart from './DistributionChart.vue'
import kanban_board from './portal/render_modes/kanban/kanban_board.vue'


const props = defineProps({
  block: {
    type: Object,
    required: true,
    validator: (block) => block.type && typeof block.type === 'string'
  }
})

const COMPONENT_MAP = {
  'dynamic-form': markRaw(dynamic_form),
  'object-renderer': markRaw(objectrenderer),
  'data-group': markRaw(DataGroup),
  'dynamic-crud': markRaw(DynamicCrud),
  'multi-step-form': markRaw(multi_step_form),
  'chart': markRaw(flexible_chart),
  'action-list': markRaw(ActionList),
  'timeline': markRaw(Timeline),
  'metric': markRaw(metric),
  'block-tabs': markRaw(BlockTabs),
  'block-carousel': markRaw(BlockCarousel),
  'block-accordion': markRaw(BlockAccordion),
  'block-modal': markRaw(BlockModal),
  'block-timeline': markRaw(BlockTimeline),
  'vertical-block-tabs': markRaw(VerticalBlockTabs),
  'distribution-chart': markRaw(DistributionChart),
  'kanban': markRaw(kanban_board),
}

const getComponent = (type) => {
  const component = COMPONENT_MAP[type]
  if (!component) {
    console.warn(`Unknown component type: ${type}`)
  }
  return component
}

const handleComponentError = (error) => {
  console.error('Component error:', error)
  // Add your error handling logic here
}

const handleUpdate = (data) => {
  // Handle component updates
  emit('update', data)
}
</script>

<style scoped>
.error-message {
  color: red;
  padding: 1rem;
}
</style>