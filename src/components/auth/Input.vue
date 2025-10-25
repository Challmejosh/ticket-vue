<template>
  <div class="w-full h-full pb-4 relative transition-all transform duration-300 ease-in-out">
    <label class="block capitalize text-sm font-medium text-slate-700 dark:text-slate-300" :for="id">
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="block w-full appearance-none rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:text-white"
        v-bind="$attrs"
      />
    </div>
    <Transition
      enter-active-class="transition-all duration-600 ease-in-out"
      leave-active-class="transition-all duration-600 ease-in-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <FieldError v-if="error" :msg="errorMessage" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import FieldError from '../ui/FieldError.vue'

defineProps<{
  label: string
  id: string
  modelValue: string
  error?: boolean
  errorMessage?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
