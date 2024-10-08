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
          v-for="option in refOptions"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RefInput',
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      refOptions: {
        type: Array,
        required: true
      }
    }
  }
  </script>