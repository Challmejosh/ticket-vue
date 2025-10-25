<template>
  <form
    @submit="$emit('submit', $event)"
    class="flex flex-col w-full sm:w-fit sm:min-w-[500px] gap-6 items-center justify-center shadow-lg rounded-lg bg-white dark:bg-slate-900/70 dark:backdrop-blur-sm p-8 shadow-soft border border-slate-200 dark:border-slate-800"
  >
    <div class="flex flex-col gap-2 items-center justify-center text-center">
      <h2 class="text-2xl capitalize font-bold text-text-light dark:text-text-dark">
        {{ header }}
      </h2>
      <p class="text-slate-500 dark:text-slate-400 mt-1">
        {{ desc }}
      </p>
    </div>
    <div class="flex flex-col gap-2 items-start justify-center w-full transition-all transform duration-300 ease-in-out">
      <slot />
    </div>
    <button
      type="submit"
      class="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-[#3b82f6] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark"
    >
      <Loader2 v-if="loading" class="h-5 w-5 animate-spin" />
      <span v-else>{{ buttonText }}</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  header: string
  desc: string
  buttonText: string
  loading: boolean
}>()

defineEmits<{
  submit: [e: Event]
}>()
</script>
