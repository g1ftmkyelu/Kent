<template>
    <div class="form-group">
      <label :for="name">{{ title }}</label>
      <input
        type="time"
        class="form-control modern-input"
        :id="name"
        :name="name"
        :value="value"
        @input="updateValue"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'TimeInput',
    props: {
      name: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      initialData: {
        type: String,
        default: '00:00',
      },
    },
    methods: {
      updateValue(event) {
        this.$emit('update:value', event.target.value);
      },
    },
  };
  </script>