<template>
  <div class="bg-white shadow-md rounded-lg p-4 mb-4 border border-slate-200 cursor-pointer group relative hover:shadow-lg transition-shadow">
    <div @click="$router.push(`/tickets/${ticket._id}`)">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold capitalize text-gray-800">{{ ticket.title }}</h3>
        <span :class="['px-2 capitalize py-1 text-xs font-semibold rounded-full', getStatusColor(ticket.status)]">
          {{ ticket.status.split('_').join(' ') }}
        </span>
      </div>
      <p class="text-gray-600 text-sm mt-2">{{ ticket.desc }}</p>
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span :class="['w-3 h-3 rounded-full', getPriorityColor(ticket.priority)]" />
          <span class="text-xs text-gray-500 capitalize">{{ ticket.priority }}</span>
        </div>
        <span class="text-xs text-gray-400">ID: {{ ticket._id }}</span>
      </div>
    </div>
    <button
      @click.stop="handleDeleteClick"
      class="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
      aria-label="Delete ticket"
    >
      <Trash2 :size="16" />
    </button>
    <ConfirmModal
      :loading="isDeleting"
      :is-open="isModalOpen"
      :on-close="() => isModalOpen = false"
      :on-confirm="handleConfirmDelete"
      title="Delete Ticket"
      :message="`Are you sure you want to delete the ticket  '${ticket.title}' ? This action cannot be undone.`"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify'
import { isAxiosError } from 'axios'
import { Trash2 } from 'lucide-vue-next'
import ConfirmModal from '../ui/ConfirmModal.vue'
import { useAuthStore } from '../../stores/auth'
import { useTicketStore } from '../../stores/tickets'
import { apiClient } from '../../api/client'
import type { TicketType } from '../../types'

const props = defineProps<{
  ticket: TicketType
}>()

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const isModalOpen = ref(false)
const isDeleting = ref(false)

const { mutateAsync: deleteTicketMutation } = useMutation({
  mutationFn: async ({ id, ticketId }: { id: string; ticketId: string }) => {
    const res = await apiClient.delete(`/tickets/${id}`, {
      data: { ticketId }
    })
    return res.data
  },
  onSuccess: (data) => {
    isModalOpen.value = false
    ticketStore.deleteTicket(props.ticket._id!)
    toast.success(data.message)
  },
  onError: (err: any) => {
    if (isAxiosError(err)) {
      toast.error(err.response?.data.message)
    } else {
      toast.error('Something went wrong')
    }
  }
})

const handleDeleteClick = (e: Event) => {
  e.stopPropagation()
  isModalOpen.value = true
}

const handleConfirmDelete = async () => {
  isDeleting.value = true
  try {
    await deleteTicketMutation({ id: authStore.user!.id, ticketId: props.ticket._id! })
  } finally {
    isDeleting.value = false
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500'
    case 'medium': return 'bg-yellow-500'
    case 'low': return 'bg-green-500'
    default: return 'bg-gray-400'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-green-200 text-green-800'
    case 'in_progress': return 'bg-amber-200 text-amber-800'
    case 'closed': return 'bg-gray-200 text-gray-800'
    default: return 'bg-gray-200 text-gray-800'
  }
}
</script>
