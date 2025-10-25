import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  const saveUser = (userData: User) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logOut = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    isAuthenticated,
    saveUser,
    logOut,
    initAuth
  }
})
