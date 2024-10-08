<template>
  <a-steps :current="currentStep">
    <a-step
      v-for="(step, index) in steps"
      :key="step.name"
      :title="step.name"
      :icon="currentStep > index ? 'check' : index + 1"
    />
  </a-steps>
</template>
<script>
export default {
  props: {
    steps: Array,
    currentStep: Number,
  },
};
</script>
