<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 relative">
        <!-- Close button in the top-right corner -->
        <button @click="close" class="absolute btn top-2 right-2 ">
          &times;
        </button>
        
        <!-- Header slot -->
        <header class="modal-header mb-4">
          <slot name="header"></slot>
        </header>
        
        <!-- Scrollable body slot -->
        <div class="modal-body max-h-[75vh] overflow-y-auto">
          <slot name="body"></slot>
        </div>
        
        <!-- Footer slot -->
        <footer class="modal-footer flex justify-end mt-4">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Modal',
    emits: ['close'],
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styling can be applied here if needed */
  </style>
  