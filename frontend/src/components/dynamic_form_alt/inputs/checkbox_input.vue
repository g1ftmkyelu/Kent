<template>
  <div class="form-group">
    <label class="form-check-label" :for="name">{{ title }}</label>
    <div class="form-check">
      <input
        class="form-check-input modern-input"
        type="checkbox"
        :id="name"
        :name="name"
        :checked="value"
        @change="updateValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
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
      type: Boolean,
      required: true
    },
    initialData: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:value', event.target.checked)
    }
  }
}
</script>

<style scoped>
.form-check-input.modern-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 50px;
  height: 25px;
  background-color: #ccc;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}

.form-check-input.modern-input:before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: white;
  transition: left 0.3s;
}

.form-check-input.modern-input:checked {
  background-color: #4caf50;
}

.form-check-input.modern-input:checked:before {
  left: 27px;
}
</style>
