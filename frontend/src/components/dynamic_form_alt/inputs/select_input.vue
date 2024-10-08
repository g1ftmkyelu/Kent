<template>
  <div class="form-group">
    <label :for="name">{{ title }}</label>
    <select
      class="form-control modern-input"
      :id="name"
      :name="name"
      :value="value"
      @change="updateValue"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    initialData: {
      type: [String, Number],
      default: null
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:value', event.target.value);
    }
  }
};
</script>


<style scoped>
/* Reset default select styles */
.form-control {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

/* Style for focused select */
.form-control:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

/* Style for disabled select */
.form-control:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* Style for option elements */
.form-control option {
  background-color: #fff;
  color: #333;
}
</style>