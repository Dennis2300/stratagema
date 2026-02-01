<template>
  <div class="min-h-screen">
    <!-- Mobile Menu Button -->
    <div
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      class="md:hidden fixed top-4 left-4 z-50 p-3 bg-black rounded-lg shadow-lg hover:bg-gray-800 transition-colors active:scale-95"
      aria-label="Toggle menu"
    >
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          v-if="!isMobileMenuOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>

    <!-- Sidebar -->
    <SideBar
      :class="[
        'fixed left-0 top-0 w-64 h-screen z-40 transition-transform duration-300 ease-in-out',
        'md:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    />

    <!-- Backdrop Overlay -->
    <div
      v-if="isMobileMenuOpen"
      @click="isMobileMenuOpen = false"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
    />

    <!-- Main Content -->
    <div class="md:ml-64 flex flex-col min-h-screen">
      <main class="flex-1 px-4 py-4 pt-20 md:pt-6 md:px-6 lg:px-8">
        <router-view />
      </main>
      <Footer />
    </div>

    <SupportPopUp />
    <Cookies />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { inject } from "@vercel/analytics";
import { useRoute } from "vue-router";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";
import SupportPopUp from "./components/SupportPopUp.vue";
import Cookies from "./components/Cookies.vue";

const isMobileMenuOpen = ref(false);
const route = useRoute();

inject();

// Close mobile menu when route changes
watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});

// Prevent body scroll when menu is open on mobile
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>