<template>
  <nav v-if="!hideBreadcrumbs" aria-label="breadcrumb" class="flex pt-2 px-5">
    <ol class="flex">
      <li class="breadcrumb-item ml-5">
        <router-link to="/" class="hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </router-link>
      </li>
      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="crumb.path"
        class="breadcrumb-item"
        :class="{ 'pointer-events-none': index === breadcrumbs.length - 1 }"
      >
        <div class="flex items-center">
          <router-link 
            :to="crumb.path"
            class="ml-3"
            :class="index === breadcrumbs.length - 1 ? 'text-gray-500' : 'hover:text-primary'"
          >
            {{ crumb.name }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'BreadcrumbNavigation',
  setup() {
    const route = useRoute();
    const breadcrumbs = ref([]);
    const hideBreadcrumbs = ref(false); // Track whether to hide breadcrumbs

    const updateBreadcrumbs = () => {
      const pathArray = route.path.split('/').filter(i => i);
      
      // Check if the second segment is 'chat' to hide breadcrumbs
      hideBreadcrumbs.value = pathArray[1] === 'chat';

      // Filter out 'add' and 'edit' from the breadcrumbs
      breadcrumbs.value = pathArray
        .map((path, index) => {
          const to = '/' + pathArray.slice(0, index + 1).join('/');
          return {
            name: path.charAt(0).toUpperCase() + path.slice(1),
            path: to
          };
        })
        .filter(crumb => !['item', 'view', 'edit'].includes(crumb.name.toLowerCase()));
    };

    watch(() => route.path, updateBreadcrumbs, { immediate: true });

    return {
      breadcrumbs,
      hideBreadcrumbs
    };
  }
}
</script>

<style scoped>
.breadcrumb-item {
  display: inline-flex; /* Layout style */
  align-items: center; /* Layout style */
}

.breadcrumb-item:not(:last-child)::after {
  content: '';
  display: block; /* Layout style */
  width: 0; /* Layout style */
  height: 0; /* Layout style */
  border-top: 13px solid transparent; /* Layout style */
  border-bottom: 13px solid transparent; /* Layout style */
  border-left: 13px solid gray; /* Layout style */
  margin-left: 2px; /* Layout style */
}

.breadcrumb-item:last-child::after {
  content: none;
}

.breadcrumb-item > div {
  padding-top: 1rem; /* Layout style */
  padding-bottom: 1rem; /* Layout style */
  padding-left: 0.75rem; /* Layout style */
  padding-right: 0.75rem; /* Layout style */
}

.breadcrumb-item:last-child > div {
  /* No additional styles needed */
}

.breadcrumb-item:not(:first-child) > div {
  margin-left: -13px; /* Layout style */
  padding-left: 1.25rem; /* Layout style */
}
</style>
