<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Navbar -->
      <NavBar />
      <!-- Page content here -->
      <div class="p-4 mt-12">
        <router-view />
      </div>
      <Footer />
    </div>
    <!-- Drawer Sidebar -->
    <SidebarDrawer />
  </div>
  <Cookies />
  <SpeedInsights />
</template>

<script setup>
import { inject } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import NavBar from "./components/Page/NavBar.vue";
import Footer from "./components/Page/Footer.vue";
import Cookies from "./components/Page/Cookies.vue";
import SidebarDrawer from "./components/Page/SidebarDrawer.vue";
// Initialize Vercel Analytics
inject();
</script>
