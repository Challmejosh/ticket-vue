<template>
  <div class="relative h-screen flex flex-col lg:flex-row items-start justify-start">
    <Navigation />
    <div class="h-full overflow-y-auto w-full flex flex-col items-start justify-start">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import Navigation from '../dashboard/Navigation.vue'
import { useAuthStore } from '../../stores/auth'
import { useTicketStore } from '../../stores/tickets'
import { apiClient } from '../../api/client'

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const { data } = useQuery({
  queryKey: ['tickets', authStore.user?.id],
  queryFn: async () => {
    const res = await apiClient.get(`/tickets/${authStore.user?.id}`)
    return res.data
  },
  enabled: !!authStore.user?.id
})

watch(data, (newData) => {
  if (newData?.tickets) {
    ticketStore.saveTickets(newData.tickets)
  }
})

onMounted(() => {
  authStore.initAuth()
})
</script>
