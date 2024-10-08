<template>
    <div>
      <label class="block font-medium text-text">{{ field.title }}</label>
      <div v-if="!showFileInput">
        <div v-if="file">
          <img
            v-if="field.type === 'image'"
            :src="getFilePreview()"
            alt="No file selected"
            class="max-h-32 object-contain mb-2"
          />
          <video
            v-else-if="field.type === 'video'"
            :src="getFilePreview()"
            controls
            class="max-h-32 object-contain mb-2"
          ></video>
          <audio
            v-else-if="field.type === 'audio'"
            :src="getFilePreview()"
            controls
            class="mb-2"
          ></audio>
          <div v-else>{{ file.name }}</div>
        </div>
        <button
          type="button"
          @click="toggleFileInput"
          class="btn"
        >
          Change File
        </button>
      </div>
      <div v-else>
        <input
          @change="handleFileUpload($event)"
          type="file"
          :accept="getAcceptTypes()"
          :required="field.required"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-secondary file:text-tertiary hover:file:bg-secondary-darker"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FileInput',
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: [File, String],
        required: true
      }
    },
    data() {
      return {
        showFileInput: false,
        file: null
      }
    },
    watch: {
      value(newValue) {
        this.file = newValue
      }
    },
    created() {
      this.file = this.value
    },
    methods: {
      getAcceptTypes() {
        switch (this.field.type) {
          case 'image':
            return 'image/*'
          case 'video':
            return 'video/*'
          case 'audio':
            return 'audio/*'
          case 'document':
            return '.doc,.docx,.pdf'
          default:
            return ''
        }
      },
      getFilePreview() {
        if (this.file instanceof File) {
          return URL.createObjectURL(this.file)
        } else if (typeof this.file === 'string') {
          return this.file
        } else {
          return ''
        }
      },
      toggleFileInput() {
        this.showFileInput = !this.showFileInput
      },
      handleFileUpload(event) {
        this.file = event.target.files[0]
        this.$emit('input', this.file)
        this.showFileInput = false
      }
    }
  }
  </script>