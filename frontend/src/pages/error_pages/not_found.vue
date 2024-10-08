<template>
    <div class="error-page">
      <a-result
        status="404"
        title="404"
        sub-title="Sorry, the page you visited does not exist."
      >
        <template #extra>
          <a-button type="primary" @click="goHome">Back to Home</a-button>
        </template>
      </a-result>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'NotFound',
    setup() {
      const router = useRouter();
  
      const goHome = () => {
        router.push('/');
      };
  
      return { goHome };
    }
  });
  </script>
  
  <style scoped>
  .error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--backgroundHover);
  }
  </style>
  