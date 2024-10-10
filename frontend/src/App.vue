<script>
import { RouterView } from 'vue-router';
import { getFilteredResources } from './executables/accessControl';
import Loader from "./components/u_i/sf_loader_alt.vue";
import axios from 'axios';

export default {
  components: {
    RouterView,
    Loader
  },

  data() {
    return {
      loading: false,
    };
  },

  async mounted() {
    this.loading = true;
    await this.initializeApp();
  },

  methods: {
    async initializeApp() {
      try {
        await this.fetchAppConfig();
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAppConfig() {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/system-config`);
      const data = await response.json();
      document.title = data.data[0].appName;
      document.querySelector('link[rel="icon"]').href = data.data[0].logo;
    },
  },
};
</script>

<template>
  <Loader v-if="loading" />
  <main v-else>
    <router-view></router-view>
  </main>
</template>
