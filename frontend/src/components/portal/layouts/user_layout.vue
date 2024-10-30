<script setup>
import { ref, computed, onMounted } from 'vue';
import { systemConfig } from '../../../data/system.config';
import { useRoute, useRouter } from 'vue-router';
import Logo from '../../u_i/sf_logo.vue';
import { getFilteredResources } from '../../../executables/accessControl';
import { getUserWithRole } from '../../../executables/getSanitizedUser';
import { translationKeys } from '@/executables/translation';
import Swal from 'sweetalert2';
import breadcrumbs from '../../breadcrumbs.vue';
import LanguageSelector from '../../language_selector.vue';
import themeCustomizer from '../../theme-customizer.vue';
import { Resources as Zenbu } from '../../../data/resources';

const Resources = ref(null);
const user = ref(null);

const route = useRoute();
const router = useRouter();
const myQueryParam = ref(route.query.myParam);

const portalName = computed(() => {
  const segments = route.path.split('/');
  return segments.length > 1 ? segments[1] : '';
});

const menuItems = computed(() => {
  if (!Resources.value) return [];
  return [...Resources.value].sort((a, b) => a.order - b.order);
});

const isActive = (path) => {
  return route.path === path;
};

const logout = async () => {
  const result = await Swal.fire({
    title: translationKeys.AreYouSure,
    text: translationKeys.DoYouWantToLogout,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: translationKeys.YesLogout,
  });
  
  if (result.isConfirmed) {
    localStorage.clear();
    router.push("/login");
  }
};

onMounted(async () => {
  const roleId = localStorage.getItem("role");
  if (roleId) {
    try {
      const allResources = Zenbu
      const currentPortal = systemConfig.portals.find(portal => portal.url === `/${portalName.value}`);
      Resources.value = allResources.filter(resource =>
        currentPortal.resources.some(portalResource => portalResource.path === resource.path)
      );
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  }

  const userId = localStorage.getItem('userId');
  if (userId) {
    try {
      user.value = await getUserWithRole(userId);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (!localStorage.getItem("userName")) {
    router.push("/");
  }
});
</script>

<template>
  <div class="flex flex-col h-screen bg-background">
    <!-- Top Bar -->
    <div class="bg-cardLight shadow-md">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Logo and Utilities Row -->
        <div class="flex items-center justify-between h-16">
         <span @click="router.go(-1)">
          <i class="pi pi-arrow-left"></i>
          back
        </span>
          <div class="flex items-center space-x-4">
            <themeCustomizer />
            <LanguageSelector />

          </div>
        </div>

        <!-- Tab Navigation Row -->
        <div class="flex space-x-1 pt-2">
          <!-- Home Tab -->
          <RouterLink 
            :to="{
              path: `/${portalName}`,
              query: { myParam: myQueryParam }
            }"
            class="group px-4 py-2 rounded-t-lg transition-all duration-200"
            :class="[
              isActive(`/${portalName}`)
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            ]"
          >
            <div class="flex items-center space-x-2">
              <i class="pi pi-compass"></i>
              <span>Overview</span>
            </div>
          </RouterLink>

          <!-- Menu Item Tabs -->
          <RouterLink 
            v-for="item in menuItems" 
            :key="item.name"
            :to="{
              path: `/${portalName}/${item.path}`,
              query: { myParam: myQueryParam }
            }"
            class="group px-4 py-2 rounded-t-lg transition-all duration-200"
            :class="[
              isActive(`/${portalName}/${item.path}`)
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            ]"
          >
            <div class="flex items-center space-x-2">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <breadcrumbs />
      <div class="max-w-7xl mx-auto px-4 py-6">
        <slot />
      </div>
    </main>
  </div>
</template>