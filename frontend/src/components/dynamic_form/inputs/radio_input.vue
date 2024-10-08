<template>
    <div>
      <label class="block font-medium text-text">{{ field.title }}</label>
      <div
        v-for="option in field.options"
        :key="option.value"
        class="flex items-center"
      >
        <input

          type="radio"
          :value="option.value"
          :required="field.required"
          class="mr-2 focus:ring-2 focus:ring-secondary bg-cardDark"
          @change="$emit('input', $event.target.value)"
        />
        <label>{{ option.label }}</label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RadioInput',
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: [String, Number, Boolean],
        required: true
      }
    }
  }
  </script>