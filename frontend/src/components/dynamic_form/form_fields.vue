<template>
    <form class="space-y-6">
      <div v-for="field in schema" :key="field.name" class="space-y-2">
        <component
          :is="getInputComponent(field.type)"
          :field="field"
          :value="formData[field.name]"
          :ref-options="refOptions[field.name]"
          :is-adding="isAdding"
          @input="handleInput(field.name, $event)"
          @file-input="handleFileInput(field.name, $event)"
          @add-array-item="$emit('add-array-item', field.name)"
        />
      </div>
    </form>
  </template>
  
  <script>
  import TextInput from './inputs/text_input.vue'
  import RichTextInput from './inputs/rich_text_input.vue'
  import EmailInput from './inputs/email_input.vue'
  import PasswordInput from './inputs/password_input.vue'
  import PhoneInput from './inputs/phone_input.vue'
  import NumberInput from './inputs/number_input.vue'
  import DecimalInput from './inputs/decimal_input.vue'
  import DateInput from './inputs/DateInput.vue'
  import DateTimeInput from './inputs/date_time_input.vue'
  import TimeInput from './inputs/time_input.vue'
  import RefInput from './inputs/RefInput.vue'
  import SelectInput from './inputs/select_input.vue'
  import CheckboxInput from './inputs/checkbox_input.vue'
  import RadioInput from './inputs/radio_input.vue'
  import FileInput from './inputs/file_input.vue'
  import ColorInput from './inputs/color_input.vue'
  import RangeInput from './inputs/range_input.vue'
  import TagsInput from './inputs/tags_input.vue'
  import ObjectInput from './inputs/object_input.vue'
  import ObjectArrayInput from './inputs/object_array_input.vue'
  
  export default {
    name: 'FormFields',
    props: {
      schema: {
        type: Array,
        required: true
      },
      formData: {
        type: Object,
        required: true
      },
      refOptions: {
        type: Object,
        required: true
      },
      isAdding: {
        type: Boolean,
        required: true
      }
    },
    components: {
      TextInput,
      RichTextInput,
      EmailInput,
      PasswordInput,
      PhoneInput,
      NumberInput,
      DecimalInput,
      DateInput,
      DateTimeInput,
      TimeInput,
      RefInput,
      SelectInput,
      CheckboxInput,
      RadioInput,
      FileInput,
      ColorInput,
      RangeInput,
      TagsInput,
      ObjectInput,
      ObjectArrayInput
    },
    methods: {
      getInputComponent(type) {
        switch (type) {
          case 'text':
            return TextInput
          case 'richtext':
            return RichTextInput
          case 'email':
            return EmailInput
          case 'password':
            return PasswordInput
          case 'phone':
            return PhoneInput
          case 'number':
            return NumberInput
          case 'decimal':
            return DecimalInput
          case 'date':
            return DateInput
          case 'datetime':
            return DateTimeInput
          case 'time':
            return TimeInput
          case 'ref':
            return RefInput
          case 'select':
            return SelectInput
          case 'check':
            return CheckboxInput
          case 'radio':
            return RadioInput
          case 'image':
          case 'video':
          case 'audio':
          case 'document':
          case 'image array':
          case 'video array':
          case 'audio array':
          case 'document array':
            return FileInput
          case 'color':
            return ColorInput
          case 'range':
            return RangeInput
          case 'tags':
            return TagsInput
          case 'object':
            return ObjectInput
          case 'object array':
            return ObjectArrayInput
          default:
            return null
        }
      },
      handleInput(fieldName, value) {
        this.$emit('input', fieldName, value)
      },
      handleFileInput(fieldName, files) {
        this.$emit('file-input', fieldName, files)
      }
    }
  }
  </script>