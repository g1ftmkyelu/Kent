<template>
  <div class="form-grid">
    <div v-for="field in currentFields" :key="field.name" class="form-group">
      <component
        :is="getComponentForField(field)"
        v-bind="field"
        :title="field.label"
        :type="field.type"
        :value="formData[field.name]"
        @update:value="updateFormData(field.name, $event)"
        @blur="validateField(field.name)"
      />
      <span v-if="validationErrors[field.name]" class="error-message">
        {{ validationErrors[field.name] }}&nbsp;<i class="fa-solid fa-circle-exclamation"></i>
      </span>
    </div>
  </div>
</template>

<script>
import TextInput from './inputs/text_input.vue'
import NumberInput from './inputs/number_input.vue'
import RangeInput from './inputs/range_input.vue'
import FileInput from './inputs/file_input.vue'
import ObjectInput from './inputs/object_input.vue'
import ObjectArrayInput from './inputs/object_array_input.vue'
import TagsInput from './inputs/tags_input.vue'
import CheckboxInput from './inputs/checkbox_input.vue'
import RadioInput from './inputs/radio_input.vue'
import TextareaInput from './inputs/text_area_input.vue'
import ColorInput from './inputs/color_input.vue'
import TimeInput from './inputs/time_input.vue'
import SelectInput from './inputs/select_input.vue'


export default {
  name: 'DynamicForm',
  components: {
    TextInput,
    NumberInput,
    RangeInput,
    FileInput,
    ObjectInput,
    ObjectArrayInput,
    TagsInput,
    CheckboxInput,
    RadioInput,
    TextareaInput,
    ColorInput,
    TimeInput,
    SelectInput
  },
  props: {
    currentFields: Array,
    formData: Object,
    validationErrors: Object,
    initialData: Object,
    schema: Array
  },
  methods: {
    getComponentForField(field) {
      switch (field.type) {
        case 'text':
        case 'email':
        case 'tel':
        case 'date':
        case 'password':
          return 'TextInput'
        case 'number':
          return 'NumberInput'
        case 'range':
          return 'RangeInput'
        case 'file':
          return 'FileInput'
        case 'object':
          return 'ObjectInput'
        case 'objects':
          return 'ObjectArrayInput'
        case 'tags':
          return 'TagsInput'
        case 'checkbox':
          return 'CheckboxInput'
        case 'radio':
          return 'RadioInput'
        case 'textarea':
          return 'TextareaInput'
        case 'color':
          return 'ColorInput'
        case 'time':
          return 'TimeInput'
        case 'select':
          return 'SelectInput'
        default:
          return 'TextInput'
      }
    },
    updateFormData(name, value) {
      this.$emit('update:formData', { name, value })
    },
    validateField(name) {
      this.$emit('validateField', name)
    }
  }
}
</script>

<style scoped>
/* Styles for form grid */
.form-grid {
  display: grid;
  grid-auto-flow: dense;
  gap: 10px;
  grid-gap: 10px;
  margin: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.error-message {
  color: red;
  font-size: 0.875rem;
}

/* Responsive grid layout */
@media (min-width: 1200px) {
  .form-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .form-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
