<template>
  <section class="md:w-1/2">
    <h2 class="text-xl md:text-2xl font-semibold text-quaternary">
      Best Artifacts
    </h2>
    <div class="grid grid-cols-1 md:gap-6">
      <template v-for="a in character.artifacts" :key="a.artifact.name">
        <div class="flex items-center gap-3 md:backdrop-blur-xl p-4 rounded-xl">
          <div
            class="w-16 h-16 rarity-5 rounded-xl overflow-hidden flex-shrink-0"
          >
            <img
              class="w-full h-full object-cover"
              :src="a.artifact.flower_img_url"
              :alt="a.artifact.name"
            />
          </div>
          <div class="flex flex-col h-full justify-around flex-1 min-w-0">
            <p class="font-medium text-sm md:text-base truncate">
              {{ a.artifact.name }}
            </p>
            <button class="w-fit badge badge-soft badge-info">View</button>
          </div>
          <p class="badge badge-primary">
            {{ a.rank }}
          </p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  character: Object,
});
</script>
