<template>
  <div class="min-h-screen">
    <div
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      class="md:hidden fixed top-4 left-4 z-50 p-2 bg-black rounded-lg shadow-lg"
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
    <SideBar
      :class="[
        'fixed left-0 top-0 w-64 h-screen z-40 transition-transform duration-300',
        'md:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    />
    <div
      v-if="isMobileMenuOpen"
      @click="isMobileMenuOpen = false"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
    />

    <div class="md:ml-64 flex flex-col min-h-screen">
      <main class="flex-1 pt-16 md:pt-0">
        <router-view />
      </main>
      <Footer />
    </div>

    <SupportPopUp />
    <Cookies />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { inject } from "@vercel/analytics";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";
import SupportPopUp from "./components/SupportPopUp.vue";
import Cookies from "./components/Cookies.vue";

const isMobileMenuOpen = ref(false);

inject();
</script>
