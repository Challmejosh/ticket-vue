<template>
  <div class="text-3xl flex items-center justify-center text-center gap-2 font-bold tracking-tight">
    <Ticket :size="35" color="#3b82f6" />
    <p>{{ appName }}</p>
  </div>
</template>

<script setup lang="ts">
import { Ticket } from 'lucide-vue-next'
import { appName } from '../../utils/constants'
</script>
