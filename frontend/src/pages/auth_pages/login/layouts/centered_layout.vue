<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div class="max-w-md w-full space-y-8">
        <div>
          <Logo class="mx-auto h-20 w-auto" />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="$emit('submit')">
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autocomplete="email" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                     placeholder="Email address"
                     :value="email"
                     @input="$emit('update:email', $event.target.value)">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input :type="showPassword ? 'text' : 'password'" name="password" autocomplete="current-password" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                     placeholder="Password"
                     :value="password"
                     @input="$emit('update:password', $event.target.value)">
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
  
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
  
          <div>
            <button type="submit" :disabled="isLoggingIn"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ isLoggingIn ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
        <div v-if="error" class="mt-4 text-center text-sm text-red-600">{{ error }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import Logo from "@/components/u_i/sf_logo.vue";
  
  export default {
    components: { Logo },
    props: ['email', 'password', 'showPassword', 'isLoggingIn', 'error', 'config'],
    emits: ['update:email', 'update:password', 'toggle-password', 'submit'],
  }
  </script>