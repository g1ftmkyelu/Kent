<template>
    <div>
      <label class="block font-medium text-text">{{ field.title }}</label>
      <select
      :value="value"
        :required="field.required"
        class="rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary bg-cardDark"
        @change="$emit('input', $event.target.value)"
      >
        <option
          v-for="option in field.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SelectInput',
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