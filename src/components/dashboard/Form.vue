<template>
  <form @submit="$emit('submit', $event)" class="w-full h-full flex flex-col gap-4 items-start justify-start">
    <slot />
    <div class="w-full border-t border-t-slate-400 pt-4 flex items-start justify-end gap-3">
      <button
        @click="$emit('extraFn')"
        type="button"
        class="w-full h-12 sm:w-auto text-center font-semibold text-red-500 hover:text-red-700 px-6 py-3 cursor-pointer transition-all transform duration-200 text-sm sm:text-base shadow-md rounded-lg capitalize bg-white hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg"
      >
        <Loader2 v-if="extraLoading" class="w-5 h-5 animate-spin" />
        <span v-else>{{ extraBtnText }}</span>
      </button>
      <button
        type="submit"
        class="h-12 bg-[#3b82f6] capitalize flex items-center justify-center w-full sm:w-auto text-center rounded-lg px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md transition-all transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#3b82f6]/90 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:ring-offset-2 cursor-pointer"
      >
        <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
        <span v-else>{{ buttonText }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  buttonText: string
  loading: boolean
  extraBtnText: string
  extraLoading?: boolean
}>()

defineEmits<{
  submit: [e: Event]
  extraFn: []
}>()
</script>
