<template>
  <div class="flex flex-col justify-center items-center gap-8 py-8">
    <TopSection />
    <CurrentBanner />
    <UpdatesSection />
  </div>
</template>

<script setup>
import TopSection from "@/components/Home/TopSection.vue";
import CurrentBanner from "@/components/Home/CurrentBanner.vue";
import UpdatesSection from "@/components/UpdatesSection.vue";
</script>
