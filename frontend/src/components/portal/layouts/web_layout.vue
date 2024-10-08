<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Logo from '../../u_i/sf_logo.vue';
import { website_config } from '../../../modules/e_commerce_system/website';
import { getUserWithRole } from '../../../executables/getSanitizedUser';
import Swal from 'sweetalert2';
import Footer from '../../footer.vue';
import { translationKeys } from "@/executables/translation";
import themeCustomizer from '../../theme-customizer.vue';
import languageSelector from '../../language_selector.vue';

const mobileMenuOpen = ref(false);
const profileDrawerOpen = ref(false);
const activeDropdown = ref(null);
const userName = ref(null);
const avatarUrl = ref(null);
const userEmail = ref(null);
const userRole = ref(null);
const Resources = ref(null);
const user = ref(null);

// New refs for banner and search
const showBanner = ref(true);
const showSearch = ref(true);
const searchQuery = ref('');

const route = useRoute();
const router = useRouter();

const menuGroups = computed(() => {
  if (!Resources.value) return [];
  const groups = {};
  for (const resource of Resources.value) {
    if (resource.menuGroup) {
      if (!groups[resource.menuGroup]) {
        groups[resource.menuGroup] = {
          name: resource.menuGroup,
          label: resource.menuGroup,
          icon: resource.menuGroupIcon,
          resources: [],
        };
      }
      groups[resource.menuGroup].resources.push(resource);
    }
  }
  return Object.values(groups);
});

const resourcesWithoutMenuGroup = computed(() =>
  Resources.value ? Resources.value.filter((resource) => !resource.menuGroup) : []
);

const isMobileMenuOpen = computed(() => mobileMenuOpen.value);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  console.log('Mobile menu state:', mobileMenuOpen.value); // Added for debugging
};

const toggleDropdown = (name) => {
  if (activeDropdown.value === name) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = name;
  }
};

const isActive = (path) => route.path === path;

const openProfileDrawer = () => {
  profileDrawerOpen.value = true;
};

const closeProfileDrawer = () => {
  profileDrawerOpen.value = false;
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
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("systemname");
    localStorage.removeItem("systemlogo");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    router.push("/login");
    await Swal.fire({
      icon: "success",
      title: translationKeys.Success,
      text: translationKeys.LoggedOut,
    });
  } else {
    await Swal.fire({
      title: translationKeys.Cancelled,
      text: translationKeys.StillLoggedIn,
      icon: "info",
    });
  }
};
const handleScroll = () => {
  if (window.scrollY > 50) {
    showBanner.value = false;
  } else {
    showBanner.value = true;
  }
};
onMounted(async () => {
  const roleId = localStorage.getItem("role");
  if (roleId) {
    try {
      Resources.value = website_config;
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  } else {
    Resources.value = website_config
  }

  console.log('xxxxxxxxxxxxxxxxx', Resources.value)
  userName.value = localStorage.getItem("userName");
  avatarUrl.value = localStorage.getItem("userImage");
  userEmail.value = localStorage.getItem("userEmail");
  userRole.value = localStorage.getItem("role");

  const userId = localStorage.getItem('userId');
  if (userId) {
    try {
      user.value = await getUserWithRole(userId);
    } catch (error) {
      console.error('Error:', error);
    }
  }


});

watch(() => route.path, () => {
  mobileMenuOpen.value = false;
  activeDropdown.value = null;
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background text-text">
    <!-- Top Navigation Bar -->
    
    <nav class="bg-cardLight text-textLight sticky top-0 z-50 transition-all duration-300 shadow-md">

      <div class="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <Logo class="" />
            <div class="hidden md:block ml-10">
              <div class="flex items-baseline space-x-4">

                <RouterLink v-for="resource in resourcesWithoutMenuGroup" :key="resource.name"
                  :to="`/home/${resource.name}`" class="px-3 py-2 rounded-md text-sm font-medium"
                  :class="isActive(`/home/${resource.name}`) ? 'bg-backgroundHover text-textLight' : 'hover:bg-backgroundHover hover:text-textLight'">
                  {{ resource.label }}
                </RouterLink>
                <div v-for="menuGroup in menuGroups" :key="menuGroup.name" class="relative">
                  <button @click="toggleDropdown(menuGroup.name)"
                    class="px-3 py-2 rounded-md text-sm font-medium hover:bg-backgroundHover hover:text-textLight focus:outline-none">
                    {{ menuGroup.label }}
                    <i
                      :class="['fas', activeDropdown === menuGroup.name ? 'fa-chevron-up' : 'fa-chevron-down', 'ml-1']"></i>
                  </button>
                  <div v-show="activeDropdown === menuGroup.name"
                    class="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div class="py-1">
                      <RouterLink v-for="resource in menuGroup.resources" :key="resource.name"
                        :to="`/home/${resource.name}`" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        :class="{ 'bg-gray-100': isActive(`/home/${resource.name}`) }">
                        {{ resource.label }}
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <themeCustomizer />
              <languageSelector />
              <button v-if="user" @click="router.push('/dashboard')" class="text-textLight bg-webSecondary px-4 py-2 rounded  ml-2 font-medium">
                {{ translationKeys.Dashboard || "Dashboard" }}
              </button>

              <button v-else @click="router.push('/login')"
                class="text-textLight bg-webSecondary px-4 py-2 rounded  ml-2 font-medium">Login</button>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <button @click="toggleMobileMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-textLight hover:text-textLight hover:bg-backgroundHover focus:outline-none">
              <i :class="['fas', isMobileMenuOpen ? 'fa-times' : 'fa-bars']"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">

          <div v-for="menuGroup in menuGroups" :key="menuGroup.name">
            <button @click="toggleDropdown(menuGroup.name)"
              class="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-backgroundHover hover:text-textLight focus:outline-none">
              {{ menuGroup.label }}
              <i :class="['fas', activeDropdown === menuGroup.name ? 'fa-chevron-up' : 'fa-chevron-down', 'ml-1']"></i>
            </button>
            <div v-show="activeDropdown === menuGroup.name" class="pl-4">
              <RouterLink v-for="resource in menuGroup.resources" :key="resource.name" :to="`/home/${resource.name}`"
                class="block px-3 py-2 rounded-md text-base font-medium"
                :class="isActive(`/home/${resource.name}`) ? 'bg-backgroundHover text-textLight' : 'hover:bg-backgroundHover hover:text-textLight'">
                {{ resource.label }}
              </RouterLink>
            </div>
          </div>
          <RouterLink v-for="resource in resourcesWithoutMenuGroup" :key="resource.name" :to="`/home/${resource.name}`"
            class="block px-3 py-2 rounded-md text-base font-medium"
            :class="isActive(`/home/${resource.name}`) ? 'bg-backgroundHover text-textLight' : 'hover:bg-backgroundHover hover:text-textLight'">
            {{ resource.label }}
          </RouterLink>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          
          <div v-if="user" class="md:block flex items-center px-5">
            <themeCustomizer />
            <languageSelector />
            <div class="flex items-center px-5">
              <button @click="router.push('/dashboard')" class="text-textLight bg-webSecondary px-4 py-2 rounded  ml-2 font-medium">
                {{ translationKeys.Dashboard || "Dashboard" }}
              </button>
            </div>
          </div>
          <div v-else>
            <div class="md:block flex items-center px-5">
              <themeCustomizer />
              <languageSelector />
              <div class="ml-4 flex items-center md:ml-6">
 

                <button  @click="router.push('/login')"

                  class="text-textLight bg-webSecondary px-4 py-2 rounded  ml-2 font-medium">{{ translationKeys.Login }}</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <transition name="fade" mode="out-in">
        <slot />
      </transition>
      <Footer />
    </main>


  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

/* Add some smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Improve the appearance of buttons and links */
.nav-link {
  @apply: px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200;
}

.nav-link:hover {
  @apply: bg-backgroundHover text-textLight;
}

.btn {
  @apply: px-4 py-2 rounded font-medium transition-colors duration-200;
}

.btn-primary {
  @apply: bg-primary text-white hover:bg-primary-dark;
}

.btn-secondary {
  @apply: bg-secondary text-white hover:bg-secondary-dark;
}
</style>