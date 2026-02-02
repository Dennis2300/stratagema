<template>
  <div class="absolute top-0 left-0 w-full  z-0 overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
    ></div>
    <img
      v-if="character.splash_art_url"
      :src="character.splash_art_url"
      :alt="character.name"
      class="w-full h-full object-cover object-center opacity-10"
      loading="lazy"
    />
  </div>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>
