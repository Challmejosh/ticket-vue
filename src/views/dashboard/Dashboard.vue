<template>
  <DashboardLayout>
    <div class="p-6 w-full">
      <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <router-link
          to="/create-ticket"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <TicketPlus :size="16" /> Create New Ticket
        </router-link>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.name" class="bg-white p-6 rounded-lg shadow-md border border-slate-200 flex items-center">
          <component :is="stat.icon" class="w-8 h-8 text-blue-600 mr-4" />
          <div>
            <p class="text-sm text-gray-500">{{ stat.name }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Link Section -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h2 class="text-xl font-bold mb-2">Manage Your Tickets</h2>
        <p class="text-gray-500 mb-4">
          View, edit, and create new tickets to keep your support on track.
        </p>
        <router-link
          to="/tickets"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Go to Ticket Management <ArrowRight :size="16" />
        </router-link>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Ticket, CheckCircle, Hourglass, TicketPlus, ArrowRight } from 'lucide-vue-next'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import { useTicketStore } from '../../stores/tickets'

const ticketStore = useTicketStore()

const stats = computed(() => {
  const totalTickets = ticketStore.tickets.length
  const openTickets = ticketStore.tickets.filter(t => t.status === 'open').length
  const resolvedTickets = ticketStore.tickets.filter(t => t.status === 'closed').length

  return [
    { name: 'Total Tickets', value: totalTickets, icon: Ticket },
    { name: 'Open Tickets', value: openTickets, icon: Hourglass },
    { name: 'Resolved Tickets', value: resolvedTickets, icon: CheckCircle }
  ]
})
</script>
