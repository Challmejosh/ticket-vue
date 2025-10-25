<template>
  <DashboardLayout>
    <div class="p-6 w-full max-w-4xl mx-auto">
      <div class="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h1 class="text-2xl font-bold mb-2">Create New Ticket</h1>
        <p class="text-sm text-gray-500 mb-6">Fill out the form below to submit a new ticket.</p>
        
        <Form
          :loading="isPending"
          button-text="Create Ticket"
          extra-btn-text="Cancel"
          @submit="handleCreate"
          @extraFn="$router.go(-1)"
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
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useMutation } from '@tanstack/vue-query'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import Form from '../../components/dashboard/Form.vue'
import Input from '../../components/dashboard/Input.vue'
import TextArea from '../../components/dashboard/TextArea.vue'
import Select from '../../components/dashboard/Select.vue'
import { useAuthStore } from '../../stores/auth'
import { apiClient } from '../../api/client'
import type { TicketType } from '../../types'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<TicketType>({
  title: '',
  desc: '',
  priority: 'none',
  status: 'open'
})

const error = ref(false)

const { mutateAsync: createTicket, isPending } = useMutation({
  mutationFn: async (ticketData: any) => {
    const res = await apiClient.post(`/tickets/${ticketData.id}`, {
      title: ticketData.title,
      desc: ticketData.desc,
      status: ticketData.status,
      priority: ticketData.priority
    })
    return res.data
  },
  onSuccess: (data) => {
    toast.success(data.message)
    router.push('/tickets')
  },
  onError: (err: any) => {
    if (err.response?.data?.message) {
      toast.error(err.response.data.message)
    } else {
      toast.error('Something went wrong')
    }
  }
})

const handleCreate = async (e: Event) => {
  e.preventDefault()

  if (
    !form.value.title ||
    !form.value.status ||
    (form.value.desc.trim() && form.value.desc.length < 10) ||
    form.value.title.length <= 5
  ) {
    error.value = true
    return
  }

  error.value = false
  await createTicket({
    title: form.value.title,
    desc: form.value.desc,
    status: form.value.status,
    priority: form.value.priority,
    id: authStore.user?.id
  })
}
</script>
