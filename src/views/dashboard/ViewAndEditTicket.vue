<template>
  <DashboardLayout>
    <div v-if="!ticket || !form" class="flex items-center justify-center w-full h-full">
      <Loader2 class="w-8 h-8 animate-spin text-blue-600" />
    </div>

    <div v-else class="p-6 w-full max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <button @click="$router.push('/tickets')" class="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
          <ArrowLeft :size="16" /> Back to Tickets
        </button>
        <button v-if="!isEditing" @click="isEditing = true" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <Edit :size="16" /> Edit
        </button>
      </div>

      <div v-if="isEditing" class="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h1 class="text-2xl font-bold mb-6">Edit Ticket</h1>
        <Form
          :loading="isPending"
          button-text="Save Changes"
          extra-btn-text="Cancel"
          @submit="handleUpdate"
          @extraFn="cancelEdit"
        >
          <Input
            id="title"
            label="Title"
            v-model="form.title"
            :error="error && (!form.title || form.title.length <= 5)"
            :error-message="!form.title ? 'Title is required' : 'Title must be greater than 5 characters'"
          />
          <TextArea
            id="desc"
            label="Description"
            v-model="form.desc"
            :error="error && !!(form.desc.trim() && form.desc.length < 10)"
            error-message="Description must be at least 10 characters"
          />
          <div class="flex gap-4 items-center justify-between w-full">
            <Select
              id="status"
              label="Status"
              v-model="form.status"
              :data="['open', 'in_progress', 'closed']"
              :error="error && !form.status"
              error-message="Status is required"
            />
            <Select
              id="priority"
              label="Priority"
              v-model="form.priority"
              :data="['none', 'low', 'medium', 'high']"
            />
          </div>
        </Form>
      </div>

      <div v-else class="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        <div class="p-6 border-b border-slate-200">
          <h1 class="text-2xl font-bold text-gray-900">{{ ticket.title }}</h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="md:col-span-2 p-6">
            <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h2>
            <p class="text-gray-700 whitespace-pre-wrap">
              {{ ticket.desc || '' }}
              <span v-if="!ticket.desc" class="italic text-gray-400">No description provided.</span>
            </p>
          </div>
          <div class="md:col-span-1 bg-slate-50 p-6 border-t md:border-t-0 md:border-l border-slate-200">
            <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Details</h2>
            <div class="space-y-4">
              <div>
                <p class="text-xs text-gray-500 font-medium">Status</p>
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize', getStatusColor(ticket.status)]">
                  {{ ticket.status.split('_').join(' ') }}
                </span>
              </div>
              <div>
                <p class="text-xs text-gray-500 font-medium">Priority</p>
                <div class="flex items-center gap-2">
                  <span :class="['w-3 h-3 rounded-full', getPriorityColor(ticket.priority)]" />
                  <span class="text-sm text-gray-800 capitalize">{{ ticket.priority }}</span>
                </div>
              </div>
              <div>
                <p class="text-xs text-gray-500 font-medium">Ticket ID</p>
                <p class="text-sm text-gray-800 font-mono">{{ ticket._id }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useMutation } from '@tanstack/vue-query'
import { Loader2, ArrowLeft, Edit } from 'lucide-vue-next'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import Form from '../../components/dashboard/Form.vue'
import Input from '../../components/dashboard/Input.vue'
import TextArea from '../../components/dashboard/TextArea.vue'
import Select from '../../components/dashboard/Select.vue'
import { useAuthStore } from '../../stores/auth'
import { useTicketStore } from '../../stores/tickets'
import { apiClient } from '../../api/client'
import type { TicketType } from '../../types'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const ticketStore = useTicketStore()

const ticket = ref<TicketType | null>(null)
const form = ref<TicketType | null>(null)
const isEditing = ref(false)
const error = ref(false)

const { mutateAsync: updateTicket, isPending } = useMutation({
  mutationFn: async (ticketData: any) => {
    const res = await apiClient.put(`/tickets/${ticketData.ticketId}`, {
      title: ticketData.title,
      desc: ticketData.desc,
      status: ticketData.status,
      priority: ticketData.priority,
      ticketId: ticketData.ticketId
    })
    return res.data
  },
  onSuccess: (data) => {
    toast.success('Ticket updated successfully')
    isEditing.value = false
    form.value = data.ticket
    ticket.value = data.ticket
    ticketStore.updateTicket(data.ticket)
  },
  onError: (err: any) => {
    if (err.response?.data?.message) {
      toast.error(err.response.data.message)
    } else {
      toast.error('Something went wrong')
    }
  }
})

const handleUpdate = async (e: Event) => {
  e.preventDefault()

  if (!form.value || !form.value.title || !form.value.status || (form.value.desc.trim() && form.value.desc.length < 10) || form.value.title.length <= 5) {
    error.value = true
    return
  }

  error.value = false
  await updateTicket({
    ticketId: form.value._id,
    title: form.value.title,
    desc: form.value.desc,
    status: form.value.status,
    priority: form.value.priority,
    userId: authStore.user?.id
  })
}

const cancelEdit = () => {
  isEditing.value = false
  if (ticket.value) {
    form.value = { ...ticket.value }
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

onMounted(() => {
  const id = route.params.id as string
  if (!id) {
    router.push('/tickets')
  } else {
    const findTicket = ticketStore.tickets.find(t => t._id === id)
    if (findTicket) {
      ticket.value = findTicket
      form.value = { ...findTicket }
    } else if (ticketStore.tickets.length > 0) {
      router.push('/tickets')
    }
  }
})

watch(() => ticketStore.tickets, () => {
  const id = route.params.id as string
  const findTicket = ticketStore.tickets.find(t => t._id === id)
  if (findTicket) {
    ticket.value = findTicket
    form.value = { ...findTicket }
  }
})
</script>
