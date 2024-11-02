<template>
  <div class="loader-container">
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
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
      this.loadingInterval = setInterval(() => {
        document.title = 'Loading' + '.'.repeat((Date.now() / 500) % 4);
      }, 500);
    },
    stopLoading() {
      clearInterval(this.loadingInterval);
      document.title = this.originalTitle;
    }
  }
}
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.loader {
  display: flex;
  justify-content: space-around;
  width: 80px;
}

.dot {
  background-color: rgba(var(--primary), 0.8);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-15px);
  }
}
</style>
