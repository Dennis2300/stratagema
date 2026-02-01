<template>
  <div class="w-[1400px] mx-auto space-y-8">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { inject } from "@vercel/analytics";
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import SupportPopUp from "./components/SupportPopUp.vue";
import Cookies from "./components/Cookies.vue";
// Initialize Vercel Analytics
inject();

</script>
