<template>
    <div class="email-field">
      <a-typography-text>
        <a :href="`mailto:${value}`">{{ value }}</a>
      </a-typography-text>
    </div>
  </template>
  
  <script>
  import { Typography } from 'ant-design-vue';
  
  export default {
    name: 'EmailField',
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
  
  <style scoped>
  .email-field {
    width: 100%;
    font-size: 0.5rem;
    color: var(--primary) !important;
  }
  </style>