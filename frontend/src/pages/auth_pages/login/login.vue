<template>
  <div class="min-h-screen bg-cardDark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <!-- Main container with flex layout -->
    <div class="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
      
      <!-- Illustration container - hidden on mobile -->
      <div class="hidden  md:block md:w-1/2">
        <!-- Add your illustration here -->
        <img src="./Construction-cuate.svg" alt="Login illustration" class="w-full max-w-md mx-auto"/>
      </div>
      
      <!-- Form container - full width on mobile, half width on desktop -->
      <div class="w-full md:w-1/2 max-w-md space-y-8">
        <div class="card flex flex-col justify-center">
          <Logo class="mx-auto h-12 w-auto" />
          <h2 class="text-xl mt-20 mx-auto text-text">
            Sign in to your account
          </h2>
          
          <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserOutlined class="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="email-address" name="email" type="email" v-model="email" required
                    class="appearance-none bg-cardLight rounded-none relative block w-full px-3 py-2 pl-10 border border-textLighter placeholder-gray-500 text-textLighter rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                    placeholder="Email address" />
                </div>
              </div>
              
              <div>
                <label for="password" class="sr-only">Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockOutlined class="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="password" name="password" :type="showPassword ? 'text' : 'password'" v-model="password" required
                    class="appearance-none bg-cardLight rounded-none relative block w-full px-3 py-2 pl-10 border border-textLighter placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm"
                    placeholder="Password" />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" @click="togglePassword"
                      class="text-gray-400 hover:text-textLight focus:outline-none">
                      <EyeOutlined v-if="showPassword" class="h-5 w-5" />
                      <EyeInvisibleOutlined v-else class="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded">
                <label for="remember-me" class="ml-2 block text-sm text-text">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-text hover:text-text">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" :disabled="isLoggingIn"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-webSecondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <i class="pi pi-lock"></i>
                </span>
                {{ isLoggingIn ? 'Signing in...' : 'Sign in' }}
              </button>
            </div>
          </form>

          <p v-if="error" class="mt-2 text-center text-sm text-red-600">
            {{ error }}
          </p>
          

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';
import Logo from "@/components/u_i/sf_logo.vue";

export default {
  components: {
    Logo,
    UserOutlined,
    LockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
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
    };
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
    togglePassword() {
      this.showPassword = !this.showPassword;
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