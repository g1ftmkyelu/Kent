<template>
    <div>
      <button
        v-if="!isUploading || !actionLoading"
        type="button"
        class="btn"
        @click="submitForm"
      >
        Submit
      </button>
      <div v-else>
        <Loader />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Loader from '../../../components/Loader.vue'
  
  export default {
    name: 'FormHandler',
    props: {
      formData: {
        type: Object,
        required: true
      },
      isAdding: {
        type: Boolean,
        required: true
      },
      resourceName: {
        type: String,
        required: true
      },
      redirectTo: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        isUploading: false,
        actionLoading: false
      }
    },
    components: {
      Loader
    },
    methods: {
      submitForm() {
        this.isUploading = true
        this.actionLoading = true
  
        const url = `${import.meta.env.VITE_APP_API_URL}/api/v1/${this.resourceName}`
        const method = this.isAdding ? 'post' : 'patch'
        const id = this.isAdding ? null : this.formData._id || this.formData.id
  
        axios[method](`${url}/${id || ''}`, this.formData)
          .then(() => {
            this.$swal.fire(
              'Success!',
              `Item ${this.isAdding ? 'added' : 'updated'} successfully.`,
              'success'
            )
            if (this.redirectTo === 'prev') {
              this.$router.go(-1)
            } else if (this.redirectTo === 'current') {
              this.$router.go()
            } else {
              this.$router.push(
                `/dashboard/${this.resourceName}?page=1&limit=30&search=&sortBy=&order=desc`
              )
            }
          })
          .catch((error) => {
            console.error(
              `Error ${this.isAdding ? 'adding' : 'updating'} ${
                this.resourceName
              }:`,
              error.message
            )
            this.$swal.fire(
              'Error!',
              `Error ${this.isAdding ? 'adding' : 'updating'} ${
                this.resourceName
              }:`,
              'error'
            )
          })
          .finally(() => {
            this.isUploading = false
            this.actionLoading = false
          })
      }
    }
  }
  </script>