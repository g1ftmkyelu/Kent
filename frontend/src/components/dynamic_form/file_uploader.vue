<template>
<h1>temp</h1>

</template>

<script>


export default {
  name: "FileUploader",
  props: {
    fileFields: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showFileInput: {},
    };
  },

  methods: {
    getPreviewComponent(type) {
      console.log(type);
    },
    getAcceptTypes(type) {
      console.log(type);
    },
    toggleFileInput(fieldName) {
      this.$set(this.showFileInput, fieldName, !this.showFileInput[fieldName]);
    },
    handleFileUpload(field, event) {
      const files = Array.from(event.target.files);
      this.$emit("file-uploaded", field.name, files);
      this.toggleFileInput(field.name);
    },
    removeFile(fieldName, index) {
      const updatedFiles = [
        ...this.formData[fieldName].slice(0, index),
        ...this.formData[fieldName].slice(index + 1),
      ];
      this.$emit("file-uploaded", fieldName, updatedFiles);
    },
  },
};
</script>
