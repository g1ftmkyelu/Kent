<template>
    <div>
      <h3 class="text-xl font-bold mb-4">{{ field.title }}</h3>
      <div v-for="(item, index) in value" :key="index" class="mb-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="subField in field.schema" :key="subField.name">
            <label class="block font-medium text-text">{{ subField.title }}</label>
            <component
              :is="getInputComponent(subField.type)"
              :field="subField"
              :value="item[subField.name]"
              @input="handleSubFieldInput(index, subField.name, $event)"
              :ref-options="refOptions[subField.name]"
            ></component>
          </div>
        </div>
      </div>
      <button
        type="button"
        @click="addArrayItem"
        class="bg-secondary text-tertiary rounded-md px-4 hover:bg-secondary-darker"
      >
        Add Item
      </button>
    </div>
  </template>
  
  <script>
  import TextInput from './text_input.vue'
  import RichTextInput from './rich_text_input.vue'
  import EmailInput from './email_input.vue'
  import PasswordInput from './password_input.vue'
  import PhoneInput from './phone_input.vue'
  import NumberInput from './number_input.vue'
  import DecimalInput from './decimal_input.vue'
  import DateInput from './date_input.vue'
  import DateTimeInput from './date_time_input.vue'
  import TimeInput from './time_input.vue'
  import RefInput from './ref_input.vue'
  import SelectInput from './select_input.vue'
  import CheckboxInput from './checkbox_input.vue'
  import RadioInput from './radio_input.vue'
  import FileInput from './file_input.vue'
  import ColorInput from './color_input.vue'
  import RangeInput from './range_input.vue'
  import TagsInput from './tags_input.vue'
  
  export default {
    name: 'ObjectArrayInput',
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
      TagsInput
    },
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: Array,
        required: true
      },
      refOptions: {
        type: Object,
        required: true
      }
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
            return FileInput
          case 'color':
            return ColorInput
          case 'range':
            return RangeInput
          case 'tags':
            return TagsInput
          default:
            return null
        }
      },
      handleSubFieldInput(itemIndex, name, value) {
        this.$emit('input', [
          ...this.value.slice(0, itemIndex),
          {
            ...this.value[itemIndex],
            [name]: value
          },
          ...this.value.slice(itemIndex + 1)
        ])
      },
      addArrayItem() {
        const newItem = {}
        for (const subField of this.field.schema) {
          newItem[subField.name] = ''
        }
        this.$emit('input', [...this.value, newItem])
      }
    }
  }
  </script>