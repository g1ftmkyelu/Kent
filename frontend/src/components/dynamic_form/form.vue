<template>
  <div class="bg-cardLight rounded-lg p-6 sm:p-8 lg:p-10">
    <FormFields
      :schema="resource.schema"
      :form-data="formData"
      :ref-options="refOptions"
      :is-adding="isAdding"
      @input="handleFormInput"
      @file-input="handleFileInput"
      @add-array-item="addArrayItem"
    />

    <FileUploader
      :file-fields="fileFields"
      :form-data="formData"
      @file-uploaded="handleFileUpload"
    />
    <FormHandler
      :form-data="formData"
      :is-adding="isAdding"
      :resource-name="resource.name"
      :redirect-to="redirectTo"
      @submit-form="submitForm"
    />
  </div>
</template>

<script>
import FormFields from "./form_fields.vue";
import FileUploader from "./FileUploader.vue";
import FormHandler from "./form_hamdler.vue";
import refOptionsService from "../refOptionsService";

export default {
  name: "DynamicForm",
  props: {
    resource: {
      type: Object,
      required: true,
    },
    initialData: {
      type: Object,
      required: false,
    },
    isAdding: {
      type: Boolean,
      required: true,
    },
    redirectTo: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      formData: {},
      refOptions: {},
      fileFields: [],
    };
  },
  components: {
    FormFields,
    FileUploader,
    FormHandler,
  },
  async created() {
    this.initFormData();
    await this.fetchRefOptions();
    this.fileFields = this.resource.schema.filter(
      (field) =>
        field.type === "image" ||
        field.type === "video" ||
        field.type === "audio" ||
        field.type === "document" ||
        field.type === "image array" ||
        field.type === "video array" ||
        field.type === "audio array" ||
        field.type === "document array"
    );
  },
  methods: {
    initFormData() {
      if (this.isAdding) {
        this.formData = {};
        for (const field of this.resource.schema) {
          if (typeof this.initialData[field.name] !== "undefined") {
            this.formData[field.name] = this.initialData[field.name];
          } else {
            // Initialize the field based on its type
            switch (field.type) {
              case "text":
              case "richtext":
              case "email":
              case "password":
              case "phone":
              case "number":
              case "decimal":
              case "date":
              case "datetime":
              case "time":
              case "color":
              case "range":
                this.formData[field.name] = "";
                break;
              case "boolean":
              case "check":
                this.formData[field.name] = false;
                break;
              case "radio":
              case "select":
                this.formData[field.name] = field.options[0].value;
                break;
              case "ref":
                this.formData[field.name] = "";
                break;
              case "tags":
                this.formData[field.name] = [];
                break;
              case "object":
                this.formData[field.name] = {};
                for (const subField of field.schema) {
                  this.formData[field.name][subField.name] = "";
                }
                break;
              case "object array":
                this.formData[field.name] = [{}];
                for (const subField of field.schema) {
                  this.formData[field.name][0][subField.name] = "";
                }
                break;
            }
          }
        }
      } else {
        this.formData = { ...this.initialData };
        for (const field of this.resource.schema) {
          if (field.type === "object array") {
            if (!this.formData[field.name]) {
              this.formData[field.name] = [{}];
              for (const subField of field.schema) {
                this.formData[field.name][0][subField.name] = "";
              }
            } else {
              for (const item of this.formData[field.name]) {
                for (const subField of field.schema) {
                  if (typeof item[subField.name] === "undefined") {
                    item[subField.name] = "";
                  }
                }
              }
            }
          } else if (typeof this.formData[field.name] === "undefined") {
            // Initialize the field based on its type
            switch (field.type) {
              case "text":
              case "richtext":
              case "email":
              case "password":
              case "phone":
              case "number":
              case "decimal":
              case "date":
              case "datetime":
              case "time":
              case "color":
              case "range":
                this.formData[field.name] = "";
                break;
              case "check":
                this.formData[field.name] = false;
                break;
              case "radio":
              case "select":
                this.formData[field.name] = field.options[0].value;
                break;
              case "ref":
                this.formData[field.name] = "";
                break;
              case "tags":
                this.formData[field.name] = [];
                break;
              case "object":
                this.formData[field.name] = {};
                for (const subField of field.schema) {
                  this.formData[field.name][subField.name] = "";
                }
                break;
            }
          }
        }
      }
    },
    async fetchRefOptions() {
      this.refOptions = {};

      for (const field of this.resource.schema) {
        if (field.type === "ref" || field.type === "tags") {
          this.refOptions[field.name] = await refOptionsService.getRefOptions(
            field.resource,
            field.field
          );
        }
      }
    },
    handleInput(fieldName, value) {
      this.$emit("input", { [fieldName]: value }); // Emit an object containing fieldName and value
    },

    handleFileInput(fieldName, files) {
      this.formData[fieldName] = files;
    },
    handleFileUpload(fieldName, downloadURL) {
      this.formData[fieldName] = downloadURL;
    },
    addArrayItem(fieldName) {
      const field = this.resource.schema.find((f) => f.name === fieldName);
      const newItem = {};
      for (const subField of field.schema) {
        newItem[subField.name] = "";
      }
      this.formData[fieldName].push(newItem);
    },
    async submitForm() {
      const fileFields = this.resource.schema.filter(
        (field) =>
          field.type === "image" ||
          field.type === "video" ||
          field.type === "audio" ||
          field.type === "document" ||
          field.type === "image array" ||
          field.type === "video array" ||
          field.type === "audio array" ||
          field.type === "document array"
      );

      if (fileFields.length > 0) {
        this.isUploading = true;
        this.actionLoading = true;

        try {
          // Upload files one by one
          for (const field of fileFields) {
            console.log("field:", field);
            const files = this.formData[field.name];
            if (Array.isArray(files)) {
              // Handle the case where multiple files are selected
              const downloadURLs = [];
              for (const file of files) {
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(`${field.name}/${file.name}`);
                await fileRef.put(file);
                const downloadURL = await fileRef.getDownloadURL();
                downloadURLs.push(downloadURL);
              }
              // Store the download URLs in the same field
              this.formData[field.name] = downloadURLs;
              console.log(this.formData[field.name], "nde ma urls");
            } else if (files instanceof File) {
              // Handle the case where a single file is selected
              const storageRef = firebase.storage().ref();
              const fileRef = storageRef.child(`${field.name}/${files.name}`);
              await fileRef.put(files);
              this.formData[field.name] = await fileRef.getDownloadURL();
            } else {
              // No new file has been selected, keep the existing value
              console.log(`No new file selected for field: ${field.name}`);
            }
          }
        } catch (error) {
          console.error(`Error uploading file: ${error.message}`);
          this.$swal.fire(
            "Error!",
            `Error uploading file: ${error.message}`,
            "error"
          );
          this.isUploading = false;
          return;
        }

        this.isUploading = false;
        this.actionLoading = false;
      }

      // Form submission logic
      if (this.isAdding) {
        this.add();
      } else {
        this.edit();
      }
    },
  },
};
</script>
