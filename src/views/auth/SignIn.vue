<template>
  <AuthLayout>
    <Form
      class="w-full sm:w-[400px]"
      :loading="isPending"
      header="welcome back"
      desc="Sign in to continue to your dashboard."
      button-text="Sign in"
      @submit="handleLogin"
    >
      <Input
        id="email"
        label="email address"
        type="text"
        v-model="form.email"
        placeholder="you@example.com"
        :error="error && (!form.email || !emailValid)"
        error-message="Please enter a valid email"
      />
      <Input
        id="password"
        label="password"
        v-model="form.password"
        type="password"
        placeholder="*********"
        :error="error && (!form.password || form.password.length < 8)"
        :error-message="form.password.length < 8 ? 'Password must be at least 8 characters' : 'Please enter a valid password'"
      />
      <div class="w-full flex items-center justify-end text-sm">
        <router-link class="font-medium text-primary hover:text-blue-500" to="#">
          Forgot Password?
        </router-link>
      </div>
    </Form>
    <p>
      Don't have an account?
      <router-link
        to="/signup"
        class="text-blue-400 font-medium hover:text-blue-500 ml-1 hover:underline transform transition-all duration-300 ease-in-out"
      >
        Sign up
      </router-link>
    </p>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useMutation } from '@tanstack/vue-query'
import { apiClient } from '../../api/client'
import { useAuthStore } from '../../stores/auth'
import AuthLayout from '../../components/layouts/AuthLayout.vue'
import Form from '../../components/auth/Form.vue'
import Input from '../../components/auth/Input.vue'
import type { LoginCredentials } from '../../types'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<LoginCredentials>({
  email: '',
  password: ''
})

const error = ref(false)

const emailValid = computed(() => /\S+@\S+\.\S+/.test(form.value.email))

const { mutateAsync: login, isPending } = useMutation({
  mutationFn: async (credentials: LoginCredentials) => {
    const res = await apiClient.post('/auth/signin', credentials)
    return res.data
  },
  onSuccess: (data) => {
    toast.success(data.message)
    authStore.saveUser(data.user)
    router.push('/dashboard')
  },
  onError: (err: any) => {
    if (err.response?.data?.message) {
      toast.error(err.response.data.message)
    } else {
      toast.error('Something went wrong')
    }
  }
})

const handleLogin = async (e: Event) => {
  e.preventDefault()
  
  if (!form.value.email || !form.value.password || form.value.password.length < 8 || !emailValid.value) {
    error.value = true
    return
  }
  
  error.value = false
  await login({
    email: form.value.email.toLowerCase(),
    password: form.value.password
  })
}
</script>
