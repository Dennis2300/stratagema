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
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import SupportPopUp from "./components/SupportPopUp.vue";
import Cookies from "./components/Cookies.vue";
// Initialize Vercel Analytics
inject();
</script>
