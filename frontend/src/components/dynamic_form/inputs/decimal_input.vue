<template>
    <div>
      <label class="block font-medium text-text">{{ field.title }}</label>
      <input
      :value="value"
        type="number"
        step="0.01"
        :required="field.required"
        class="rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary bg-cardDark"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'DecimalInput',
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    }
  }
  </script>