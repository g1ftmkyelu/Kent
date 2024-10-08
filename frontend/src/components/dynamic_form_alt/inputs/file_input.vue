<template>
  <div class="form-group file-input">
    <label :for="name" class="file-input__label">{{ title }}</label>
    <div class="file-input__wrapper">
      <input
        type="file"
        :id="name"
        :name="name"
        @change="updateValue"
        :accept="accept"
        class="file-input__control"
        multiple
      />
      <label :for="name" class="file-input__button">Browse</label>
      <span class="file-input__text" v-if="files.length">
        {{ files.map(file => file.name).join(', ') }}
      </span>
      <span class="file-input__placeholder" v-else>No files chosen</span>
    </div>
    <div class="preview-container">
      <div v-for="(file, index) in files" :key="index" class="preview-item">
        <img v-if="isImage(file)" :src="getPreviewUrl(file)" alt="Preview" class="preview-image" />
        <span v-else class="preview-filename">{{ file.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileInput',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      required: true
    },
    initialData: {
      type: [String, File, Array],
      default: null
    }
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    updateValue(event) {
      this.files = Array.from(event.target.files);
      this.$emit('update:value', this.files);
    },
    isImage(file) {
      return file && file.type.startsWith('image/');
    },
    getPreviewUrl(file) {
      return URL.createObjectURL(file);
    }
  }
};
</script>

<style scoped>
.file-input {
  margin-bottom: 20px;
}

.file-input__label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.file-input__wrapper {
  display: flex;
  align-items: center;
}

.file-input__control {
  display: none;
}

.file-input__button {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.file-input__button:hover {
  background-color: #0056b3;
}

.file-input__text,
.file-input__placeholder {
  font-size: 14px;
  color: #666;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.preview-item {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.preview-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
}

.preview-filename {
  padding: 5px;
  font-size: 14px;
  color: #333;
  text-align: center;
  background-color: #f9f9f9;
}
</style>
