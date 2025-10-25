<template>
  <div class="sticky top-0 lg:static z-50 shadow-lg lg:shadow-none w-full lg:w-[300px] h-20 lg:h-screen p-3 lg:border-r lg:border-r-slate-100 bg-white flex lg:flex-col gap-6 lg:items-start lg:justify-start items-center justify-between">
    <AppName />
    
    <!-- Desktop Nav -->
    <div class="w-full h-full hidden lg:flex flex-col gap-3 items-start justify-between">
      <div class="w-full flex flex-col gap-3 items-start justify-center">
        <router-link
          v-for="item in nav"
          :key="item.href"
          :to="item.href"
          class="flex gap-2 items-center justify-start w-full rounded-lg p-2 capitalize font-semibold hover:bg-[#3b82f6]/20 hover:text-[#3b82f6]"
          :class="{ 'bg-[#3b82f6]/20 text-[#3b82f6]': isActive(item.href) }"
        >
          <component :is="item.icon" :size="20" />
          <p class="text-sm">{{ item.text }}</p>
        </router-link>
      </div>

      <div class="w-full flex flex-col gap-3 items-start justify-center">
        <div
          v-for="item in otherLinks"
          :key="item.text"
          @click="item.click"
          class="flex gap-2 items-center justify-start w-full rounded-lg p-2 capitalize font-semibold hover:bg-[#3b82f6]/20 hover:text-[#3b82f6] cursor-pointer"
        >
          <component :is="item.icon" :size="20" />
          <p class="text-sm">{{ item.text }}</p>
        </div>

        <div class="border-t cursor-pointer border-t-slate-400 p-2 w-full flex gap-2 items-center justify-start">
          <div class="w-[50px] h-[50px] bg-[#f8fafc] flex items-center justify-center font-bold text-center rounded-full uppercase text-[#3b82f6]">
            {{ userAbbr }}
          </div>
          <div class="text-xs">
            <p class="font-semibold capitalize text-sm">{{ authStore.user?.name }}</p>
            <p class="lowercase">{{ authStore.user?.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <div @click="slide = true" class="lg:hidden flex items-center justify-center text-center rounded-lg h-10 w-10 shadow-md bg-white cursor-pointer">
      <Menu :size="20" />
    </div>

    <!-- Mobile Nav -->
    <Transition
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="slide" class="z-50 bg-black/20 backdrop-blur h-screen fixed inset-0 w-full flex items-start justify-between lg:hidden">
        <div class="flex items-center justify-start p-3">
          <div @click="slide = false" class="flex items-center justify-center text-center rounded-lg h-10 w-10 shadow-md bg-white cursor-pointer">
            <X :size="20" />
          </div>
        </div>

        <div :class="slide ? 'translate-x-0' : 'translate-x-full'" class="duration-300 transform transition-all w-[60%] bg-white p-3 h-full flex flex-col gap-3 items-start justify-between">
          <div class="w-full pt-8 flex flex-col gap-3 items-start justify-center">
            <router-link
              v-for="item in nav"
              :key="item.href"
              :to="item.href"
              @click="slide = false"
              class="flex gap-2 items-center justify-start w-full rounded-lg p-2 capitalize font-semibold hover:bg-[#3b82f6]/20 hover:text-[#3b82f6]"
              :class="{ 'bg-[#3b82f6]/20 text-[#3b82f6]': isActive(item.href) }"
            >
              <component :is="item.icon" :size="20" />
              <p class="text-sm">{{ item.text }}</p>
            </router-link>
          </div>

          <div class="w-full flex flex-col gap-3 items-start justify-center">
            <div
              v-for="item in otherLinks"
              :key="item.text"
              @click="item.click"
              class="flex gap-2 items-center justify-start w-full rounded-lg p-2 capitalize font-semibold hover:bg-[#3b82f6]/20 hover:text-[#3b82f6] cursor-pointer"
            >
              <component :is="item.icon" :size="20" />
              <p class="text-sm">{{ item.text }}</p>
            </div>

            <div class="border-t cursor-pointer border-t-slate-400 p-2 w-full flex gap-2 items-center justify-start">
              <div class="w-[50px] h-[50px] bg-[#f8fafc] flex items-center justify-center font-bold text-center rounded-full uppercase text-[#3b82f6]">
                {{ userAbbr }}
              </div>
              <div class="text-xs">
                <p class="font-semibold capitalize text-sm">{{ authStore.user?.name }}</p>
                <p class="lowercase">{{ authStore.user?.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LayoutDashboard, LogOut, Menu, Ticket, TicketPlus, X } from 'lucide-vue-next'
import AppName from '../ui/AppName.vue'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const slide = ref(false)

const nav = [
  { text: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { text: 'tickets', href: '/tickets', icon: Ticket },
  { text: 'create ticket', href: '/create-ticket', icon: TicketPlus }
]

const otherLinks = [
  {
    text: 'logout',
    click: () => {
      authStore.logOut()
      router.push('/')
    },
    href: '/signin',
    icon: LogOut
  }
]

const isActive = (href: string) => {
  return route.path.includes(href)
}

const userAbbr = computed(() => {
  if (!authStore.user?.name) return ''
  const parts = authStore.user.name.split(' ')
  const first = parts[0]?.charAt(0) || ''
  const second = parts[1]?.charAt(0) || ''
  return (first + second).toUpperCase()
})
</script>
