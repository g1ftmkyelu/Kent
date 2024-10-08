<template>
  <div class="text-field-display">
    <a-typography-text :style="{ fontSize: '1rem', fontWeight: 'bold' }">{{ value }}</a-typography-text>
  </div>
</template>

<script>
import { Typography } from 'ant-design-vue';

export default {
  name: 'TextField',
  components: {
    ATypographyText: Typography.Text,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
