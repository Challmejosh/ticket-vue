<template>
  <Transition
    enter-active-class="transition-all duration-600 ease-in-out"
    leave-active-class="transition-all duration-600 ease-in-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <p v-if="msg" class="absolute bottom-0 text-xs text-red-400 mt-1">
      {{ msg }}
    </p>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  msg?: string
}>()
</script>
