<template>
  <div v-if="steps" class="step-navigation">
    <a-card
      v-if="currentStep > 0"
      @click="prevStep"
      class="nav-card"
      :disabled="currentStep === 0"
    >
      <i class="pi pi-arrow-left"></i>
      Prev
    </a-card>

    <a-card
      v-if="currentStep < steps.length - 1"
      @click="nextStep"
      class="nav-card"
      :disabled="currentStep === steps.length - 1"
    >
      Next
      <i class="pi pi-arrow-right"></i>
    </a-card>

    <a-card
      v-if="currentStep === steps.length - 1"
      @click="finish"
      class="nav-card finish-card"
    >
      <i class="pi pi-check"></i>
      Finish
    </a-card>
  </div>
</template>


<script>
export default {
  props: {
    steps: Array,
    currentStep: Number,
  },
  methods: {
    prevStep() {
      this.$emit("prevStep");
    },
    nextStep() {
      this.$emit("nextStep");
    },
    finish() {
      this.$emit("finish");
    }
  },
};
</script>


<style scoped>
.step-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.nav-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
  text-align: center;
  flex: 1;
  margin: 0 10px;
}

.nav-card:hover {
  background-color: #f0f0f0;
}

.finish-card {
  background-color: #28a745;
  color: white;
}

.finish-card:hover {
  background-color: #218838;
}
</style>
