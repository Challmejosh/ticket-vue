<template>
  <div class="relative w-full transition-all transform duration-300 ease-in-out h-[200px]">
    <label class="text-[#0f172a] capitalize text-base font-medium leading-normal pb-2" :for="id">
      {{ label }}
    </label>
    <div class="mt-1">
      <textarea
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        class="form-field resize-none h-[150px]"
        v-bind="$attrs"
      />
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
