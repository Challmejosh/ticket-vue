<template>
  <div class="bg-gray-50 min-h-screen text-gray-800">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="flex justify-between items-center py-6">
        <div class="text-2xl font-bold text-indigo-600">
          TicketDesk
        </div>
        <div class="flex items-center space-x-4">
          <router-link
            to="/signin"
            class="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </router-link>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative pt-20 pb-32 text-center">
        <div class="absolute -top-20 -left-20 w-72 h-72 bg-purple-200 rounded-full opacity-50 blur-2xl" />
        <div class="relative z-10">
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight">
            Welcome to <span class="text-indigo-600">TicketDesk</span>
          </h1>
          <p class="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
            The effortless way to manage customer support. Streamline your
            workflow and keep your customers happy.
          </p>
          <div class="mt-8 flex justify-center space-x-4">
            <router-link
              to="/signup"
              class="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-transform hover:scale-105"
            >
              Get Started
            </router-link>
            <router-link
              to="/signin"
              class="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-medium border border-gray-200 hover:bg-gray-100 transition-transform hover:scale-105"
            >
              Login
            </router-link>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            class="absolute bottom-0 left-0 w-full h-full"
          >
            <path
              d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              style="stroke: none; fill: #f9fafb"
            />
          </svg>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white">
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="p-8 bg-white rounded-xl shadow-lg"
          >
            <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-500">{{ feature.description }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white mt-20">
      <div class="max-w-[1440px] mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {{ new Date().getFullYear() }} TicketDesk. All rights reserved.</p>
        <div class="mt-4 flex justify-center space-x-6">
          <a href="#" class="hover:text-indigo-400">Privacy Policy</a>
          <a href="#" class="hover:text-indigo-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const features = [
  { 
    title: "Create Tickets", 
    description: "Easily create and track support tickets for any issue." 
  },
  { 
    title: "Manage Status", 
    description: "Update ticket statuses to keep everyone in the loop." 
  },
  { 
    title: "Collaborate", 
    description: "Work with your team to resolve issues faster than ever." 
  }
]
</script>
