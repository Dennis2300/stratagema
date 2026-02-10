<template>
  <div class="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-8">
    <NavBar />
    <router-view />
    <Footer />
  </div>
  <Cookies />
  <SpeedInsights />
</template>

<script setup>
import { inject } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import SupportPopUp from "./components/SupportPopUp.vue";
import Cookies from "./components/Cookies.vue";
// Initialize Vercel Analytics
inject();
</script>
