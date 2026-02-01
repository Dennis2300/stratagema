<template>
  <div class="min-h-screen">
    <div
      @click="toggleSidebar"
      class="lg:hidden fixed top-0 left-0 z-50 p-2 bg-primary rounded-br-md shadow-md"
      aria-label="Toggle menu"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
    <div
      v-if="isSidebarOpen"
      @click="closeSidebar"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
    />
    <SideBar
      :class="[
        'fixed left-0 top-0 w-64 h-screen z-40 transition-transform duration-300',
        'lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    />
    <div class="lg:ml-64 flex flex-col min-h-screen">
      <main class="flex-1 px-4">
        <router-view />
      </main>
      <Footer />
    </div>

    <SupportPopUp />
    <Cookies />
  </div>
</template>

<script setup>
import { inject } from "@vercel/analytics";
import { ref } from "vue";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";
import SupportPopUp from "./components/SupportPopUp.vue";
import Cookies from "./components/Cookies.vue";
// Initialize Vercel Analytics
inject();

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>
