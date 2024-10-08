<template>
  <div class="image-array-field-display mb-4">
    <Carousel :autoplay="3000" :pause-on-hover="false" :controls="true" :wrap-around="true">
      <Slide v-for="(image, index) in value" :key="index">
        <img :src="image" :alt="`Image ${index + 1}`" class="carousel-image" />
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  name: 'ImageArrayField',
  components: {
    Carousel,
    Slide,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.image-array-field-display {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.carousel-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

:deep(.carousel__slide) {
  text-align: center;
  height: 250px;
  line-height: 250px;
  overflow: hidden;
}
</style>
