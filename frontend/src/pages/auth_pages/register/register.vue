<script setup>
import { ref, reactive } from 'vue';
import * as Yup from 'yup';
import MultiStepForm from '../../../components/dynamic_form_alt/multi_step_form.vue';
import SfLoader from '../../../components/u_i/sf_loader.vue';
import SfLogo from '../../../components/u_i/sf_logo.vue';
import { translationKeys } from '../../../Localization/International/english';
import axios from 'axios';

const loading = ref(false);
const formData = reactive({});
const alertMessage = ref('');
const alertType = ref('');

const formSchema = [
  {
    name: 'fullname',
    type: 'text',
    label: translationKeys.FullName,
    validation: Yup.string().required('Full name is required')
  },
  {
    name: 'email',
    type: 'email',
    label: translationKeys.Email,
    validation: Yup.string().email('Invalid email format').required('Email is required')
  },
  {
    name: 'password',
    type: 'password',
    label: translationKeys.Password,
    validation: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    validation: Yup.string()
      .required('Confirm Password is required')
  },
  {
    name: 'phoneNumber',
    type: 'tel',
    label: translationKeys.PhoneNumber,
    validation: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required')
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    label: translationKeys.DateOfBirth,
    validation: Yup.date().required('Date of Birth is required')
  },
  {
    name: 'gender',
    type: 'select',
    label: translationKeys.Gender,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' }
    ],
    validation: Yup.string().required('Gender is required')
  },
  {
    name: 'agreeTerms',
    type: 'checkbox',
    label: 'I agree to the terms and conditions',
    validation: Yup.boolean()
      .oneOf([true], 'You must agree to the terms and conditions')
  }
];

const staticData = {
  role: '66e16a45fe3bd80736e85e4d',
  status: '66e16a11fe3bd80736e85e11'
};

const formSteps = [
  { name: 'Personal Information', fields: ['fullname', 'email', 'password', 'confirmPassword'] },
  { name: 'Additional Details', fields: ['phoneNumber', 'dateOfBirth', 'gender'] },
  { name: 'Terms', fields: ['agreeTerms'] }
];

async function handleRegister(data) {
  loading.value = true;
  const submitData = { ...data, ...staticData };
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/v1/users/register`, submitData);
    loading.value = false;
    alertMessage.value = 'Registration successful!';
    alertType.value = 'success';
    console.log('Registration successful:', response.data);
  } catch (error) {
    loading.value = false;
    alertMessage.value = 'Registration failed. Please try again.';
    alertType.value = 'error';
    console.error('Error adding user:', error.message);
  }
}
</script>

<template>
  <div class="h-screen flex flex-col md:flex-row">

    <div class="w-full  p-2 flex flex-col justify-center">
      <div class="w-16">
          <SfLogo class="" />
      </div>
      <div v-if="alertMessage" :class="['alert', alertType === 'success' ? 'alert-success' : 'alert-error']">
        {{ alertMessage }}
      </div>
      <SfLoader v-if="loading" />
      <MultiStepForm
        v-else
        :schema="formSchema"
        :steps="formSteps"
        @submit="handleRegister"
      />
    </div>
  </div>
</template>

<style scoped>
.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .min-h-screen {
    min-height: auto;
  }
}
</style>