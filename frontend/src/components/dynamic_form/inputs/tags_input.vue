<template>
    <div>
      <label class="block font-medium text-text mb-2">{{ field.title }}</label>
      <div class="flex flex-wrap items-center gap-2">
        <div v-if="field.tagInputType === 'refs'" class="flex-1">
          <div class="flex items-center">
            <select
              v-model="inputValue"
              class="form-select rounded-l-md px-3 focus:outline-none focus:ring-2 focus:ring-secondary bg-cardDark"
            >
              <option value="" disabled>Select an option</option>
              <option
                v-for="option in refOptions"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
            <button
              type="button"
              @click="addTag"
              class="btn"
            >
              Add
            </button>
          </div>
        </div>
        <div v-else class="flex-1">
          <input
            type="text"
            v-model="inputValue"
            placeholder="Add a tag"
            @keydown.enter="addTag"
            class="rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary bg-cardDark"
          />
        </div>
      </div>
      <div class="mt-4 bg-cardDark rounded-md p-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-if="isAdding"
            v-for="(tag, index) in value"
            :key="index"
            class="bg-secondary rounded-lg px-4 text-base flex items-center hover:bg-secondary-darker transition duration-150 ease-in-out cursor-pointer"
            @click="removeTag(index)"
          >
            {{
              field.tagInputType === "refs"
                ? getTagLabel(tag)
                : tag
            }}
            <span class="ml-2 font-bold">&times;</span>
          </span>
          <div v-else class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in value"
              :key="index"
              class="bg-gray-200 text-gray-600 px-4 rounded-lg text-base font-medium flex items-center hover:bg-gray-300 transition duration-150 ease-in-out cursor-pointer"
              @click="removeTag(index)"
            >
              {{ resolvedTagLabels[tag] || "Loading..." }}
              <span class="ml-2 font-bold">&times;</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TagsInput',
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
        type: Array,
        required: true
      },
      isAdding: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        inputValue: '',
        resolvedTagLabels: {}
      }
    },
    methods: {
      addTag() {
        if (this.inputValue.trim()) {
          this.$emit('input', [...this.value, this.inputValue.trim()])
          this.inputValue = ''
        }
      },
      removeTag(index) {
        const updatedTags = [
          ...this.value.slice(0, index),
          ...this.value.slice(index + 1)
        ]
        this.$emit('input', updatedTags)
      },
      getTagLabel(tagId) {
        if (!this.resolvedTagLabels[tagId]) {
          const option = this.refOptions.find((opt) => opt.id === tagId)
          this.resolvedTagLabels[tagId] = option ? option.name : tagId
        }
        return this.resolvedTagLabels[tagId]
      }
    }
  }
  </script>