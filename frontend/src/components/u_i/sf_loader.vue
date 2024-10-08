<template>
  <div class="loader" ref="loader"></div>
</template>

<script>
export default {
  mounted() {
    this.startLoading();
  },
  beforeUnmount() {
    this.stopLoading();
  },
  methods: {
    startLoading() {
      this.originalTitle = document.title;
      this.dots = ['•', '••', '•••', '••••', '•••••'];  // Simulate a moving dot or loader
      this.currentDotIndex = 0;
      this.loadingInterval = setInterval(() => {
        document.title = this.dots[this.currentDotIndex];
        this.currentDotIndex = (this.currentDotIndex + 1) % this.dots.length;  // Cycle through the dots
      }, 500);  // Update every 500ms for smooth animation
    },
    stopLoading() {
      clearInterval(this.loadingInterval);
      document.title = this.originalTitle;
    }
  }
}
</script>


<style scoped>
.loader {
  font-weight: bold;
  font-family: sans-serif;
  font-size: 30px;
  animation: l1 1s linear infinite alternate;
}
.loader:before {
  content: "Loading...";
}
@keyframes l1 {to{opacity: 0}}
</style>