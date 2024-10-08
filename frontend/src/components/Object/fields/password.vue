<template>
    <div class="password-field">
      <a-typography-text>
        <template v-if="value">
          <lock-outlined :style="{ color: '#1890ff', fontSize: '16px' }" />
          <span class="ml-2">{{ maskedPassword }}</span>
        </template>
        <template v-else>
          <unlock-outlined :style="{ color: '#faad14', fontSize: '16px' }" />
          <span class="ml-2">No password set</span>
        </template>
      </a-typography-text>
    </div>
  </template>
  
  <script>
  import { Typography } from 'ant-design-vue';
  import { LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
  import { computed } from 'vue';
  
  export default {
    name: 'PasswordField',
    components: {
      ATypographyText: Typography.Text,
      LockOutlined,
      UnlockOutlined,
    },
    props: {
      field: {
        type: Object,
        required: true,
      },
      value: {
        type: String,
        required: false,
      },
    },
    setup(props) {
      const maskedPassword = computed(() => {
        if (!props.value) return '';
        return '•'.repeat(8); // Show 8 dots regardless of actual password length
      });
  
      return {
        maskedPassword,
      };
    },
  };
  </script>
  
  <style scoped>
  .password-field {
    width: 100%;
  }
  .ml-2 {
    margin-left: 8px;
  }
  </style>