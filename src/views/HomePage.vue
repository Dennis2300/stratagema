<template>
  <div class="flex flex-col justify-center items-center gap-16 py-12">
    <TopSection />
    <CurrentBanner />
    <UpdatesSection />
  </div>
</template>

<script setup>
import TopSection from "@/components/Home/TopSection.vue";
import CurrentBanner from "@/components/Home/CurrentBanner.vue";
import UpdatesSection from "@/components/Home/UpdatesSection.vue";
</script>
