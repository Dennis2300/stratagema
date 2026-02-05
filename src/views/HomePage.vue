<template>
  <div class="flex flex-col items-center gap-8">
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
