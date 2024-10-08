<template>
  <section data-aos="zoom-in" class="relative mt-24 h-[70vh] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img :src="props.imageUrl" :alt="props.imageAlt" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10 text-white">
      <div class="max-w-3xl">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
          {{ props.title }}
        </h1>
        <h2 class="text-xl md:text-2xl font-medium mb-10 opacity-90 animate-fade-in-up animation-delay-300">
          {{ props.subtitle }}
        </h2>
        <a :href="props.button.link" class="bg-white text-secondary hover:bg-secondary hover:text-white font-bold py-4 px-8 rounded-full transition duration-300 inline-flex items-center group animate-fade-in-up animation-delay-600">
          <i :class="props.button.icon" class="mr-2 group-hover:translate-x-1 transition-transform"></i>
          {{ props.button.label }}
        </a>
      </div>
    </div>
    
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
  imageUrl: String,
  imageAlt: String,
  button: Object,
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}
</style>