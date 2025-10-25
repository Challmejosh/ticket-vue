<template>
  <DashboardLayout>
    <div class="p-6 w-full">
      <h1 class="text-2xl font-bold mb-6">All Tickets</h1>
      
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonTicketItem v-for="i in 6" :key="i" />
      </div>

      <div v-else-if="isError" class="text-center py-10 px-6 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
        <AlertTriangle class="mx-auto h-12 w-12 text-red-400" />
        <h3 class="mt-2 text-sm font-medium text-red-800">Could not fetch tickets</h3>
        <p class="mt-1 text-sm text-red-600">Something went wrong. Please try again.</p>
        <div class="mt-6">
          <button @click="refetch()" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Retry
          </button>
        </div>
      </div>

      <div v-else-if="ticketStore.tickets.length === 0" class="text-center py-10 px-6 border-2 border-dashed border-gray-300 rounded-lg">
        <TicketPlus class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No tickets</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new ticket.</p>
        <div class="mt-6">
          <router-link to="/create-ticket" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Create Ticket
          </router-link>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TicketItem v-for="ticket in ticketStore.tickets" :key="ticket._id" :ticket="ticket" />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { AlertTriangle, TicketPlus } from 'lucide-vue-next'
import { useQuery } from '@tanstack/vue-query'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import TicketItem from '../../components/dashboard/TicketItem.vue'
import { useAuthStore } from '../../stores/auth'
import { useTicketStore } from '../../stores/tickets'
import { apiClient } from '../../api/client'

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const { isLoading, isError, refetch } = useQuery({
  queryKey: ['tickets', authStore.user?.id],
  queryFn: async () => {
    const res = await apiClient.get(`/tickets/${authStore.user?.id}`)
    ticketStore.saveTickets(res.data.tickets)
    return res.data
  }
})

const SkeletonTicketItem = () => ({
  template: `
    <div class="bg-white shadow-md rounded-lg p-4 border border-slate-200 animate-pulse">
      <div class="flex justify-between items-start">
        <div class="h-5 bg-gray-200 rounded w-3/4"></div>
        <div class="h-5 bg-gray-200 rounded w-1/6"></div>
      </div>
      <div class="mt-4 h-3 bg-gray-200 rounded w-full"></div>
      <div class="mt-1 h-3 bg-gray-200 rounded w-5/6"></div>
      <div class="mt-4 flex items-center justify-between">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/6"></div>
      </div>
    </div>
  `
})
</script>
