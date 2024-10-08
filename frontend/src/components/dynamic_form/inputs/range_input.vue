<template>
  <div>
    <label class="block font-medium text-text">{{ field.title }}</label>
    <input
      :value="value"
      type="range"
      :min="field.min || 0"
      :max="field.max || 100"
      :step="field.step || 1"
      :required="field.required"
      class="w-full"
      @input="$emit('input', $event.target.valueAsNumber)"
    />
  </div>
</template>

<script>
export default {
  name: 'RangeInput',
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