<template>
  <section class="py-24 bg-background">
    <div class="container mx-auto px-4">
      <h2 data-aos="fade-up" class="text-4xl font-bold text-center mb-16 text-gray-800 relative">
        <span class="mb-4 text-text inline-block">{{ props.title }}</span>
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(card, index) in props.cards" 
          :key="card.title" 
          class="bg-cardLight rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        >
          <div class="p-8 flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110">
              <i :class="card.icon" class="text-3xl text-primary"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-text">{{ card.title }}</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">{{ card.description }}</p>
            <a 
              :href="card.link" 
              class="text-primary hover:secondary font-medium transition-colors duration-300 group flex items-center"
            >
              Learn More
              <span class="ml-2 transition-transform duration-300 transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps(['title', 'cards']);

onMounted(() => {
  // Smooth scroll functionality
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>