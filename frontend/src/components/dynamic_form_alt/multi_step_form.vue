<template>
  <div class="multi-step-form-container">
    <div class="multi-step-form">
      <form @submit.prevent="handleSubmit" class="">
        <StepIndicators :steps="steps" :currentStep="currentStep" />
        <FormGrid
          :currentFields="currentFields"
          :formData="formData"
          :validationErrors="validationErrors"
          :initialData="initialData"
          :schema="schema"
          @update:formData="updateFormData"
          @validateField="validateField"
        />
        <StepNavigation
          v-if="steps"
          :steps="steps"
          :currentStep="currentStep"
          @prevStep="prevStep"
          @nextStep="nextStep"
        />
        <input v-else type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import StepIndicators from './step_indicators.vue';
import FormGrid from './form_grid.vue';
import StepNavigation from './step_navigation.vue';
import * as Yup from 'yup'; // Import Yup for validation

export default {
  name: 'DynamicForm',
  components: {
    StepIndicators,
    FormGrid,
    StepNavigation
  },
  props: {
    schema: {
      type: Array,
      required: true
    },
    initialData: {
      type: Object,
      default: () => ({})
    },
    steps: {
      type: [Object],
      required: false
    }
  },
  data() {
    return {
      formData: this.createFormData(),
      validationErrors: this.schema.reduce((errors, field) => {
        errors[field.name] = '';
        return errors;
      }, {}),
      currentStep: 0,
      isCurrentStepValid: true
    };
  },
  computed: {
    currentFields() {
      if (this.steps) {
        const currentStep = this.steps[this.currentStep];
        return this.schema.filter((field) => currentStep.fields.includes(field.name));
      } else {
        return this.schema;
      }
    },
    // Create Yup validation schema based on the form schema prop
    validationSchema() {
      const schemaShape = {};
      this.schema.forEach(field => {
        if (field.validation) {
          schemaShape[field.name] = field.validation; // Use Yup validation for each field
        }
      });
      return Yup.object().shape(schemaShape); // Return Yup schema object
    }
  },
  methods: {
    createFormData() {
      const data = {};
      this.schema.forEach((field) => {
        if (field.type === 'object') {
          data[field.name] = this.createNestedObject(
            field.fields,
            this.initialData[field.name] || {}
          );
        } else if (field.type === 'objects') {
          data[field.name] = this.createNestedObjectArray(
            field.fields,
            this.initialData[field.name] || []
          );
        } else {
          data[field.name] =
            this.initialData[field.name] !== undefined
              ? this.initialData[field.name]
              : field.initialData || this.getDefaultValue(field.type);
        }
      });
      return data;
    },
    createNestedObject(fields, initialData) {
      const data = {};
      fields.forEach((field) => {
        data[field.name] =
          initialData[field.name] !== undefined
            ? initialData[field.name]
            : field.initialData || this.getDefaultValue(field.type);
      });
      return data;
    },
    createNestedObjectArray(fields, initialData) {
      return initialData.map((item) => {
        const data = {};
        fields.forEach((field) => {
          data[field.name] =
            item[field.name] !== undefined
              ? item[field.name]
              : field.initialData || this.getDefaultValue(field.type);
        });
        return data;
      });
    },
    getDefaultValue(type) {
      switch (type) {
        case 'text':
        case 'tel':
        case 'email':
        case 'password':
        case 'textarea':
        case 'color':
        case 'time':
        case 'date':
        case 'ref':
        case 'radio':
        case 'select':
          return '';
        case 'number':
          return 0;
        case 'checkbox':
          return false;
        case 'tags':
          return [];
        default:
          return '';
      }
    },
    updateFormData({ name, value }) {
      this.formData = { ...this.formData, [name]: value };
    },
    validateField(name) {
      const field = this.schema.find((field) => field.name === name);
      if (field && field.validation) {
        try {
          field.validation.validateSync(this.formData[name]); // Yup sync validation
          delete this.validationErrors[name]; // Clear error if validation passes
        } catch (error) {
          this.validationErrors[name] = error.message; // Set error message from Yup
        }
      }
    },
    validateForm() {
      this.schema.forEach((field) => {
        if (field.validation) {
          this.validateField(field.name); // Validate each field using Yup
        }
      });
    },
    handleSubmit() {
      this.validateForm();
      if (Object.keys(this.validationErrors).length === 0) {
        console.log('Form Submitted', this.formData);
        this.$emit('submit', this.formData);
      } else {
        console.log('Form has validation errors', this.formData);
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.validateCurrentStep();
        if (this.isCurrentStepValid) {
          this.currentStep++;
        }
      }
    },
    validateCurrentStep() {
      this.isCurrentStepValid = true;
      const currentStep = this.steps[this.currentStep];
      const fieldsInCurrentStep = this.schema.filter((field) =>
        currentStep.fields.includes(field.name)
      );
      fieldsInCurrentStep.forEach((field) => {
        if (field.validation) {
          this.validateField(field.name);
          if (this.validationErrors[field.name]) {
            this.isCurrentStepValid = false;
          }
        }
      });
    }
  }
};
</script>



<style scoped>

.multi-step-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.multi-step-form {

  margin: 3%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}


label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;
}



input[type='submit'] {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type='submit']:hover {
  background-color: var(--primary);
}

.modern-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 0.375rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.modern-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  outline: none;
}

.modern-input::placeholder {
  color: #888;
  transition: color 0.3s ease;
}

.modern-input:focus::placeholder {
  color: #aaa;
}



</style>
