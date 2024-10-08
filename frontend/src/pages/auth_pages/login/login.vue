<template>
  <component :is="currentLayout" 
    :email="email" 
    :password="password" 
    :showPassword="showPassword" 
    :isLoggingIn="isLoggingIn"
    :error="error"
    :config="config"
    @update:email="email = $event"
    @update:password="password = $event"
    @toggle-password="showPassword = !showPassword"
    @submit="handleLogin"
    @social-login="handleSocialLogin"
  />
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Import layout components
import DefaultLayout from './layouts/default_layout.vue';
import CenteredLayout from './layouts/centered_layout.vue';
import SplitLayout from './layouts/split_layout.vue';
import MinimalLayout from './layouts/minimal_layout.vue';

import { auth } from '../../../firebase';

export default {
  components: {
    DefaultLayout,
    CenteredLayout,
    SplitLayout,
    MinimalLayout,
  },
  data() {
    return {
      loading: false,
      isLoggingIn: false,
      config: {},
      showPassword: false,
      email: "",
      password: "",
      error: "",
      selectedLayout: 'SplitLayout',
      layouts: [
        'DefaultLayout',
        'CenteredLayout',
        'SplitLayout',
        'MinimalLayout',
      ],
    };
  },
  computed: {
    currentLayout() {
      return this.layouts.includes(this.selectedLayout) ? this.selectedLayout : 'DefaultLayout';
    },
  },
  mounted() {
    this.fetchSystemConfig();
  },
  methods: {
    async fetchSystemConfig() {
      this.loading = true;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/system-config`
        );
        this.config = response.data.data[0];
        console.log(response.data.data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async handleLogin() {
      this.isLoggingIn = true;
      try {
        const data = JSON.stringify({
          email: this.email,
          password: this.password,
        });

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/users/login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);

        // Set authToken and userName in local storage
        localStorage.setItem("authToken", response.data.accessToken);
        localStorage.setItem("userName", response.data.user.fullname);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userImage", response.data.user.undefined);
        localStorage.setItem("systemlogo", this.config.logo);
        localStorage.setItem("systemname", this.config.name);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("userEmail", response.data.user.email);

        this.$swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
        });
        this.$router.push("/dashboard/");
      } catch (error) {
        console.error("Error logging in:", error);

        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error, {
            autoClose: 2000,
          });
        } else {
          toast.error("An unknown error occurred while logging in.", {
            autoClose: 2000,
          });
        }
      } finally {
        this.isLoggingIn = false;
      }
    },
    async handleSocialLogin(user) {
      try {
        const idToken = await user.getIdToken();
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/users/social-login`,
          { idToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle successful login (similar to handleLogin method)
        localStorage.setItem("authToken", response.data.accessToken);
        localStorage.setItem("userName", response.data.user.fullname);
        // ... set other user data in localStorage ...

        this.$router.push("/dashboard/");
      } catch (error) {
        console.error("Error during social login:", error);
        toast.error("An error occurred during social login.", {
          autoClose: 2000,
        });
      }
    },
  },
};
</script>