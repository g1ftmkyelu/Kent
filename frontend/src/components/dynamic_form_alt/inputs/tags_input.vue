<template>
  <div class="form-group">
    <label :for="name">{{ title }}</label>
    <div class="tags-input">
      <div class="tags">
        <span v-for="(tag, index) in value" :key="index" class="tag">
          {{ tag }}
          <span class="remove-tag" @click="removeTag(index)">&times;</span>
        </span>
      </div>
      <input
        type="text"
        class="form-control modern-input"
        :id="name"
        :name="name"
        v-model="newTag"
        @keydown.enter.prevent="addTag"
        placeholder="Add a tag..."
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsInput',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    initialData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newTag: ''
    };
  },
  methods: {
    addTag() {
      if (this.newTag.trim() !== '') {
        const newTags = [...this.value, this.newTag.trim()];
        this.$emit('update:value', newTags);
        this.newTag = '';
      }
    },
    removeTag(index) {
      const newTags = [...this.value];
      newTags.splice(index, 1);
      this.$emit('update:value', newTags);
    }
  }
};
</script>

<style scoped>
.tags-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
}

.tag {
  background-color: #f0f0f0;
  color: #333;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  display: flex;
  align-items: center;
}

.remove-tag {
  margin-left: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>
