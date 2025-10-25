<template>
  <AuthLayout>
    <Form
      class="w-full sm:w-[500px]"
      :loading="isPending"
      header="create an account"
      desc="Get started with TicketFlow in seconds."
      button-text="Sign up"
      @submit="handleSignup"
    >
      <div class="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
        <Input
          id="name"
          label="full name"
          type="text"
          v-model="form.name"
          :error="error && !form.name"
          error-message="Please enter your name"
          placeholder="John Doe"
        />
        <Input
          id="email"
          label="email address"
          type="text"
          v-model="form.email"
          placeholder="you@example.com"
          :error="error && (!form.email || !emailValid)"
          error-message="Please enter a valid email"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
        <Input
          id="password"
          label="password"
          type="password"
          v-model="form.password"
          placeholder="Enter your password"
          :error="error && (!form.password || form.password.length < 8 || !isPasswordValid)"
          :error-message="passwordErrorMessage"
        />
        <Input
          id="confirm-password"
          label="confirm password"
          type="password"
          v-model="form.passwordConfirm"
          placeholder="Confirm your password"
          :error="error && (!form.password || form.passwordConfirm.length < 8 || form.password.trim() !== form.passwordConfirm.trim() || !isPasswordValid)"
          :error-message="confirmPasswordErrorMessage"
        />
      </div>
    </Form>
    <p>
      Already have an account?
      <router-link
        to="/signin"
        class="text-blue-400 font-medium hover:text-blue-500 ml-1 hover:underline transform transition-all duration-300 ease-in-out"
      >
        Sign in
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
import AuthLayout from '../../components/layouts/AuthLayout.vue'
import Form from '../../components/auth/Form.vue'
import Input from '../../components/auth/Input.vue'
import type { RegisterCredentials } from '../../types'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  name: '',
  passwordConfirm: ''
})

const error = ref(false)

const emailValid = computed(() => /\S+@\S+\.\S+/.test(form.value.email))
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
const isPasswordValid = computed(() => passwordRegex.test(form.value.password))

const passwordErrorMessage = computed(() => {
  if (form.value.password.length < 8) return "Must be at least 8 characters"
  if (form.value.email.includes(form.value.password) || form.value.name.includes(form.value.password)) {
    return "Password cannot contain name or email"
  }
  if (!isPasswordValid.value) {
    return "At least uppercase, number & symbol."
  }
  return "Please enter a valid password"
})

const confirmPasswordErrorMessage = computed(() => {
  if (form.value.password.length < 8) return "Must be at least 8 characters"
  if (form.value.password.trim() !== form.value.passwordConfirm.trim()) return "Passwords do not match"
  if (form.value.email.includes(form.value.password) || form.value.name.includes(form.value.password)) {
    return "Password cannot contain name or email"
  }
  if (!isPasswordValid.value) {
    return "At least uppercase, number & symbol."
  }
  return "Please enter a valid password"
})

const { mutateAsync: register, isPending } = useMutation({
  mutationFn: async (credentials: RegisterCredentials) => {
    const res = await apiClient.post('/auth/register', credentials)
    return res.data
  },
  onSuccess: (data) => {
    toast.success(data.message)
    router.push('/signin')
  },
  onError: (err: any) => {
    if (err.response?.data?.message) {
      toast.error(err.response.data.message)
    } else {
      toast.error('Something went wrong')
    }
  }
})

const handleSignup = async (e: Event) => {
  e.preventDefault()

  if (
    !form.value.email ||
    !form.value.password ||
    form.value.password.length < 8 ||
    !emailValid.value ||
    form.value.password.trim() !== form.value.passwordConfirm.trim() ||
    form.value.email.includes(form.value.password) ||
    form.value.name.includes(form.value.password) ||
    !isPasswordValid.value
  ) {
    error.value = true
    return
  }

  error.value = false
  await register({
    email: form.value.email.toLowerCase(),
    name: form.value.name,
    password: form.value.password
  })
}
</script>
