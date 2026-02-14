<template>
  <div class="absolute top-0 left-0 right-0 rounded-t-2xl overflow-hidden">
    <img
      class="w-full opacity-10"
      :src="character.splash_art_url"
      :alt="character.name"
    />
  </div>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>
