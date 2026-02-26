<template>
  <NavBar />
  <router-view class="mt-20" />
  <Footer />
  <Cookies />
  <SpeedInsights />
</template>

<script setup>
import { inject } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import NavBar from "./components/Page/NavBar.vue";
import Footer from "./components/Page/Footer.vue";
import Cookies from "./components/Page/Cookies.vue";
// Initialize Vercel Analytics
inject();
</script>
