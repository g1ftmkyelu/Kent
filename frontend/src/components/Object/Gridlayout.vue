<template>
  <grid-layout
    :layout="transformedLayout"
    :col-num="columns"
    :row-height="44"
    :is-draggable="false"
    :is-resizable="false"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <grid-item v-for="item in transformedLayout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
      <div class="grid-item-content" :style="getItemStyle(item)">
        <slot :name="item.name" />
      </div>
    </grid-item>
  </grid-layout>
</template>

<script>
import { computed } from 'vue';
import { GridLayout, GridItem } from 'vue3-grid-layout-next';

export default {
  components: {
    GridLayout,
    GridItem,
  },
  props: {
    rows: {
      type: Number,
      required: true,
    },
    columns: {
      type: Number,
      required: true,
    },
    layout: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const transformedLayout = computed(() => {
      return props.layout.map((item, index) => ({
        x: item.colStart - 1,
        y: item.rowStart - 1,
        w: item.colSpan,
        h: item.rowSpan,
        i: index.toString(),
        name: item.name,
        alignment: item.alignment || 'top-left', // Default alignment
      }));
    });

    const getItemStyle = (item) => {
      const style = {};
      switch (item.alignment) {
        case 'top-left':
          style.justifyContent = 'flex-start';
          style.alignItems = 'flex-start';
          break;
        case 'top-center':
          style.justifyContent = 'center';
          style.alignItems = 'flex-start';
          break;
        case 'top-right':
          style.justifyContent = 'flex-end';
          style.alignItems = 'flex-start';
          break;
        case 'middle-left':
          style.justifyContent = 'flex-start';
          style.alignItems = 'center';
          break;
        case 'middle-center':
          style.justifyContent = 'center';
          style.alignItems = 'center';
          break;
        case 'middle-right':
          style.justifyContent = 'flex-end';
          style.alignItems = 'center';
          break;
        case 'bottom-left':
          style.justifyContent = 'flex-start';
          style.alignItems = 'flex-end';
          break;
        case 'bottom-center':
          style.justifyContent = 'center';
          style.alignItems = 'flex-end';
          break;
        case 'bottom-right':
          style.justifyContent = 'flex-end';
          style.alignItems = 'flex-end';
          break;
        default:
          style.justifyContent = 'flex-start';
          style.alignItems = 'flex-start';
      }
      return style;
    };

    return {
      transformedLayout,
      getItemStyle,
    };
  },
};
</script>

<style>
.vue-grid-item {
  background-color: transparent !important;
  border: transparent !important;
  border-radius: 4px !important;
}
.grid-item-content {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
</style>