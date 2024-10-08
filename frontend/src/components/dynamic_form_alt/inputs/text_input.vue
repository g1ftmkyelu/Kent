<template>

    <label :for="name">{{ title }}</label>
    <input
      :type="type"
      :id="name"
      :name="name"
      v-model="internalValue"
      @input="updateValue"
      :required="required"
      :placeholder="`Enter ${title}...`"
      class="form-control modern-input"
    />

</template>

<script>
export default {
  name: 'TextInput',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    initialData: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      internalValue: this.value || this.initialData
    };
  },
  created() {
    if (this.initialData) {
      this.internalValue = this.initialData;
    }
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue;
    }
  },
  methods: {
    updateValue(event) {
      this.internalValue = event.target.value;
      this.$emit('update:value', this.internalValue);
    }
  }
};
</script>


