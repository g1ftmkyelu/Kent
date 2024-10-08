<template>
  <div class="flex items-center">
    <input
    :value="value"
      type="checkbox"
      :required="field.required"
      class="mr-2 focus:ring-2 focus:ring-secondary bg-cardDark"
      @change="$emit('input', $event.target.checked)"
    />
    <label class="font-medium text-text">{{ field.title }}</label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>