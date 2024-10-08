<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { systemConfig } from '../../../data/system.config';
import { useRoute, useRouter } from 'vue-router';
import Logo from '../../u_i/sf_logo.vue';
import { getFilteredResources } from '../../../executables/accessControl';
import { getUserWithRole } from '../../../executables/getSanitizedUser';
import { translationKeys } from '@/executables/translation';
import Swal from 'sweetalert2';
import breadcrumbs from '../../breadcrumbs.vue';
import LanguageSelector from '../../language_selector.vue';
import themeCustomizer from '../../theme-customizer.vue'

const sidebarState = ref(localStorage.getItem('sidebarState') || 'full');
const sidebarOpen = computed(() => sidebarState.value !== 'hidden');
const sidebarMinified = computed(() => sidebarState.value === 'minimized');
const profileDrawerOpen = ref(false);
const openMenuGroups = ref([]);
const userName = ref(null);
const avatarUrl = ref(null);
const userEmail = ref(null);
const userRole = ref(null);
const Resources = ref(null);
const user = ref(null);
const hoveredMenuGroup = ref(null);
const hoveredSubmenu = ref(false);

const portalName = computed(() => {
  const segments = route.path.split('/');
  return segments.length > 1 ? segments[1] : '';
});

const route = useRoute();
const router = useRouter();
const myQueryParam = ref(route.query.myParam);
const menuItems = computed(() => {
  if (!Resources.value) return [];

  // Sort resources to maintain original order
  return [...Resources.value].sort((a, b) => a.order - b.order);
});

// Add this to your props or compute it based on the current route



const toggleSidebar = () => {
  if (sidebarState.value === 'hidden') {
    sidebarState.value = 'full';
  } else if (sidebarState.value === 'full') {
    sidebarState.value = 'hidden';
  } else if (sidebarState.value === 'minimized') {
    sidebarState.value = 'hidden';
  }
  localStorage.setItem('sidebarState', sidebarState.value);
};

const toggleSidebarMinified = () => {
  if (sidebarState.value === 'full') {
    sidebarState.value = 'minimized';
  } else if (sidebarState.value === 'minimized') {
    sidebarState.value = 'full';
  }
  localStorage.setItem('sidebarState', sidebarState.value);
};

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    if (sidebarState.value === 'hidden') {
      sidebarState.value = 'full';
    }
  } else {
    sidebarState.value = 'hidden';
  }
  localStorage.setItem('sidebarState', sidebarState.value);
};

const isActive = (path) => {
  return route.path.includes(path);
};

const toggleMenuGroup = (name) => {
  if (sidebarMinified.value) return;
  const index = openMenuGroups.value.indexOf(name);
  if (index === -1) {
    openMenuGroups.value = [name];
  } else {
    openMenuGroups.value.splice(index, 1);
  }
};

const isMenuGroupOpen = (name) => openMenuGroups.value.includes(name);

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
    localStorage.removeItem("sidebarState");
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

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  handleResize();
  console.log(portalName.value)
  const roleId = localStorage.getItem("role");
  if (roleId) {
    try {
      const allResources = await getFilteredResources(roleId);
      // Find the current portal's resources
      const currentPortal = systemConfig.portals.find(portal => portal.url === `/${portalName.value}`);
      Resources.value = allResources.filter(resource =>
        currentPortal.resources.some(portalResource => portalResource.path === resource.path)
      );
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  }

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

  if (!localStorage.getItem("userName")) {
    router.push("/");
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(() => route.path, (path) => {
  if (window.innerWidth < 1024) {
    sidebarState.value = 'hidden';
    localStorage.setItem('sidebarState', sidebarState.value);
  }
});
</script>

<template>
  <div class="flex h-screen text-text">
    <!-- Sidebar -->
    <div :class="[
      'bg-cardLight text-textLighter h-screen flex flex-col transition-all duration-300 border-r border-cardDark',
      'fixed lg:static',
      sidebarOpen ? (sidebarMinified ? 'w-16' : 'w-64') : 'w-0',
      'z-10 overflow-visible',
    ]">
      <template v-if="sidebarOpen">
        <!-- Sidebar Header -->
        <div class="p-4 flex items-center justify-between border-b border-cardDark">
          <div class="w-full flex justify-center" v-if="!sidebarMinified">
            <Logo />
          </div>
          <button @click="toggleSidebarMinified"
            class="text-textLighter text-xs focus:outline-none hover:text-gray-400 transition duration-300 lg:block hidden">
            <i :class="sidebarMinified ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
          </button>
          <button @click="toggleSidebar"
            class="text-textLighter text-xs focus:outline-none hover:text-gray-400 transition duration-300 lg:hidden">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <!-- Sidebar Links -->
        <nav class="flex-1 py-4 text-sm">
          <ul class="space-y-2">
            <!-- Home link -->
            <RouterLink :to="{
              path: `/${portalName}`,
              query: {
                myParam: myQueryParam,
              }
            }" class="block">
              <li :class="[
                'flex items-center px-4 py-2 rounded-md hover:bg-secondary hover:text-textLight transition duration-300',
                {
                  'bg-primary text-textLight': isActive(`/${portalName}`),
                },
              ]">
                <i class="pi pi-home text-lg" :class="sidebarMinified ? 'mr-0' : 'mr-3'"></i>
                <span v-if="!sidebarMinified">{{ translationKeys.Home }}</span>
              </li>
            </RouterLink>

            <!-- Dynamic Menu Items -->
            <template v-for="(group, groupName) in menuItems.reduce((acc, item) => {
              if (!item.menuGroup) {
                acc['ungrouped'] = acc['ungrouped'] || [];
                acc['ungrouped'].push(item);
              } else {
                acc[item.menuGroup] = acc[item.menuGroup] || [];
                acc[item.menuGroup].push(item);
              }
              return acc;
            }, {})" :key="groupName">
              <!-- Ungrouped items -->
              <template v-if="groupName === 'ungrouped'">
                <template v-for="item in group" :key="item.name">
                  <RouterLink :to="{
                    path: `/${portalName}/${item.path}`,
                    query: {
                      myParam: myQueryParam,
                    },
                  }" class="block">
                    <li :class="[
                      'flex items-center px-4 py-2 rounded-md hover:bg-secondary hover:text-textLight transition duration-300',
                      {
                        'bg-primary text-textLight': isActive(`/${portalName}/${item.path}`),
                      },
                    ]">
                      <i :class="[item.icon, 'text-lg', sidebarMinified ? 'mr-0' : 'mr-3']"></i>
                      <span v-if="!sidebarMinified">{{ item.label }}</span>
                    </li>
                  </RouterLink>
                </template>
              </template>

              <!-- Grouped items -->
              <template v-else>
                <li @click="toggleMenuGroup(groupName)"
                  @mouseenter="hoveredMenuGroup = groupName; hoveredSubmenu = true" @mouseleave="hoveredSubmenu = false"
                  :class="[
                    'flex items-center px-4 py-2 rounded-md text-secondary font-bold cursor-pointer transition duration-300 relative',
                    { 'bg-backgroundHover': isMenuGroupOpen(groupName) },
                  ]">
                  <i :class="[group[0].menuGroupIcon, 'text-lg', sidebarMinified ? 'mr-0' : 'mr-3']"></i>
                  <span v-if="!sidebarMinified">{{ groupName }}</span>
                  <i v-if="!sidebarMinified" :class="[
                    'fas ml-auto',
                    isMenuGroupOpen(groupName) ? 'fa-chevron-down' : 'fa-chevron-right',
                  ]"></i>

                  <!-- Dropdown for minimized sidebar -->
                  <div v-if="sidebarMinified && hoveredMenuGroup === groupName && hoveredSubmenu"
                    class="absolute left-full top-0 bg-menubg shadow-lg rounded-md py-2 ml-1 z-50"
                    style="min-width: 200px; max-height: calc(100vh - 4rem); overflow-y: auto;">
                    <ul class="space-y-1">
                      <template v-for="item in group" :key="item.name">
                        <RouterLink :to="{
                          path: `/${portalName}/${item.path}`,
                          query: {
                            myParam: myQueryParam,
                          },
                        }" class="block">
                          <li :class="[
                            'flex items-center px-4 py-2 hover:bg-secondary hover:text-textLight transition duration-300 z-50',
                            {
                              'bg-primary text-textLight': isActive(`/${portalName}/${item.path}`),
                            },
                          ]">
                            <i :class="[item.icon, 'text-lg mr-3']"></i>
                            <span>{{ item.label }}</span>
                          </li>
                        </RouterLink>
                      </template>
                    </ul>
                  </div>
                </li>

                <!-- Expanded view for grouped links -->
                <ul v-if="isMenuGroupOpen(groupName) && !sidebarMinified" class="ml-4 mt-1 space-y-1">
                  <template v-for="item in group" :key="item.name">
                    <RouterLink :to="`/${portalName}/${item.path}`" class="block">
                      <li :class="[
                        'flex items-center px-4 py-2 rounded-md hover:bg-secondary hover:text-textLight transition duration-300',
                        {
                          'bg-primary text-textLight': isActive(`/${portalName}/${item.path}`),
                        },
                      ]">
                        <i :class="[item.icon, 'text-lg mr-3']"></i>
                        <span>{{ item.label }}</span>
                      </li>
                    </RouterLink>
                  </template>
                </ul>
              </template>
            </template>
          </ul>
        </nav>
      </template>
    </div>
    <!-- Main content area -->
    <div class="flex-1 flex flex-col w-[100vw] overflow-x-hidden">
      <!-- Top Bar -->
      <div class="bg-cardLight text-black p-4 flex items-center justify-between border-b border-cardDark">
        <div class="flex items-center">
          <button @click="toggleSidebar" v-if="!sidebarOpen"
            class="text-black focus:outline-none hover:text-gray-400 transition duration-300">
            <i class="fa fa-bars text-xl"></i>
          </button>
          <div v-if="sidebarMinified || !sidebarOpen" class="ml-5">
            <Logo />
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <themeCustomizer />
          <LanguageSelector />
          <span @click="openProfileDrawer"
            class="text-secondary cursor-pointer focus:outline-none hover:text-gray-400 transition duration-300">
            <i class="pi pi-user text-xl"></i>
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 shadow-inner bg-background overflow-y-auto transition-all duration-300">
        <transition name="slide-fade" mode="out-in">
          <div>
            <breadcrumbs />
            <slot />
          </div>
        </transition>
      </div>

      <!-- Profile Drawer with Overlay -->
      <transition name="fade">
        <div v-if="profileDrawerOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="closeProfileDrawer">
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="profileDrawerOpen"
          class="fixed inset-y-0 right-0 w-80 bg-cardLight text-textLighter shadow-xl z-50 overflow-y-auto border-l border-cardDark">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-text">{{ translationKeys.Profile }}</h2>
              <button @click="closeProfileDrawer" class="text-textLighter hover:text-text transition duration-300">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="mb-6">
              <img :src="avatarUrl" alt="Profile" class="w-32 h-32 rounded-full mx-auto mb-4">
              <h3 class="text-xl font-semibold text-center">{{ user?.fullname }}</h3>
            </div>
            <div class="mb-4">
              <p class="text-gray-600">{{ translationKeys.Email }}: {{ user?.email }}</p>
              <p class="text-gray-600">{{ translationKeys.Role }}: {{ user?.role }}</p>
            </div>
            <div class="flex justify-between">
              <RouterLink class="w-full" :to="`${portalName}/profile`">
                <button
                  class="w-full bg-secondary text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                  <i class="fas fa-cog mr-2"></i>
                  {{ translationKeys.Settings }}
                </button>
              </RouterLink>
              <div class="mx-2"></div>
              <button @click="logout"
                class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                <i class="fas fa-sign-out-alt mr-2"></i>
                {{ translationKeys.Logout }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  transition: width 0.3s ease;
}

.absolute {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.absolute:hover {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-enter-active {
  animation: slideFadeEnter 0.5s ease both;
}

.slide-fade-leave-active {
  animation: slideFadeLeave 0.5s ease both;
}

@keyframes slideFadeEnter {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFadeLeave {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@media (min-width: 1024px) {
  .sidebar {
    transform: translateX(0) !important;
  }
}

@media (max-width: 1023px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 50;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>