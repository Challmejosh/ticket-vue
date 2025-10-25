<template>
  <div class="bg-[#f8fafc] h-screen p-3 flex flex-col gap-6 items-center justify-center w-full">
    <BackgroundSvg />
    <div class="z-10 w-full flex flex-col gap-6 items-center justify-center">
      <AppName />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppName from '../ui/AppName.vue'
import BackgroundSvg from '../ui/BackgroundSvg.vue'
</script>
