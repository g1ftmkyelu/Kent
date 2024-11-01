<template>
  <DynamicCrud :resource="resource" :layout="resource.layout" />
</template>

<script>
import { ref } from 'vue';
import DynamicCrud from '../../../Object/DynamicCrud.vue';




export default {
  components: {
    DynamicCrud
  },
  props: {
    resource: {
      type: Object,
      required: true
    }
  },

};
</script>
