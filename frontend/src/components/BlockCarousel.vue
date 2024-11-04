<!-- BlockCarousel.vue -->
<template>
    <div class="block-carousel">
      <Carousel
        v-model="currentIndex"
        :items-to-show="1"
        :wrap-around="true"
        ref="carouselRef"
      >
        <Slide v-for="slide in slides" :key="slide.key">
          <div class="carousel-slide">
            <h3 class="slide-title">{{ slide.title }}</h3>
            <BlockGrid
              :blockConfigs="slide.blockConfigs"
              :layout="slide.layout"
              :rows="slide.rows"
              :columns="slide.columns"
              @blockUpdate="(data) => handleBlockUpdate(slide.key, data)"
            />
          </div>
        </Slide>
  
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
  
      <div class="carousel-navigation">
        <button @click="prevSlide">Previous</button>
        <button @click="nextSlide">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
  import BlockGrid from './BlockGrid.vue'

  
  const currentIndex = ref(0)
  const carouselRef = ref(null)
  
  const props = defineProps({
    slides: {
      type: Array,
      required: true
    }
  })
  
  const emit = defineEmits(['slideChange', 'blockUpdate'])
  
  watch(currentIndex, (newValue) => {
    emit('slideChange', newValue)
  })
  
  const handleBlockUpdate = (slideKey, data) => {
    emit('blockUpdate', { slideKey, ...data })
  }
  
  const nextSlide = () => {
    carouselRef.value?.next()
  }
  
  const prevSlide = () => {
    carouselRef.value?.prev()
  }
  </script>
  
  <style scoped>
  .block-carousel {
    position: relative;
  }
  
  .carousel-slide {

  }
  
  .slide-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .carousel-navigation {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  </style>