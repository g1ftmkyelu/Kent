<template>
  <div :style="gridStyle" class="grid-layout">
    <div
      v-for="(item, index) in layout"
      :key="index"
      class="grid-item"
      :style="getItemStyle(item)"
    >
      <slot :name="item.name" />
    </div>
  </div>
</template>

<script>
export default {
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
  computed: {
    gridStyle() {
      return {
        display: 'grid',
        gridTemplateRows: `repeat(${this.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
        gap: '10px', // Optional: Adjust the gap between items
      };
    },
  },
  methods: {
    getItemStyle(item) {
      return {
        gridRow: `${item.rowStart} / span ${item.rowSpan}`,
        gridColumn: `${item.colStart} / span ${item.colSpan}`,
        padding: '10px', // Optional: Padding inside each grid item
        boxSizing: 'border-box',
      };
    },
  },
};
</script>

<style scoped>
.grid-layout {
  width: auto;
  height: auto;
  padding: auto;
}

.grid-item {
  overflow: auto;
  border:0;
}

.grid-item:hover {

}
</style>
