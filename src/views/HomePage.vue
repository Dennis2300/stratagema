<template>
  <div
    class="min-h-screen flex flex-col items-center py-4 px-4 sm:px-6 lg:px-8 gap-6 sm:gap-8"
  >
    <TopSection />
    <MiddleSection />
    <UpdatesSection />
  </div>
</template>

<script setup>
import TopSection from "@/components/Home/TopSection.vue";
import MiddleSection from "@/components/Home/MiddleSection.vue";
import UpdatesSection from "@/components/UpdatesSection.vue";
</script>
