<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
    <div class="max-w-md w-full">
      <h1 class="text-8xl font-bold text-indigo-600 dark:text-indigo-500">
        {{ error?.status || 'Oops!' }}
      </h1>
      <h2 class="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {{ title }}
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        {{ message }}
      </p>
      <router-link
        to="/"
        class="mt-6 inline-block px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
      >
        Go Back Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const error = computed(() => {
  return {
    status: route.query.status as string,
    message: route.query.message as string
  }
})

const title = computed(() => {
  if (error.value?.status === '404') {
    return '404 - Page Not Found'
  }
  return 'An Unexpected Error Occurred'
})

const message = computed(() => {
  if (error.value?.status === '404') {
    return 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
  }
  return error.value?.message || "We're sorry, something went wrong."
})
</script>
