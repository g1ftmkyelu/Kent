<template>
    <div>
      <label class="block font-medium text-text">{{ field.title }}</label>
      <input
      :value="value"
        type="tel"
        :required="field.required"
        class="rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary bg-cardDark"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'PhoneInput',
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  }
  </script>