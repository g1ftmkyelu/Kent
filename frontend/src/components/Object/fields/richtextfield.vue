<template>
  <div class="rich-text-field-display">
    <div v-html="truncatedValue"></div>
  
  </div>
</template>

<script>
export default {
  name: 'RichTextField',
  props: {
    field: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      maxLength: 60,
      showFullText: false,
    };
  },
  computed: {
    truncatedValue() {
      if (this.showFullText || this.value.length <= this.maxLength) {
        return this.value;
      }
      return this.value.slice(0, this.maxLength) + '...';
    },
    isTextTruncated() {
      return this.value.length > this.maxLength;
    },
    seeMoreText() {
      return this.showFullText ? 'See less' : 'See more';
    },
  },
  methods: {
    toggleFullText() {
      this.showFullText = !this.showFullText;
    },
  },
};
</script>

<style scoped>
.see-more {
  color: var(--primary);
  cursor: pointer;
  text-decoration: underline;
}

.rich-text-field-display {
  overflow: auto;
  font-size: 1rem;
}
</style>